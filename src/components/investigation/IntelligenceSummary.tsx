import { Brain, TrendingDown, Zap, ArrowRight, AlertCircle } from "lucide-react";
import { intelligenceInsights, type IntelligenceInsight } from "@/data/mockCaseData";

const iconMap: Record<IntelligenceInsight["type"], React.ReactNode> = {
  root_cause: <Brain className="w-4 h-4 text-primary" />,
  sentiment: <TrendingDown className="w-4 h-4 text-severity-critical" />,
  friction: <Zap className="w-4 h-4 text-severity-high" />,
  action: <ArrowRight className="w-4 h-4 text-severity-low" />,
  issues: <AlertCircle className="w-4 h-4 text-severity-medium" />,
};

export function IntelligenceSummary() {
  return (
    <div className="panel-section">
      <div className="panel-header flex items-center gap-2">
        <Brain className="w-3.5 h-3.5" />
        Case Intelligence Summary
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {intelligenceInsights.map((insight) => (
          <div key={insight.label} className="investigation-card flex gap-3">
            <div className="mt-0.5 flex-shrink-0">{iconMap[insight.type]}</div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">{insight.label}</p>
              <p className="text-xs text-foreground leading-relaxed">{insight.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
