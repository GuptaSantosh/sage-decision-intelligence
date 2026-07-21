import { isAnalysisResult } from "@/lib/analysis-validation";
import type { AnalysisResult } from "@/types/analysis";

export const ANALYSIS_SESSION_KEY = "sage-decision-intelligence:analysis";

let cachedStoredResult: string | null = null;
let cachedAnalysis: AnalysisResult | null = null;

export function saveAnalysisToSession(result: AnalysisResult) {
  cachedStoredResult = JSON.stringify(result);
  cachedAnalysis = result;
  window.sessionStorage.setItem(ANALYSIS_SESSION_KEY, cachedStoredResult);
}

/** Clear a completed assessment before a new upload begins. */
export function clearAnalysisFromSession() {
  cachedStoredResult = null;
  cachedAnalysis = null;
  window.sessionStorage.removeItem(ANALYSIS_SESSION_KEY);
}

export function readAnalysisFromSession(): AnalysisResult | null {
  const storedResult = window.sessionStorage.getItem(ANALYSIS_SESSION_KEY);
  if (!storedResult) return null;

  if (storedResult === cachedStoredResult) return cachedAnalysis;

  try {
    const parsedResult: unknown = JSON.parse(storedResult);
    cachedStoredResult = storedResult;
    cachedAnalysis = isAnalysisResult(parsedResult) ? parsedResult : null;
    return cachedAnalysis;
  } catch {
    cachedStoredResult = storedResult;
    cachedAnalysis = null;
    return null;
  }
}

export function subscribeToAnalysisSession(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}
