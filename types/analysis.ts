export const ANALYSIS_SOURCES = ["mock", "live"] as const;
export const RECOMMENDATIONS = ["Proceed", "Proceed with Conditions", "Do Not Proceed Yet"] as const;
export const HEALTH_STATUSES = ["Healthy", "Stable, needs attention", "At risk"] as const;
export const ASSESSMENT_CONFIDENCES = ["High", "Medium", "Low"] as const;
export const SIGNAL_PRIORITIES = ["high", "medium", "low"] as const;
export const SIGNAL_STATUSES = ["Open", "Mitigated", "Accepted", "Resolved"] as const;
export const BUSINESS_EXPOSURE_AREAS = ["Regulatory", "Timeline", "Financial"] as const;
export const BUSINESS_EXPOSURE_LEVELS = ["high", "medium", "low"] as const;

export type AnalysisSource = (typeof ANALYSIS_SOURCES)[number];
export type Recommendation = (typeof RECOMMENDATIONS)[number];
export type HealthStatus = (typeof HEALTH_STATUSES)[number];
export type AssessmentConfidence = (typeof ASSESSMENT_CONFIDENCES)[number];
export type SignalPriority = (typeof SIGNAL_PRIORITIES)[number];
export type SignalStatus = (typeof SIGNAL_STATUSES)[number];
export type BusinessExposureArea = (typeof BUSINESS_EXPOSURE_AREAS)[number];
export type ExposureLevel = (typeof BUSINESS_EXPOSURE_LEVELS)[number];

export interface DecisionSignal {
  id: string;
  title: string;
  priority: SignalPriority;
  confidence: number;
  exposure: BusinessExposureArea[];
  status: SignalStatus;
  whyItMatters: string;
  evidence: string[];
  recommendation: string;
  suggestedOwner: string;
}

export interface BusinessExposure {
  area: BusinessExposureArea;
  level: ExposureLevel;
  detail: string;
}

export interface AnalysisResult {
  source: AnalysisSource;
  projectName: string;
  analyzedAt: string;
  documentCount: number;
  healthScore: number;
  healthStatus: HealthStatus;
  assessmentConfidence: AssessmentConfidence;
  recommendation: Recommendation;
  recommendationDetail: string;
  summary: string[];
  signals: DecisionSignal[];
  businessExposure: BusinessExposure[];
  nextActions: string[];
}
