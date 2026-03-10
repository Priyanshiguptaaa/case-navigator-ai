export type Severity = "Critical" | "High" | "Medium" | "Low";
export type Sentiment = "Negative" | "Neutral" | "Positive";
export type CaseStatus = "Open" | "In Progress" | "Pending Client" | "Escalated" | "Resolved";
export type SourceSystem = "CRM" | "Call" | "Appian" | "Email" | "Web";
export type IssueOwner = "Client Action Required" | "Internal Ops" | "Third Party";

export interface CaseSession {
  id: string;
  clientId: string;
  caseId: string;
  caseType: string;
  severity: Severity;
  lastUpdated: string;
  pinned?: boolean;
}

export interface CaseDetail {
  clientId: string;
  caseId: string;
  status: CaseStatus;
  severity: Severity;
  sentiment: Sentiment;
  interactionsAnalyzed: number;
  nigoCount: number;
  timeOpen: string;
  lastUpdate: string;
}

export interface IntelligenceInsight {
  label: string;
  value: string;
  type: "root_cause" | "sentiment" | "friction" | "action" | "issues";
}

export interface CaseIssue {
  id: string;
  title: string;
  severity: Severity;
  source: SourceSystem;
  owner: IssueOwner;
  status: string;
  evidence: string[];
}

export interface TimelineEvent {
  date: string;
  type: SourceSystem;
  summary: string;
  sentiment?: Sentiment;
}

export interface Evidence {
  id: string;
  type: SourceSystem;
  reference: string;
  summary: string;
}

export interface AgentStatus {
  name: string;
  status: "complete" | "processing" | "idle";
}

export const caseSessions: CaseSession[] = [
  { id: "1", clientId: "10482", caseId: "INV-2024-0847", caseType: "CIP Restriction", severity: "High", lastUpdated: "2 min ago", pinned: true },
  { id: "2", clientId: "88712", caseId: "INV-2024-0839", caseType: "Ownership Transfer Delay", severity: "Medium", lastUpdated: "18 min ago" },
  { id: "3", clientId: "99137", caseId: "INV-2024-0841", caseType: "Repeated NIGO", severity: "Critical", lastUpdated: "1 hr ago", pinned: true },
  { id: "4", clientId: "45290", caseId: "INV-2024-0832", caseType: "Wire Processing Error", severity: "High", lastUpdated: "3 hrs ago" },
  { id: "5", clientId: "67123", caseId: "INV-2024-0828", caseType: "Account Restriction", severity: "Low", lastUpdated: "1 day ago" },
];

export const activeCaseDetail: CaseDetail = {
  clientId: "10482",
  caseId: "INV-2024-0847",
  status: "In Progress",
  severity: "High",
  sentiment: "Negative",
  interactionsAnalyzed: 14,
  nigoCount: 3,
  timeOpen: "6 days",
  lastUpdate: "2 min ago",
};

export const intelligenceInsights: IntelligenceInsight[] = [
  { label: "Root Cause", value: "CIP restriction preventing account transfer due to unverified identity documentation", type: "root_cause" },
  { label: "Client Sentiment", value: "Negative — escalating frustration across last 3 interactions", type: "sentiment" },
  { label: "Primary Friction", value: "Document requirements unclear to client; repeated NIGO submissions", type: "friction" },
  { label: "Recommended Action", value: "Client must upload government-issued photo ID to remove CIP restriction. Ops should pre-validate format before resubmission.", type: "action" },
  { label: "Open Issues", value: "3 unresolved issues identified", type: "issues" },
];

export const caseIssues: CaseIssue[] = [
  {
    id: "ISS-001",
    title: "CIP restriction on receiving account",
    severity: "Critical",
    source: "CRM",
    owner: "Client Action Required",
    status: "Open",
    evidence: ["CRM Case #123456", "Call transcript #abc321", "Appian WF #APW-8847"],
  },
  {
    id: "ISS-002",
    title: "Missing ownership change documentation",
    severity: "High",
    source: "Appian",
    owner: "Client Action Required",
    status: "Pending",
    evidence: ["Appian WF #APW-8812", "Email thread #EM-4421"],
  },
  {
    id: "ISS-003",
    title: "Delayed processing due to incorrect account coding",
    severity: "Medium",
    source: "CRM",
    owner: "Internal Ops",
    status: "In Review",
    evidence: ["CRM Case #123460", "Appian WF #APW-8850"],
  },
];

export const timelineEvents: TimelineEvent[] = [
  { date: "Jul 10", type: "Web", summary: "Client submitted Change of Ownership request via web portal — Auto-rejected due to CIP restriction", sentiment: "Neutral" },
  { date: "Jul 11", type: "Call", summary: "Client called requesting status update. Expressed frustration with lack of communication. Duration: 22 min", sentiment: "Negative" },
  { date: "Jul 12", type: "Appian", summary: "NIGO flagged on submitted documentation — missing government-issued photo ID", sentiment: "Neutral" },
  { date: "Jul 13", type: "Email", summary: "Client sent email with scanned documents — incorrect format (TIFF not accepted)", sentiment: "Negative" },
  { date: "Jul 14", type: "CRM", summary: "Internal note: Account coding updated from type B to type A. Previous coding was blocking workflow.", sentiment: "Neutral" },
  { date: "Jul 15", type: "Call", summary: "Client called again — escalation requested. Threatened to move assets. Duration: 34 min", sentiment: "Negative" },
  { date: "Jul 16", type: "Appian", summary: "Second NIGO flagged — document quality insufficient for verification", sentiment: "Neutral" },
];

export const evidenceItems: Evidence[] = [
  { id: "E1", type: "CRM", reference: "CRM Case #123456", summary: "Initial case opened for CIP restriction on receiving account" },
  { id: "E2", type: "Call", reference: "Call #abc321", summary: "Client call Jul 11 — requested status update, negative sentiment" },
  { id: "E3", type: "Appian", reference: "Appian WF #APW-8847", summary: "Workflow tracking ownership transfer — NIGO flagged twice" },
  { id: "E4", type: "Email", reference: "Email #EM-4421", summary: "Client document submission — incorrect format rejected" },
  { id: "E5", type: "CRM", reference: "CRM Case #123460", summary: "Account coding correction — type B to type A" },
  { id: "E6", type: "Call", reference: "Call #def654", summary: "Escalation call Jul 15 — client threatened asset transfer" },
];

export const agentStatuses: AgentStatus[] = [
  { name: "CRM Agent", status: "complete" },
  { name: "Call Agent", status: "complete" },
  { name: "Email Agent", status: "complete" },
  { name: "Appian Agent", status: "complete" },
  { name: "Frontline Agent", status: "processing" },
];

export const suggestedPrompts = [
  "Explain the root cause of this case",
  "Rank issues by urgency",
  "Separate client vs internal actions",
  "Draft internal case summary",
  "Draft client update communication",
  "What changed since last interaction?",
];
