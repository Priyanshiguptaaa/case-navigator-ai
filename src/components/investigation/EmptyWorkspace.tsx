import { Search, Shield, ArrowRight } from "lucide-react";
import { useState } from "react";

interface EmptyWorkspaceProps {
  onNewInvestigation: (clientId: string) => void;
}

export function EmptyWorkspace({ onNewInvestigation }: EmptyWorkspaceProps) {
  const [clientId, setClientId] = useState("");

  const handleSubmit = () => {
    if (clientId.trim()) {
      onNewInvestigation(clientId.trim());
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-6">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
            <Shield className="w-7 h-7 text-muted-foreground" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-[22px] font-semibold text-foreground tracking-tight mb-2">
            Start an Investigation
          </h2>
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            Enter a Client ID to load the investigation workspace. The system will analyze interactions across CRM, calls, emails, and workflows.
          </p>
        </div>

        {/* Input */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter Client ID…"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-[14px] bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-shadow"
              autoFocus
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!clientId.trim()}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-medium bg-primary text-primary-foreground hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Load Investigation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Hint */}
        <p className="text-center text-[12px] text-muted-foreground mt-5">
          Or select an existing case from the sidebar
        </p>
      </div>
    </div>
  );
}
