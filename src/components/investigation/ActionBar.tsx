import { FileEdit, FileText, AlertOctagon, Download, Save } from "lucide-react";

const actions = [
  { label: "Draft Client Update", icon: FileEdit, variant: "primary" as const },
  { label: "Internal Case Note", icon: FileText, variant: "secondary" as const },
  { label: "Escalate Case", icon: AlertOctagon, variant: "destructive" as const },
  { label: "Export Summary", icon: Download, variant: "secondary" as const },
  { label: "Save Investigation", icon: Save, variant: "secondary" as const },
];

const variantStyles = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
  destructive: "bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20",
};

export function ActionBar() {
  return (
    <div className="flex items-center gap-2 px-6 py-3 bg-card border-t border-border">
      {actions.map((action) => (
        <button
          key={action.label}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${variantStyles[action.variant]}`}
        >
          <action.icon className="w-3.5 h-3.5" />
          {action.label}
        </button>
      ))}
    </div>
  );
}
