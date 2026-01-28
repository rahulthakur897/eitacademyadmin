"use client";

import { Formik, Form } from "formik";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, PlusCircle } from "lucide-react";
import { upcomingCourseForm } from "@/utils/validation";
import { UpcomingCourse } from "@/utils/type";
import { useEffect, useMemo } from "react";
import { fetchCategory } from "@/app/redux/actions/category";
import { fetchCourses } from "@/app/redux/actions/course";
import { useSelector, useDispatch } from "react-redux";

interface Props {
  open: boolean;
  mode: "add" | "edit";
  record: any;
  onClose: () => void;
  onSave: (data: UpcomingCourse) => void;
  instructors: any[];
}

export default function UpcomingCourseForm({
  open,
  mode,
  record,
  onClose,
  onSave,
  instructors,
}: Props) {
  const dispatch = useDispatch();

  const { categoryData } = useSelector((state: any) => state.category);
  const { courseList } = useSelector((state: any) => state.course);

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchCourses());
  }, [dispatch]);

  const initialValues: UpcomingCourse = {
    name: record?.name ?? "",
    category_id: record?.category_id ?? "",
    faculty_id: record?.faculty_id ?? "",
    level: record?.level ?? "",
    batch_start: record?.batch_start ?? "",
    demo_date: record?.demo_date ?? "",
    demo_duration: record?.demo_duration ?? "",
    classes: record?.classes ?? "",
    id: record?.id ?? 0,
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[40%] p-6 overflow-auto">
        <SheetHeader className="p-0">
          <SheetTitle className="flex items-center gap-2 text-blue-600">
            {mode === "edit" ? <Pencil /> : <PlusCircle />}
            {mode === "edit" ? "Edit Upcoming Course" : "Add Upcoming Course"}
          </SheetTitle>
        </SheetHeader>

        <Formik
          initialValues={initialValues}
          validate={upcomingCourseForm}
          enableReinitialize
          onSubmit={(values) => {
            onSave(values);
            onClose();
          }}
        >
          {(formik) => {
            const filteredCourses = useMemo(() => {
              return courseList.filter(
                (c: any) =>
                  String(c.category_id) ===
                  String(formik.values.category_id)
              );
            }, [formik.values.category_id, courseList]);

            return (
              <Form className="space-y-5 mt-6">
                {/* CATEGORY */}
                <div className="space-y-1">
                  <Label className=" text-sm font-semibold text-gray-800">Category</Label>
                  <Select
                    value={String(formik.values.category_id)}
                    onValueChange={(value) => {
                      formik.setFieldValue("category_id", value);
                      formik.setFieldValue("name", "");
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryData.map((cat: any) => (
                        <SelectItem
                          key={cat.id}
                          value={String(cat.id)}
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {formik.touched.category_id &&
                    typeof formik.errors.category_id === "string" && (
                      <p className="text-sm text-red-500">
                        {formik.errors.category_id}
                      </p>
                    )}
                </div>

                {/* COURSE NAME (DEPENDENT) */}
                <div className="space-y-1">
                  <Label className=" text-sm font-semibold text-gray-800">Course Name</Label>
                  <Select
                    value={formik.values.name}
                    onValueChange={(value) =>
                      formik.setFieldValue("name", value)
                    }
                    disabled={!formik.values.category_id}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          formik.values.category_id
                            ? "Select Course"
                            : "Select Category First"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCourses.map((course: any) => (
                        <SelectItem
                          key={course.id}
                          value={course.name}
                        >
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {formik.touched.name &&
                    typeof formik.errors.name === "string" && (
                      <p className="text-sm text-red-500">
                        {formik.errors.name}
                      </p>
                    )}
                </div>

                {/* INSTRUCTOR */}
                <div className="space-y-1">
                  <Label className=" text-sm font-semibold text-gray-800">Instructor</Label>
                  <Select
                    value={String(formik.values.faculty_id)}
                    onValueChange={(value) =>
                      formik.setFieldValue("faculty_id", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      {instructors.map((ins) => (
                        <SelectItem
                          key={ins.id}
                          value={String(ins.id)}
                        >
                          {ins.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* LEVEL */}
                <div className="space-y-1">
                  <Label className=" text-sm font-semibold text-gray-800">Level</Label>
                  <Select
                    value={formik.values.level}
                    onValueChange={(value) =>
                      formik.setFieldValue("level", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* DATES */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="date"
                    fieldLabel="Start Date"
                    value={formik.values.batch_start}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "batch_start",
                        e.target.value
                      )
                    }
                  />

                  <Input
                    type="date"
                    fieldLabel="Demo Date"
                    value={formik.values.demo_date}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "demo_date",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* DURATION + CLASSES */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    fieldLabel="Duration"
                    value={formik.values.demo_duration}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "demo_duration",
                        e.target.value
                      )
                    }
                  />

                  <Input
                    fieldLabel="Classes On"
                    value={formik.values.classes}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "classes",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {mode === "add" ? "Add Course" : "Update Course"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </SheetContent>
    </Sheet>
  );
}
