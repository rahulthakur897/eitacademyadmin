"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Pencil, PlusCircle } from "lucide-react";

interface CourseOption {
  id: number;
  title: string;
  categoryId: number;
  categoryName: string;
  instructor: string;
  level: string;
}

interface Props {
  open: boolean;
  mode: "add" | "edit";
  record: any;
  onClose: () => void;
  onSave: (data: any) => void;

  courseList: CourseOption[];
  categories: { id: number; name: string }[];
  instructors: string[];
}

export default function UpcomingCourseForm({
  open,
  mode,
  record,
  onClose,
  onSave,
  courseList,
  categories,
  instructors,
}: Props) {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [instructor, setInstructor] = useState("");
  const [level, setLevel] = useState("");

  const [startDate, setStartDate] = useState("");
  const [demoDate, setDemoDate] = useState("");
  const [duration, setDuration] = useState("");

  // Reset or Load Data when editing
  useEffect(() => {
    if (mode === "edit" && record) {
      setTitle(record.title);
      setCategoryId(record.categoryId);
      setInstructor(record.instructor);
      setLevel(record.level);
      setStartDate(record.startDate);
      setDemoDate(record.demoDate);
      setDuration(record.duration);
    } else {
      setTitle("");
      setCategoryId("");
      setInstructor("");
      setLevel("");
      setStartDate("");
      setDemoDate("");
      setDuration("");
    }
  }, [mode, record]);

  const handleSubmit = () => {
    if (!title || !categoryId || !instructor) return;

    onSave({
      title,
      categoryId,
      categoryName: categories.find((c) => c.id === categoryId)?.name || "",
      instructor,
      level,
      startDate,
      demoDate,
      duration,
    });

    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[40%] p-6">

        {/* HEADER */}
        <SheetHeader className="p-0">
          <SheetTitle className="text-blue-600 font-semibold flex items-center gap-2">
            {mode === "edit" ? (
              <Pencil className="h-5 w-5 text-blue-600" />
            ) : (
              <PlusCircle className="h-5 w-5 text-blue-600" />
            )}
            {mode === "edit" ? "Edit Upcoming Course" : "Add Upcoming Course"}
          </SheetTitle>
        </SheetHeader>

        {/* FORM */}
        <div className="mt-6 space-y-4">

          {/* COURSE TITLE */}
          <div>
            <Label className="font-bold text-gray-700">Course Title</Label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full border border-blue-500 rounded-md px-3 py-2 focus:ring-blue-600"
            >
              <option value="">Select Course</option>
              {courseList.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* INSTRUCTOR */}
          <div>
            <Label className="font-bold text-gray-700">Instructor</Label>
            <select
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="mt-1 w-full border border-blue-500 rounded-md px-3 py-2 focus:ring-blue-600"
            >
              <option value="">Select Instructor</option>
              {instructors.map((ins, i) => (
                <option key={i} value={ins}>
                  {ins}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
          {/* CATEGORY */}
          <div>
            <Label className="font-bold text-gray-700">Category</Label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="mt-1 w-full border border-blue-500 rounded-md px-3 py-2 focus:ring-blue-600"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {/* LEVEL */}
          <div>
            <Label className="font-bold text-gray-700">Level</Label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="mt-1 w-full border border-blue-500 rounded-md px-3 py-2 focus:ring-blue-600"
            >
              <option value="">Select Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          </div>

          {/* DATE ROW — TWO COLUMNS */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <Label className="font-bold text-gray-700">Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-blue-500"
              />
            </div>

            <div>
              <Label className="font-bold text-gray-700">Demo Date</Label>
              <Input
                type="date"
                value={demoDate}
                onChange={(e) => setDemoDate(e.target.value)}
                className="border-blue-500"
              />
            </div>

          </div>

          {/* DURATION */}
          <div>
            <Label className="font-bold text-gray-700">Duration</Label>
            <Input
              placeholder="e.g. 6 Weeks"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border-blue-500"
            />
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <SheetFooter className="flex flex-row justify-end">
          <Button variant="outline" className="mr-2" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {mode === "add" ? "Add Course" : "Update Course"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
