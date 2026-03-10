import { Clock, Phone, Mail, Globe, Workflow, Database } from "lucide-react";
import { timelineEvents, type SourceSystem, type Sentiment } from "@/data/mockCaseData";

const sourceIcon: Record<SourceSystem, React.ReactNode> = {
  Web: <Globe className="w-3.5 h-3.5" />,
  Call: <Phone className="w-3.5 h-3.5" />,
  Appian: <Workflow className="w-3.5 h-3.5" />,
  Email: <Mail className="w-3.5 h-3.5" />,
  CRM: <Database className="w-3.5 h-3.5" />,
};

const sentimentDot: Record<Sentiment, string> = {
  Negative: "bg-severity-critical",
  Neutral: "bg-muted-foreground",
  Positive: "bg-severity-low",
};

export function CaseTimeline() {
  return (
    <div className="panel-section">
      <div className="panel-header flex items-center gap-2">
        <Clock className="w-3.5 h-3.5" />
        Client Journey Timeline
      </div>
      <div className="p-4">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-4">
            {timelineEvents.map((event, i) => (
              <div key={i} className="flex gap-3 relative">
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0 z-10 border border-border">
                  {sourceIcon[event.type]}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground">{event.date}</span>
                    <span className="text-[10px] font-medium text-muted-foreground">{event.type}</span>
                    {event.sentiment && (
                      <span className={`w-1.5 h-1.5 rounded-full ${sentimentDot[event.sentiment]}`} />
                    )}
                  </div>
                  <p className="text-xs text-foreground leading-relaxed">{event.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
