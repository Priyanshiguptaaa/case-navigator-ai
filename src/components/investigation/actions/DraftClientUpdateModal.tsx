import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DraftClientUpdateModal({ open, onOpenChange }: Props) {
  const [channel, setChannel] = useState("email");
  const [content, setContent] = useState(
    "Dear Client,\n\nWe wanted to provide you with an update on your case. Our team has been reviewing your submitted documentation and we are working to resolve the outstanding items.\n\nPlease don't hesitate to reach out if you have any questions.\n\nBest regards,\nClient Services Team"
  );

  const handleSend = () => {
    toast.success("Client update drafted successfully", {
      description: `Draft saved via ${channel}. Ready for review before sending.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="text-[15px] font-semibold">Draft Client Update</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-muted-foreground">Channel</label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger className="h-9 text-[13px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="portal">Client Portal Message</SelectItem>
                <SelectItem value="letter">Formal Letter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-muted-foreground">Message</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[180px] text-[13px] leading-relaxed resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-[13px]">
            Cancel
          </Button>
          <Button onClick={handleSend} className="text-[13px]">
            Save Draft
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
