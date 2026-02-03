"use client";

import { useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { Tags } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";


interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  categories: [];
  courseList : [];
}

const validationSchema = Yup.object({
  category_id: Yup.string().required("Category is required"),
  course_id: Yup.string().required("Course is required"),
});

export default function PopularCoursesForm({
  open,
  onClose,
  onSave,
  categories,
  courseList 
}: Props) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      category_id: "",
      course_id: "",
      best_seller: false,
      trending: false,
    },
    validationSchema,
    onSubmit: (values) => {
      onSave({
        category_id: Number(values.category_id),
        course_id: Number(values.course_id),
        best_seller: values.best_seller? 1 : 0,
        trending: values.trending? 1:0,
      });
      onClose();
    },
  });

  useEffect(() => {
    if (open) formik.resetForm();
  }, [open]);

  // 🔥 Filter courses on category change
  const filteredCourses = useMemo(() => {
    if (!formik.values.category_id) return [];
    return courseList.filter(
      (c: any) => c.category_id === Number(formik.values.category_id)
    );
  }, [formik.values.category_id, courseList]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-700">
            <Tags className="h-5 w-5 text-blue-600" />
            Add Popular Course
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 mt-4"
        >
          {/* Category */}
          <div className="flex flex-col gap-1 w-full">
            <Label className="text-sm font-semibold text-gray-800">
              Category
            </Label>

            <Select
              value={formik.values.category_id}
              onValueChange={(v) => {
                formik.setFieldValue("category_id", v);
                formik.setFieldValue("courseId", "");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent className="w-full">
                {categories?.map((cat: any) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {formik.touched.category_id && formik.errors.category_id && (
              <span className="text-xs text-red-500">
                {formik.errors.category_id}
              </span>
            )}
          </div>

          {/* Course */}
          <div className="flex flex-col gap-1 w-full">
            <Label className="text-sm font-semibold text-gray-800">
              Course
            </Label>

            <Select
              value={formik.values.course_id}
              disabled={!formik.values.category_id}
              onValueChange={(v) => formik.setFieldValue("course_id", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>

              <SelectContent className="w-full">
                {filteredCourses.length ? (
                  filteredCourses.map((course: any) => (
                    <SelectItem
                      key={course.id}
                      value={String(course.id)}
                    >
                      {course.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="no-data">
                    No courses found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {formik.touched.course_id && formik.errors.course_id && (
              <span className="text-xs text-red-500">
                {formik.errors.course_id}
              </span>
            )}
          </div>

          {/* Flags */}
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formik.values.best_seller}
                onCheckedChange={(v) =>
                  formik.setFieldValue("best_seller", v)
                }
              />
              <Label className="text-sm font-semibold text-gray-800">
                Best Seller
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={formik.values.trending}
                onCheckedChange={(v) =>
                  formik.setFieldValue("trending", v)
                }
              />
              <Label className="text-sm font-semibold text-gray-800">
                Trending
              </Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formik.isValid}>
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
