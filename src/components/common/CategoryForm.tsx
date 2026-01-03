"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";
import { Label } from "../ui/label";

interface Props {
  open: boolean;
  mode: "add" | "edit";
  record: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function CategoryForm({
  open,
  mode,
  record,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (mode === "edit" && record) {
      setName(record?.name);
    } else {
      setName("");
    }
  }, [mode, record]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSave({ name , id : record?.id ||0 });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
            <Folder className="w-5 h-5 text-blue-600" />
            {mode === "add" ? "Add Category" : "Edit Category"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-semibold text-gray-800 mb-2">
              Category Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="border-blue-500 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-2">

            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-1 border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
            >
              {mode === "add" ? "Add" : "Update"}
            </Button>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
