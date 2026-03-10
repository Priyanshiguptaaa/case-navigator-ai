import { CheckCircle2, Loader2, Circle } from "lucide-react";
import { agentStatuses, type AgentStatus } from "@/data/mockCaseData";

const statusIcon: Record<AgentStatus["status"], React.ReactNode> = {
  complete: <CheckCircle2 className="w-3 h-3 text-agent-active" />,
  processing: <Loader2 className="w-3 h-3 text-agent-processing animate-spin" />,
  idle: <Circle className="w-3 h-3 text-agent-idle" />,
};

export function AgentStatusBar() {
  return (
    <div className="flex items-center gap-4 px-6 py-2 bg-muted/50 border-b border-border">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Forensic Agents</span>
      <div className="flex items-center gap-3">
        {agentStatuses.map((agent) => (
          <div key={agent.name} className="flex items-center gap-1.5">
            {statusIcon[agent.status]}
            <span className="text-[10px] text-muted-foreground">{agent.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
