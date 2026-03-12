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
  Neutral: "bg-muted-foreground/40",
  Positive: "bg-severity-low",
};

export function CaseTimeline() {
  return (
    <div className="panel-section">
      <div className="panel-header flex items-center gap-2">
        <Clock className="w-4 h-4 text-muted-foreground" />
        Timeline
      </div>
      <div className="p-5">
        <div className="relative">
          <div className="absolute left-[17px] top-3 bottom-3 w-px bg-border" />

          <div className="space-y-5">
            {timelineEvents.map((event, i) => (
              <div key={i} className="flex gap-3.5 relative">
                <div className="w-[34px] h-[34px] rounded-full bg-muted flex items-center justify-center flex-shrink-0 z-10 text-muted-foreground">
                  {sourceIcon[event.type]}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-medium text-muted-foreground">{event.date}</span>
                    <span className="text-[11px] text-muted-foreground/60">{event.type}</span>
                    {event.sentiment && (
                      <span className={`w-1.5 h-1.5 rounded-full ${sentimentDot[event.sentiment]}`} />
                    )}
                  </div>
                  <p className="text-[13px] text-foreground leading-relaxed">{event.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
