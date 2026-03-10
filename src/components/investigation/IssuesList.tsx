import { AlertTriangle, ExternalLink } from "lucide-react";
import { caseIssues, type Severity, type SourceSystem } from "@/data/mockCaseData";

const severityBadge: Record<Severity, string> = {
  Critical: "severity-critical",
  High: "severity-high",
  Medium: "severity-medium",
  Low: "severity-low",
};

const sourceColor: Record<SourceSystem, string> = {
  CRM: "bg-primary/10 text-primary",
  Call: "bg-severity-high/10 text-severity-high",
  Appian: "bg-severity-medium/10 text-severity-medium",
  Email: "bg-severity-low/10 text-severity-low",
  Web: "bg-muted text-muted-foreground",
};

export function IssuesList() {
  return (
    <div className="panel-section">
      <div className="panel-header flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5" />
        Open Issues ({caseIssues.length})
      </div>
      <div className="divide-y divide-border">
        {caseIssues.map((issue) => (
          <div key={issue.id} className="p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-foreground">{issue.title}</h4>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${severityBadge[issue.severity]}`}>
                    {issue.severity}
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${sourceColor[issue.source]}`}>
                    {issue.source}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{issue.owner}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{issue.status}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {issue.evidence.map((ev) => (
                <span key={ev} className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline cursor-pointer">
                  <ExternalLink className="w-2.5 h-2.5" />
                  {ev}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
