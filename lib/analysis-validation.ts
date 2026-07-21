import {
  ASSESSMENT_CONFIDENCES,
  BUSINESS_EXPOSURE_AREAS,
  BUSINESS_EXPOSURE_LEVELS,
  HEALTH_STATUSES,
  RECOMMENDATIONS,
  SIGNAL_PRIORITIES,
  SIGNAL_STATUSES,
  type AnalysisResult,
  type BusinessExposure,
  type DecisionSignal,
} from "@/types/analysis";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const isScore = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 100;

const isOneOf = <T extends readonly string[]>(value: unknown, values: T): value is T[number] =>
  typeof value === "string" && values.includes(value as T[number]);

function isDecisionSignal(value: unknown): value is DecisionSignal {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    value.id.trim().length > 0 &&
    typeof value.title === "string" &&
    value.title.trim().length > 0 &&
    isOneOf(value.priority, SIGNAL_PRIORITIES) &&
    isScore(value.confidence) &&
    Array.isArray(value.exposure) &&
    value.exposure.every((area) => isOneOf(area, BUSINESS_EXPOSURE_AREAS)) &&
    isOneOf(value.status, SIGNAL_STATUSES) &&
    typeof value.whyItMatters === "string" &&
    isStringArray(value.evidence) &&
    typeof value.recommendation === "string" &&
    typeof value.suggestedOwner === "string"
  );
}

function isBusinessExposure(value: unknown): value is BusinessExposure {
  return (
    isRecord(value) &&
    isOneOf(value.area, BUSINESS_EXPOSURE_AREAS) &&
    isOneOf(value.level, BUSINESS_EXPOSURE_LEVELS) &&
    typeof value.detail === "string"
  );
}

/** Browser-safe validation for both live session data and model responses. */
export function isAnalysisResult(value: unknown): value is AnalysisResult {
  if (!isRecord(value)) return false;

  return (
    value.source === "live" &&
    typeof value.projectName === "string" &&
    typeof value.analyzedAt === "string" &&
    typeof value.documentCount === "number" &&
    Number.isInteger(value.documentCount) &&
    value.documentCount >= 1 &&
    isScore(value.healthScore) &&
    isOneOf(value.healthStatus, HEALTH_STATUSES) &&
    isOneOf(value.assessmentConfidence, ASSESSMENT_CONFIDENCES) &&
    isOneOf(value.recommendation, RECOMMENDATIONS) &&
    typeof value.recommendationDetail === "string" &&
    isStringArray(value.summary) &&
    value.summary.length >= 3 &&
    value.summary.length <= 5 &&
    Array.isArray(value.signals) &&
    value.signals.length <= 5 &&
    value.signals.every(isDecisionSignal) &&
    hasDistinctSignals(value.signals) &&
    Array.isArray(value.businessExposure) &&
    value.businessExposure.length === 3 &&
    hasRequiredExposureAreas(value.businessExposure) &&
    isStringArray(value.nextActions) &&
    value.nextActions.length >= 3 &&
    value.nextActions.length <= 5
  );
}

function normalizeSignalText(value: string) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

function hasDistinctSignals(signals: DecisionSignal[]) {
  const ids = new Set(signals.map((signal) => normalizeSignalText(signal.id)));
  const titles = signals.map((signal) => normalizeSignalText(signal.title));

  return (
    ids.size === signals.length &&
    new Set(titles).size === titles.length &&
    !titles.some((title, index) =>
      titles.slice(index + 1).some((otherTitle) => areNearDuplicateTitles(title, otherTitle)),
    )
  );
}

function areNearDuplicateTitles(left: string, right: string) {
  const leftTokens = new Set(left.split(/[^\p{L}\p{N}]+/u).filter((token) => token.length > 2));
  const rightTokens = new Set(right.split(/[^\p{L}\p{N}]+/u).filter((token) => token.length > 2));

  if (leftTokens.size === 0 || rightTokens.size === 0) return false;

  const sharedTokens = [...leftTokens].filter((token) => rightTokens.has(token)).length;
  return sharedTokens / Math.min(leftTokens.size, rightTokens.size) >= 0.66;
}

function hasRequiredExposureAreas(exposures: unknown[]): exposures is BusinessExposure[] {
  return (
    exposures.length === BUSINESS_EXPOSURE_AREAS.length &&
    exposures.every(isBusinessExposure) &&
    new Set(exposures.map((exposure) => exposure.area)).size === BUSINESS_EXPOSURE_AREAS.length &&
    BUSINESS_EXPOSURE_AREAS.every((area) => exposures.some((exposure) => exposure.area === area))
  );
}
