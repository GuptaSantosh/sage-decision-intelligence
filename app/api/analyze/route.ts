import OpenAI from "openai";
import { ANALYSIS_RESPONSE_FORMAT } from "@/lib/analysis-schema";
import { isAnalysisResult } from "@/lib/analysis-validation";
import {
  DocumentParsingError,
  MAX_FILE_COUNT,
  MAX_FILE_SIZE_BYTES,
  parseUploadedDocuments,
} from "@/lib/document-parser";
import { getOpenAIClient, OpenAIConfigurationError } from "@/lib/openai";
import { buildAnalysisPrompt, SYSTEM_PROMPT } from "@/lib/prompts";

export const runtime = "nodejs";

const MAX_MULTIPART_BYTES = MAX_FILE_COUNT * MAX_FILE_SIZE_BYTES + 64 * 1024;
const OPENAI_REQUEST_TIMEOUT_MS = 45_000;

type ApiErrorCode =
  | "INVALID_REQUEST"
  | "PAYLOAD_TOO_LARGE"
  | "UNSUPPORTED_FILE_TYPE"
  | "FILE_TOO_LARGE"
  | "TOO_MANY_FILES"
  | "EMPTY_EXTRACTED_TEXT"
  | "PARSE_FAILURE"
  | "RATE_LIMITED"
  | "ANALYSIS_INCOMPLETE"
  | "ANALYSIS_INVALID"
  | "UPSTREAM_UNAVAILABLE"
  | "AI_NOT_CONFIGURED";

function jsonError(code: ApiErrorCode, message: string, retryable: boolean, status: number) {
  return Response.json({ error: { code, message, retryable } }, { status });
}

function isUploadedFile(value: FormDataEntryValue): value is File {
  return typeof value !== "string" && typeof value.name === "string" && typeof value.arrayBuffer === "function";
}

function logAnalysisEvent(event: Record<string, unknown>) {
  // Metadata only: never include business context, document text, evidence, or model output.
  console.info("[sage-analysis]", event);
}

function parseFormText(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function formatAssessmentDate() {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date());
}

export async function POST(request: Request) {
  const startedAt = performance.now();
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (Number.isFinite(contentLength) && contentLength > MAX_MULTIPART_BYTES) {
    return jsonError("PAYLOAD_TOO_LARGE", "The uploaded files are too large to analyze.", false, 413);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonError("INVALID_REQUEST", "Submit the assessment as a valid multipart form.", false, 400);
  }

  const projectName = parseFormText(formData, "projectName");
  const businessContext = parseFormText(formData, "businessContext");
  const entries = formData.getAll("files");
  if (entries.some((entry) => !isUploadedFile(entry))) {
    return jsonError("INVALID_REQUEST", "Each uploaded item must be a document file.", false, 400);
  }

  const files = entries.filter(isUploadedFile);
  if (!projectName || files.length === 0) {
    return jsonError("INVALID_REQUEST", "Provide a project name and at least one document.", false, 400);
  }

  let parsedDocuments;
  try {
    parsedDocuments = await parseUploadedDocuments(files);
  } catch (error) {
    if (error instanceof DocumentParsingError) {
      const status = error.code === "PAYLOAD_TOO_LARGE" ? 413 : 400;
      return jsonError(error.code, error.message, false, status);
    }

    return jsonError("PARSE_FAILURE", "We could not prepare the submitted documents for analysis.", false, 400);
  }

  try {
    const response = await getOpenAIClient().responses.create({
      model: "gpt-5.6",
      instructions: SYSTEM_PROMPT,
      input: buildAnalysisPrompt({
        projectName,
        businessContext,
        documents: parsedDocuments.context,
        documentCount: parsedDocuments.documents.length,
        analyzedAt: formatAssessmentDate(),
      }),
      reasoning: { effort: "medium" },
      store: false,
      max_output_tokens: 5000,
      text: { format: ANALYSIS_RESPONSE_FORMAT },
    }, { timeout: OPENAI_REQUEST_TIMEOUT_MS });

    if (response.status !== "completed" || !response.output_text) {
      logAnalysisEvent({ responseId: response.id, model: response.model, latencyMs: Math.round(performance.now() - startedAt), status: "incomplete", validation: "not_run" });
      return jsonError("ANALYSIS_INCOMPLETE", "The analysis could not be completed. Please try again.", true, 502);
    }

    let result: unknown;
    try {
      result = JSON.parse(response.output_text);
    } catch {
      logAnalysisEvent({ responseId: response.id, model: response.model, latencyMs: Math.round(performance.now() - startedAt), status: "completed", validation: "invalid_json" });
      return jsonError("ANALYSIS_INVALID", "The analysis response did not match the required format.", true, 502);
    }

    if (!isAnalysisResult(result) || result.documentCount !== parsedDocuments.documents.length) {
      logAnalysisEvent({ responseId: response.id, model: response.model, latencyMs: Math.round(performance.now() - startedAt), status: "completed", validation: "failed" });
      return jsonError("ANALYSIS_INVALID", "The analysis response did not match the required format.", true, 502);
    }

    logAnalysisEvent({
      responseId: response.id,
      model: response.model,
      latencyMs: Math.round(performance.now() - startedAt),
      status: "completed",
      validation: "passed",
      usage: response.usage ? { inputTokens: response.usage.input_tokens, outputTokens: response.usage.output_tokens, totalTokens: response.usage.total_tokens } : undefined,
    });
    return Response.json(result);
  } catch (error) {
    if (error instanceof OpenAIConfigurationError) {
      logAnalysisEvent({ latencyMs: Math.round(performance.now() - startedAt), status: "not_configured", validation: "not_run" });
      return jsonError("AI_NOT_CONFIGURED", "AI analysis is not configured on this server.", false, 500);
    }

    const latencyMs = Math.round(performance.now() - startedAt);
    if (error instanceof OpenAI.RateLimitError) {
      logAnalysisEvent({ latencyMs, status: "rate_limited", validation: "not_run" });
      return jsonError("RATE_LIMITED", "The analysis service is busy. Please try again shortly.", true, 429);
    }

    logAnalysisEvent({ latencyMs, status: "upstream_unavailable", validation: "not_run" });
    return jsonError("UPSTREAM_UNAVAILABLE", "The analysis service is temporarily unavailable. Please try again.", true, 503);
  }
}
