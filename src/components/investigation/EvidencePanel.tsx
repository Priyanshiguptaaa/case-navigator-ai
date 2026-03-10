import { FileText, ExternalLink, Database, Phone, Mail, Workflow, Globe } from "lucide-react";
import { evidenceItems, type SourceSystem } from "@/data/mockCaseData";

const sourceIcon: Record<SourceSystem, React.ReactNode> = {
  CRM: <Database className="w-3 h-3" />,
  Call: <Phone className="w-3 h-3" />,
  Email: <Mail className="w-3 h-3" />,
  Appian: <Workflow className="w-3 h-3" />,
  Web: <Globe className="w-3 h-3" />,
};

export function EvidencePanel() {
  return (
    <div className="panel-section">
      <div className="panel-header flex items-center gap-2">
        <FileText className="w-3.5 h-3.5" />
        Evidence & Sources
      </div>
      <div className="divide-y divide-border">
        {evidenceItems.map((ev) => (
          <div key={ev.id} className="p-3 hover:bg-muted/30 transition-colors cursor-pointer group">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-muted-foreground">{sourceIcon[ev.type]}</span>
              <span className="text-[10px] font-medium text-primary">{ev.reference}</span>
              <ExternalLink className="w-2.5 h-2.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{ev.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
