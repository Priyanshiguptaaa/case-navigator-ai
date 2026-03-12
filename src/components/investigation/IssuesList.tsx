import { AlertTriangle, ExternalLink } from "lucide-react";
import { caseIssues, type Severity, type SourceSystem } from "@/data/mockCaseData";

const severityBadge: Record<Severity, string> = {
  Critical: "severity-critical",
  High: "severity-high",
  Medium: "severity-medium",
  Low: "severity-low",
};

const sourceColor: Record<SourceSystem, string> = {
  CRM: "bg-primary/8 text-primary",
  Call: "bg-severity-high/8 text-severity-high",
  Appian: "bg-severity-medium/8 text-severity-medium",
  Email: "bg-severity-low/8 text-severity-low",
  Web: "bg-muted text-muted-foreground",
};

export function IssuesList() {
  return (
    <div className="panel-section">
      <div className="panel-header flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-muted-foreground" />
        Open Issues
        <span className="ml-auto text-[12px] text-muted-foreground font-normal">{caseIssues.length}</span>
      </div>
      <div className="divide-y divide-border">
        {caseIssues.map((issue) => (
          <div key={issue.id} className="p-5 hover:bg-muted/40 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <h4 className="text-[13px] font-medium text-foreground mb-2">{issue.title}</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${severityBadge[issue.severity]}`}>
                    {issue.severity}
                  </span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${sourceColor[issue.source]}`}>
                    {issue.source}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{issue.owner}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{issue.status}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {issue.evidence.map((ev) => (
                <span key={ev} className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer">
                  <ExternalLink className="w-3 h-3" />
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
