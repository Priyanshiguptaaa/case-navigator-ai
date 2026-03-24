import { useState } from "react";
import { FileEdit, FileText, AlertOctagon, Download, Phone } from "lucide-react";
import { toast } from "sonner";
import { DraftClientUpdateModal } from "./actions/DraftClientUpdateModal";
import { InternalCaseNoteModal } from "./actions/InternalCaseNoteModal";
import { RequestCallbackModal } from "./actions/RequestCallbackModal";
import { EscalateCaseModal } from "./actions/EscalateCaseModal";

type ActionKey = "draft" | "note" | "callback" | "escalate" | "export";

const actions: { key: ActionKey; label: string; icon: typeof FileEdit; variant: "primary" | "secondary" | "destructive" }[] = [
  { key: "draft", label: "Draft Client Update", icon: FileEdit, variant: "primary" },
  { key: "note", label: "Internal Case Note", icon: FileText, variant: "secondary" },
  { key: "callback", label: "Request Callback", icon: Phone, variant: "secondary" },
  { key: "escalate", label: "Escalate Case", icon: AlertOctagon, variant: "destructive" },
  { key: "export", label: "Export Summary", icon: Download, variant: "secondary" },
];

const variantStyles = {
  primary: "bg-primary text-primary-foreground hover:brightness-110",
  secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
  destructive: "bg-destructive/8 text-destructive border border-destructive/15 hover:bg-destructive/12",
};

export function ActionBar() {
  const [openModal, setOpenModal] = useState<ActionKey | null>(null);

  const handleClick = (key: ActionKey) => {
    if (key === "export") {
      toast.success("Summary exported", {
        description: "Case summary PDF has been generated and downloaded.",
      });
      return;
    }
    setOpenModal(key);
  };

  return (
    <>
      <div className="flex items-center gap-2 px-6 py-3.5 bg-card border-t border-border">
        {actions.map((action) => (
          <button
            key={action.key}
            onClick={() => handleClick(action.key)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${variantStyles[action.variant]}`}
          >
            <action.icon className="w-4 h-4" />
            {action.label}
          </button>
        ))}
      </div>

      <DraftClientUpdateModal open={openModal === "draft"} onOpenChange={(v) => !v && setOpenModal(null)} />
      <InternalCaseNoteModal open={openModal === "note"} onOpenChange={(v) => !v && setOpenModal(null)} />
      <RequestCallbackModal open={openModal === "callback"} onOpenChange={(v) => !v && setOpenModal(null)} />
      <EscalateCaseModal open={openModal === "escalate"} onOpenChange={(v) => !v && setOpenModal(null)} />
    </>
  );
}
