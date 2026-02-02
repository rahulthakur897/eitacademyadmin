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
import { fetchCategory } from "@/app/redux/actions/category";
import { fetchCourses } from "@/app/redux/actions/course";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const validationSchema = Yup.object({
  categoryId: Yup.string().required("Category is required"),
  courseId: Yup.string().required("Course is required"),
});

export default function PopularCoursesForm({
  open,
  onClose,
  onSave,
}: Props) {
  const dispatch = useDispatch();

  const { categoryData } = useSelector((state: any) => state.category);
  const { courseList } = useSelector((state: any) => state.course);

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchCourses());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      categoryId: "",
      courseId: "",
      isBestSeller: false,
      isTrending: false,
    },
    validationSchema,
    onSubmit: (values) => {
      onSave({
        categoryId: Number(values.categoryId),
        courseId: Number(values.courseId),
        isBestSeller: values.isBestSeller,
        isTrending: values.isTrending,
      });
      onClose();
    },
  });

  useEffect(() => {
    if (open) formik.resetForm();
  }, [open]);

  // 🔥 Filter courses on category change
  const filteredCourses = useMemo(() => {
    if (!formik.values.categoryId) return [];
    return courseList.filter(
      (c: any) => c.categoryId === Number(formik.values.categoryId)
    );
  }, [formik.values.categoryId, courseList]);

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
              value={formik.values.categoryId}
              onValueChange={(v) => {
                formik.setFieldValue("categoryId", v);
                formik.setFieldValue("courseId", "");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent className="w-full">
                {categoryData?.map((cat: any) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {formik.touched.categoryId && formik.errors.categoryId && (
              <span className="text-xs text-red-500">
                {formik.errors.categoryId}
              </span>
            )}
          </div>

          {/* Course */}
          <div className="flex flex-col gap-1 w-full">
            <Label className="text-sm font-semibold text-gray-800">
              Course
            </Label>

            <Select
              value={formik.values.courseId}
              disabled={!formik.values.categoryId}
              onValueChange={(v) => formik.setFieldValue("courseId", v)}
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

            {formik.touched.courseId && formik.errors.courseId && (
              <span className="text-xs text-red-500">
                {formik.errors.courseId}
              </span>
            )}
          </div>

          {/* Flags */}
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formik.values.isBestSeller}
                onCheckedChange={(v) =>
                  formik.setFieldValue("isBestSeller", v)
                }
              />
              <Label className="text-sm font-semibold text-gray-800">
                Best Seller
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={formik.values.isTrending}
                onCheckedChange={(v) =>
                  formik.setFieldValue("isTrending", v)
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
