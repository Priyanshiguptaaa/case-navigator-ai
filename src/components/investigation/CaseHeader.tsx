import { Clock, FileWarning, MessageSquare, Activity } from "lucide-react";
import { activeCaseDetail, type Severity, type Sentiment, type CaseStatus } from "@/data/mockCaseData";

const severityStyle: Record<Severity, string> = {
  Critical: "severity-critical",
  High: "severity-high",
  Medium: "severity-medium",
  Low: "severity-low",
};

const sentimentStyle: Record<Sentiment, string> = {
  Negative: "severity-critical",
  Neutral: "severity-medium",
  Positive: "severity-low",
};

const statusStyle: Record<CaseStatus, string> = {
  "Open": "severity-high",
  "In Progress": "bg-primary/8 text-primary border-primary/15",
  "Pending Client": "severity-high",
  "Escalated": "severity-critical",
  "Resolved": "severity-low",
};

export function CaseHeader() {
  const c = activeCaseDetail;

  return (
    <div className="bg-card border-b border-border px-6 py-5">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left: ID and status */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[17px] font-semibold text-foreground tracking-tight">Client {c.clientId}</h1>
            <span className="text-[12px] text-muted-foreground font-mono tracking-wide">{c.caseId}</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-medium px-2.5 py-1 rounded-md border ${statusStyle[c.status]}`}>
              {c.status}
            </span>
            <span className={`text-[11px] font-medium px-2.5 py-1 rounded-md border ${severityStyle[c.severity]}`}>
              {c.severity}
            </span>
            <span className={`text-[11px] font-medium px-2.5 py-1 rounded-md border ${sentimentStyle[c.sentiment]}`}>
              {c.sentiment}
            </span>
          </div>
        </div>

        {/* Right: Metrics */}
        <div className="flex items-center gap-6 text-[12px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{c.interactionsAnalyzed} interactions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileWarning className="w-3.5 h-3.5" />
            <span>{c.nigoCount} NIGO</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{c.timeOpen} open</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>{c.lastUpdate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
