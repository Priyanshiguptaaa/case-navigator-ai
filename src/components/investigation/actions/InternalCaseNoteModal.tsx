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

export function InternalCaseNoteModal({ open, onOpenChange }: Props) {
  const [category, setCategory] = useState("general");
  const [note, setNote] = useState("");

  const handleSave = () => {
    if (!note.trim()) {
      toast.error("Please enter a note");
      return;
    }
    toast.success("Internal note added", {
      description: "Note has been logged to the case file.",
    });
    setNote("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-[15px] font-semibold">Add Internal Case Note</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-muted-foreground">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-9 text-[13px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Note</SelectItem>
                <SelectItem value="client-interaction">Client Interaction</SelectItem>
                <SelectItem value="document-review">Document Review</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="handoff">Team Handoff</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-muted-foreground">Note</label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter your internal case note..."
              className="min-h-[140px] text-[13px] leading-relaxed resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-[13px]">
            Cancel
          </Button>
          <Button onClick={handleSave} className="text-[13px]">
            Save Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
