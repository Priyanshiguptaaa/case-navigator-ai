import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertOctagon } from "lucide-react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EscalateCaseModal({ open, onOpenChange }: Props) {
  const [reason, setReason] = useState("client-risk");
  const [details, setDetails] = useState("");

  const handleEscalate = () => {
    if (!details.trim()) {
      toast.error("Please provide escalation details");
      return;
    }
    toast.success("Case escalated", {
      description: "The case has been flagged for senior review.",
    });
    setDetails("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-[15px] font-semibold flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-destructive" />
            Escalate Case
          </DialogTitle>
          <DialogDescription className="text-[12px] text-muted-foreground">
            This will flag the case for senior review and notify the escalation team.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-muted-foreground">Escalation Reason</label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="h-9 text-[13px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client-risk">Client Retention Risk</SelectItem>
                <SelectItem value="compliance">Compliance Concern</SelectItem>
                <SelectItem value="sla-breach">SLA Breach</SelectItem>
                <SelectItem value="repeated-nigo">Repeated NIGO</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-muted-foreground">Details</label>
            <Textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe why this case needs escalation..."
              className="min-h-[120px] text-[13px] leading-relaxed resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-[13px]">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleEscalate} className="text-[13px]">
            Escalate Case
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
