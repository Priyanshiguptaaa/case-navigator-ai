import { FileEdit, FileText, AlertOctagon, Download, Save } from "lucide-react";

const actions = [
  { label: "Draft Client Update", icon: FileEdit, variant: "primary" as const },
  { label: "Internal Case Note", icon: FileText, variant: "secondary" as const },
  { label: "Escalate Case", icon: AlertOctagon, variant: "destructive" as const },
  { label: "Export Summary", icon: Download, variant: "secondary" as const },
  { label: "Save Investigation", icon: Save, variant: "secondary" as const },
];

const variantStyles = {
  primary: "bg-primary text-primary-foreground hover:brightness-110",
  secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
  destructive: "bg-destructive/8 text-destructive border border-destructive/15 hover:bg-destructive/12",
};

export function ActionBar() {
  return (
    <div className="flex items-center gap-2 px-6 py-3.5 bg-card border-t border-border">
      {actions.map((action) => (
        <button
          key={action.label}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${variantStyles[action.variant]}`}
        >
          <action.icon className="w-4 h-4" />
          {action.label}
        </button>
      ))}
    </div>
  );
}
