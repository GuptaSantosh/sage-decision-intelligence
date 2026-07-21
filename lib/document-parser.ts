import mammoth from "mammoth";

export const MAX_FILE_COUNT = 6;
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
export const MAX_COMBINED_EXTRACTED_TEXT_CHARS = 100_000;

const SUPPORTED_EXTENSIONS = new Set([".txt", ".md", ".pdf", ".docx"]);

export type DocumentParsingErrorCode =
  | "UNSUPPORTED_FILE_TYPE"
  | "FILE_TOO_LARGE"
  | "TOO_MANY_FILES"
  | "EMPTY_EXTRACTED_TEXT"
  | "PARSE_FAILURE"
  | "PAYLOAD_TOO_LARGE";

export class DocumentParsingError extends Error {
  constructor(
    public readonly code: DocumentParsingErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "DocumentParsingError";
  }
}

export interface ParsedDocument {
  filename: string;
  text: string;
}

export interface ParsedDocumentContext {
  documents: ParsedDocument[];
  context: string;
}

type PdfDependencies = {
  PDFParse: typeof import("pdf-parse").PDFParse;
  CanvasFactory: typeof import("pdf-parse/worker").CanvasFactory;
};

let pdfDependenciesPromise: Promise<PdfDependencies> | undefined;

/**
 * Extracts server-side text only. OCR is intentionally out of scope: image-only PDFs
 * return EMPTY_EXTRACTED_TEXT rather than attempting to infer content from images.
 */
export async function parseUploadedDocuments(files: File[]): Promise<ParsedDocumentContext> {
  if (files.length > MAX_FILE_COUNT) {
    throw new DocumentParsingError(
      "TOO_MANY_FILES",
      `Upload no more than ${MAX_FILE_COUNT} documents at a time.`,
    );
  }

  const documents: ParsedDocument[] = [];
  let combinedLength = 0;

  for (const file of files) {
    const extension = getExtension(file.name);
    if (!SUPPORTED_EXTENSIONS.has(extension)) {
      throw new DocumentParsingError(
        "UNSUPPORTED_FILE_TYPE",
        `${displayFilename(file.name)} is not a supported document type. Upload TXT, Markdown, PDF, or DOCX files.`,
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new DocumentParsingError(
        "FILE_TOO_LARGE",
        `${displayFilename(file.name)} exceeds the 10 MB per-file limit.`,
      );
    }

    let extractedText: string;
    try {
      extractedText = await extractText(file, extension);
    } catch {
      throw new DocumentParsingError(
        "PARSE_FAILURE",
        `We could not read ${displayFilename(file.name)}. Please confirm that the file is a valid ${extension.slice(1).toUpperCase()} document.`,
      );
    }

    const text = cleanExtractedText(extractedText);
    if (!text) {
      throw new DocumentParsingError(
        "EMPTY_EXTRACTED_TEXT",
        `${displayFilename(file.name)} does not contain extractable text. Image-only PDFs are not supported.`,
      );
    }

    combinedLength += text.length;
    if (combinedLength > MAX_COMBINED_EXTRACTED_TEXT_CHARS) {
      throw new DocumentParsingError(
        "PAYLOAD_TOO_LARGE",
        "The extracted document text is too large to analyze. Upload fewer or shorter documents.",
      );
    }

    documents.push({ filename: sanitizeFilename(file.name), text });
  }

  if (documents.length === 0) {
    throw new DocumentParsingError("EMPTY_EXTRACTED_TEXT", "Upload at least one document containing text.");
  }

  return {
    documents,
    context: documents
      .map(({ filename, text }) => `=== DOCUMENT: ${filename} ===\n${text}\n=== END DOCUMENT ===`)
      .join("\n\n"),
  };
}

function getExtension(filename: string) {
  const lastDot = filename.lastIndexOf(".");
  return lastDot >= 0 ? filename.slice(lastDot).toLocaleLowerCase() : "";
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim() || "Untitled document";
}

function displayFilename(filename: string) {
  return sanitizeFilename(filename);
}

async function extractText(file: File, extension: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (extension === ".txt" || extension === ".md") {
    return buffer.toString("utf8");
  }

  if (extension === ".docx") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  const { PDFParse, CanvasFactory } = await loadPdfDependencies();
  const parser = new PDFParse({ data: buffer, CanvasFactory });
  try {
    const result = await parser.getText();
    return result.text;
  } finally {
    await parser.destroy();
  }
}

/**
 * Keep PDF-only native and worker dependencies out of TXT, Markdown, and DOCX requests.
 * pdf-parse v2's worker module provides both the serverless-safe worker source and canvas
 * factory required by its PDF.js runtime.
 */
function loadPdfDependencies() {
  pdfDependenciesPromise ??= Promise.all([import("pdf-parse"), import("pdf-parse/worker")]).then(
    ([pdfModule, workerModule]) => {
      pdfModule.PDFParse.setWorker(workerModule.getData());
      return {
        PDFParse: pdfModule.PDFParse,
        CanvasFactory: workerModule.CanvasFactory,
      };
    },
  );

  return pdfDependenciesPromise;
}

function cleanExtractedText(text: string) {
  return text
    .replace(/\r\n?/g, "\n")
    .replace(/[\t ]+\n/g, "\n")
    .replace(/[\t ]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
