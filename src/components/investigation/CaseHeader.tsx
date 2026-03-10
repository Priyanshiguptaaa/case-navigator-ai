import { AlertTriangle, Clock, FileWarning, MessageSquare, Activity, TrendingDown } from "lucide-react";
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
  "In Progress": "severity-medium",
  "Pending Client": "severity-high",
  "Escalated": "severity-critical",
  "Resolved": "severity-low",
};

export function CaseHeader() {
  const c = activeCaseDetail;

  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* Left: ID and status */}
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-foreground">Client {c.clientId}</h1>
              <span className="text-xs text-muted-foreground font-mono">{c.caseId}</span>
            </div>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusStyle[c.status]}`}>
            {c.status}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${severityStyle[c.severity]}`}>
            {c.severity} Priority
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${sentimentStyle[c.sentiment]}`}>
            {c.sentiment} Sentiment
          </span>
        </div>

        {/* Right: Metrics */}
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{c.interactionsAnalyzed} interactions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileWarning className="w-3.5 h-3.5 text-severity-high" />
            <span>{c.nigoCount} NIGO</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{c.timeOpen} open</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Updated {c.lastUpdate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
