import { Brain, TrendingDown, TrendingUp, Zap, Calendar, AlertCircle, ThermometerSun } from "lucide-react";
import { intelligenceInsights, type IntelligenceInsight, type Sentiment } from "@/data/mockCaseData";

const iconMap: Record<IntelligenceInsight["type"], React.ReactNode> = {
  root_cause: <Brain className="w-4 h-4 text-primary" />,
  sentiment_trajectory: <TrendingDown className="w-4 h-4 text-severity-critical" />,
  current_sentiment: <ThermometerSun className="w-4 h-4 text-severity-high" />,
  recent_friction: <Zap className="w-4 h-4 text-severity-high" />,
  upcoming_appointments: <Calendar className="w-4 h-4 text-primary" />,
  issues: <AlertCircle className="w-4 h-4 text-severity-medium" />,
};

const sentimentStyle: Record<Sentiment, string> = {
  Negative: "text-severity-critical bg-severity-critical/8 border-severity-critical/15",
  Neutral: "text-severity-medium bg-severity-medium/8 border-severity-medium/15",
  Positive: "text-severity-low bg-severity-low/8 border-severity-low/15",
};

export function IntelligenceSummary() {
  return (
    <div className="panel-section">
      <div className="panel-header flex items-center gap-2">
        <Brain className="w-4 h-4 text-muted-foreground" />
        Client Intelligence
      </div>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {intelligenceInsights.map((insight) => (
          <div key={insight.label} className="investigation-card flex gap-3">
            <div className="mt-0.5 flex-shrink-0">{iconMap[insight.type]}</div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-muted-foreground mb-1">{insight.label}</p>
              {insight.type === "current_sentiment" ? (
                <span className={`text-[12px] font-medium px-2.5 py-1 rounded-md border inline-block ${sentimentStyle[insight.value as Sentiment]}`}>
                  {insight.value}
                </span>
              ) : (
                <p className="text-[13px] text-foreground leading-relaxed">{insight.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
