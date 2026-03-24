import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RequestCallbackModal({ open, onOpenChange }: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("normal");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!date || !time) {
      toast.error("Please select a date and time");
      return;
    }
    toast.success("Callback scheduled", {
      description: `Callback requested for ${date} at ${time}.`,
    });
    setDate("");
    setTime("");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="text-[15px] font-semibold">Request Callback</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-muted-foreground">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-9 text-[13px]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-muted-foreground">Time</label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-9 text-[13px]"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-muted-foreground">Priority</label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="h-9 text-[13px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-muted-foreground">Notes for Call</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Topics to discuss, context for the call..."
              className="min-h-[80px] text-[13px] leading-relaxed resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-[13px]">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="text-[13px]">
            Schedule Callback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
