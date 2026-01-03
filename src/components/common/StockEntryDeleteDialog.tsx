"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteStockEntryDialog({
  open,
  onClose,
  onConfirm,
  record,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  record: any;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-red-700">
            Delete Stock Entry?
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-red-700 mt-2">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {record?.productName}
          </span>
          ? This action cannot be undone.
        </p>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button className="bg-red-600 hover:bg-red-700" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
