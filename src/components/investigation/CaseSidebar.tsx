import { Pin, Plus, Search, Shield } from "lucide-react";
import { caseSessions, type CaseSession, type Severity } from "@/data/mockCaseData";
import { useState } from "react";

const severityDot: Record<Severity, string> = {
  Critical: "bg-severity-critical",
  High: "bg-severity-high",
  Medium: "bg-severity-medium",
  Low: "bg-severity-low",
};

interface CaseSidebarProps {
  activeCase: string;
  onSelectCase: (id: string) => void;
}

export function CaseSidebar({ activeCase, onSelectCase }: CaseSidebarProps) {
  const [search, setSearch] = useState("");

  const filtered = caseSessions.filter(
    (c) =>
      c.clientId.includes(search) ||
      c.caseType.toLowerCase().includes(search.toLowerCase()) ||
      c.caseId.toLowerCase().includes(search.toLowerCase())
  );

  const pinned = filtered.filter((c) => c.pinned);
  const recent = filtered.filter((c) => !c.pinned);

  return (
    <div className="w-72 h-full flex flex-col bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] border-r border-[hsl(var(--sidebar-border))]">
      {/* Header */}
      <div className="p-4 border-b border-[hsl(var(--sidebar-border))]">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-[hsl(var(--sidebar-primary))]" />
          <span className="font-semibold text-sm text-[hsl(var(--sidebar-accent-foreground))]">Investigation Hub</span>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[hsl(var(--sidebar-muted))]" />
          <input
            type="text"
            placeholder="Search cases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-md text-xs bg-[hsl(var(--sidebar-accent))] border border-[hsl(var(--sidebar-border))] text-[hsl(var(--sidebar-accent-foreground))] placeholder:text-[hsl(var(--sidebar-muted))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--sidebar-primary))]"
          />
        </div>
      </div>

      {/* Cases list */}
      <div className="flex-1 overflow-y-auto py-2">
        {pinned.length > 0 && (
          <div className="px-3 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--sidebar-muted))]">Pinned</span>
          </div>
        )}
        {pinned.map((c) => (
          <CaseItem key={c.id} item={c} active={activeCase === c.id} onClick={() => onSelectCase(c.id)} />
        ))}

        {recent.length > 0 && (
          <div className="px-3 mt-3 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--sidebar-muted))]">Recent</span>
          </div>
        )}
        {recent.map((c) => (
          <CaseItem key={c.id} item={c} active={activeCase === c.id} onClick={() => onSelectCase(c.id)} />
        ))}
      </div>

      {/* New Investigation */}
      <div className="p-3 border-t border-[hsl(var(--sidebar-border))]">
        <button className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium bg-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary-foreground))] hover:opacity-90 transition-opacity">
          <Plus className="w-3.5 h-3.5" />
          New Investigation
        </button>
      </div>
    </div>
  );
}

function CaseItem({ item, active, onClick }: { item: CaseSession; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 mx-1 rounded-md transition-colors ${
        active
          ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]"
          : "hover:bg-[hsl(var(--sidebar-accent)/0.5)] text-[hsl(var(--sidebar-foreground))]"
      }`}
      style={{ width: "calc(100% - 8px)" }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${severityDot[item.severity]}`} />
            <span className="text-xs font-medium truncate">Client {item.clientId}</span>
            {item.pinned && <Pin className="w-2.5 h-2.5 flex-shrink-0 text-[hsl(var(--sidebar-primary))]" />}
          </div>
          <p className="text-[10px] mt-0.5 truncate opacity-70">{item.caseType}</p>
        </div>
        <span className="text-[9px] opacity-50 flex-shrink-0 mt-0.5">{item.lastUpdated}</span>
      </div>
    </button>
  );
}
