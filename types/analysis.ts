export type SignalPriority = "high" | "medium" | "low";
export type ExposureLevel = "high" | "medium" | "low";

export interface DecisionSignal {
  id: string;
  title: string;
  priority: SignalPriority;
  confidence: number;
  exposure: string[];
  status: "Open" | "Mitigated" | "Accepted" | "Resolved";
  whyItMatters: string;
  evidence: string[];
  recommendation: string;
  suggestedOwner: string;
}

export interface BusinessExposure {
  area: "Regulatory" | "Timeline" | "Financial";
  level: ExposureLevel;
  detail: string;
}

export interface AnalysisResult {
  source: "mock" | "live";
  projectName: string;
  analyzedAt: string;
  documentCount: number;
  healthScore: number;
  healthStatus: string;
  assessmentConfidence: "High" | "Medium" | "Low";
  recommendation: string;
  recommendationDetail: string;
  summary: string[];
  signals: DecisionSignal[];
  businessExposure: BusinessExposure[];
  nextActions: string[];
}
