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
import { Tags } from "lucide-react";
import { Label } from "../ui/label";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  categories: any[];
}

export default function PopularCoursesForm({
  open,
  onClose,
  onSave,
  categories,
}: Props) {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<number | "">("");

  // Reset form every time dialog opens
  useEffect(() => {
    if (open) {
      setName("");
      setParentId("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (!name.trim() || !parentId) return;

    onSave({ name, parentId });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
            <Tags className="w-5 h-5 text-blue-600" />
            Add Popular Course
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">

          {/* Category Dropdown */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-semibold text-gray-800 mb-1">
              Select Category
            </Label>

            <select
              value={parentId}
              onChange={(e) => setParentId(Number(e.target.value))}
              className="bg-white border border-blue-600 text-blue-700 px-2 py-2 rounded-md text-sm 
              focus:ring-1 focus:ring-blue-600"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Course Name */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-semibold text-gray-800 mb-1">
              Popular Course Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter course name"
              className="border-blue-500 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
