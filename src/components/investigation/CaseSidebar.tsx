import { Pin, Plus, Search, Shield, Users, BarChart3 } from "lucide-react";
import { caseSessions, type CaseSession, type Severity } from "@/data/mockCaseData";
import { useState } from "react";

const severityDot: Record<Severity, string> = {
  Critical: "bg-severity-critical",
  High: "bg-severity-high",
  Medium: "bg-severity-medium",
  Low: "bg-severity-low",
};

export type ViewMode = "client" | "exec";

interface CaseSidebarProps {
  activeCase: string | null;
  onSelectCase: (id: string) => void;
  onNewInvestigation: (clientId: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function CaseSidebar({ activeCase, onSelectCase, onNewInvestigation, viewMode, onViewModeChange }: CaseSidebarProps) {
  const [search, setSearch] = useState("");
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newClientId, setNewClientId] = useState("");

  const filtered = caseSessions.filter(
    (c) =>
      c.clientId.includes(search) ||
      c.caseType.toLowerCase().includes(search.toLowerCase()) ||
      c.caseId.toLowerCase().includes(search.toLowerCase())
  );

  const pinned = filtered.filter((c) => c.pinned);
  const recent = filtered.filter((c) => !c.pinned);

  const handleNewSubmit = () => {
    if (newClientId.trim()) {
      onNewInvestigation(newClientId.trim());
      setNewClientId("");
      setShowNewDialog(false);
    }
  };

  return (
    <div className="w-[280px] h-full flex flex-col bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[hsl(var(--sidebar-primary)/0.15)] flex items-center justify-center">
            <Shield className="w-4 h-4 text-[hsl(var(--sidebar-primary))]" />
          </div>
          <span className="font-semibold text-[13px] text-[hsl(var(--sidebar-accent-foreground))]">Client FRS</span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex rounded-lg bg-[hsl(var(--sidebar-accent))] p-0.5 mb-4">
          <button
            onClick={() => onViewModeChange("client")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[12px] font-medium transition-all ${
              viewMode === "client"
                ? "bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-accent-foreground))] shadow-sm"
                : "text-[hsl(var(--sidebar-muted))] hover:text-[hsl(var(--sidebar-foreground))]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Exploratory
          </button>
          <button
            onClick={() => onViewModeChange("exec")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[12px] font-medium transition-all ${
              viewMode === "exec"
                ? "bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-accent-foreground))] shadow-sm"
                : "text-[hsl(var(--sidebar-muted))] hover:text-[hsl(var(--sidebar-foreground))]"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Book of Business
          </button>
        </div>
      </div>

        </div>

        {viewMode === "client" && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[hsl(var(--sidebar-muted))]" />
            <input
              type="text"
              placeholder="Search cases…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg text-[13px] bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))] placeholder:text-[hsl(var(--sidebar-muted))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--sidebar-primary)/0.4)] transition-shadow"
            />
          </div>
        )}
      </div>

      {/* Cases list — only in client mode */}
      {viewMode === "client" && (
        <>
          <div className="flex-1 overflow-y-auto px-3 pb-2">
            {pinned.length > 0 && (
              <div className="px-2 mb-1.5 mt-1">
                <span className="text-[11px] font-medium text-[hsl(var(--sidebar-muted))]">Pinned</span>
              </div>
            )}
            {pinned.map((c) => (
              <CaseItem key={c.id} item={c} active={activeCase === c.id} onClick={() => onSelectCase(c.id)} />
            ))}

            {recent.length > 0 && (
              <div className="px-2 mt-4 mb-1.5">
                <span className="text-[11px] font-medium text-[hsl(var(--sidebar-muted))]">Recent</span>
              </div>
            )}
            {recent.map((c) => (
              <CaseItem key={c.id} item={c} active={activeCase === c.id} onClick={() => onSelectCase(c.id)} />
            ))}
          </div>

          {/* New Investigation */}
          <div className="p-4">
            {showNewDialog ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={newClientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNewSubmit();
                    if (e.key === "Escape") {
                      setShowNewDialog(false);
                      setNewClientId("");
                    }
                  }}
                  placeholder="Enter Client ID…"
                  autoFocus
                  className="w-full px-3 py-2.5 rounded-lg text-[13px] bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))] placeholder:text-[hsl(var(--sidebar-muted))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--sidebar-primary)/0.4)] transition-shadow"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowNewDialog(false); setNewClientId(""); }}
                    className="flex-1 py-2 rounded-lg text-[12px] font-medium text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNewSubmit}
                    disabled={!newClientId.trim()}
                    className="flex-1 py-2 rounded-lg text-[12px] font-medium bg-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary-foreground))] hover:brightness-110 transition-all disabled:opacity-40"
                  >
                    Start
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowNewDialog(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-medium bg-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary-foreground))] hover:brightness-110 transition-all"
              >
                <Plus className="w-4 h-4" />
                New Investigation
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function CaseItem({ item, active, onClick }: { item: CaseSession; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all mb-0.5 ${
        active
          ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]"
          : "hover:bg-[hsl(var(--sidebar-accent)/0.5)] text-[hsl(var(--sidebar-foreground))]"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${severityDot[item.severity]}`} />
          <span className="text-[13px] font-medium truncate">Client {item.clientId}</span>
          {item.pinned && <Pin className="w-3 h-3 flex-shrink-0 text-[hsl(var(--sidebar-muted))]" />}
        </div>
        <span className="text-[10px] text-[hsl(var(--sidebar-muted))] flex-shrink-0">{item.lastUpdated}</span>
      </div>
    </button>
  );
}
