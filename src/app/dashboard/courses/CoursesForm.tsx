"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { Formik, Form } from "formik";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { SUPPORTED_IMG_TYPES } from "@/utils/constant";
import { generateSlug } from "@/utils/common";
import { Category, CourseFormData } from "@/utils/type";
import { validateCourseForm } from "@/utils/validation";

interface CoursesProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: CourseFormData) => void;
  defaultValues?: Partial<CourseFormData>;
  categoryList?: Category[];
}

export default function CoursesForm({
  open,
  onClose,
  onSubmit,
  defaultValues,
  categoryList,
}: CoursesProps) {
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    defaultValues?.course_logo
      ? `/assets/images/course/${defaultValues.course_logo}`
      : "/assets/images/icons/empty.png"
  );

  const initialValues: CourseFormData = {
    name: defaultValues?.name ?? "",
    slug: defaultValues?.slug ?? "",
    category_id: defaultValues?.category_id
      ? String(defaultValues.category_id) : "",
    shortdesc: defaultValues?.shortdesc ?? "",
    overview: defaultValues?.overview ?? "",
    course_logo: defaultValues?.course_logo ?? "",
    price: defaultValues?.price ?? 0,
    duration: defaultValues?.duration ?? "",
    module_count: defaultValues?.module_count ?? 0,
    course_level: defaultValues?.course_level ?? "",
    provide_certificate: defaultValues?.provide_certificate ?? "Yes",
    course_language: defaultValues?.course_language ?? "",
    instructor_support: defaultValues?.instructor_support ?? "Yes",
    course_advantage: defaultValues?.course_advantage ?? "",
    couse_faq: defaultValues?.couse_faq ?? "",
  };

  useEffect(() => {
    if (defaultValues?.course_logo) {
      setPreviewUrl(`/assets/images/course/${defaultValues.course_logo}`);
    }
  }, [defaultValues]);


  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[40%] p-6 overflow-auto">
        <SheetHeader className="p-0">
          <SheetTitle className="flex items-center gap-2 text-blue-600">
            {defaultValues ? <Pencil /> : <Plus />}
            {defaultValues ? "Edit Course" : "Add Course"}
          </SheetTitle>
        </SheetHeader>

        <Formik
          initialValues={initialValues}
          validate={validateCourseForm}
          enableReinitialize
          onSubmit={(values) => {
            console.log("SUBMIT VALUES:", values);
            onSubmit?.(values);
            onClose();
          }}
        >
          {(formik) => {
            const hasImage =
              !!formik.values.course_logo ||
              previewUrl !== "/assets/images/icons/empty.png";

            return (
              <Form className="space-y-6 mt-6">
                {/* IMAGE */}
                <div className="flex items-start gap-4">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={70}
                    height={70}
                    className="rounded-md border object-cover"
                  />

                  <div>
                    <p className="text-sm font-medium">Upload Image</p>
                    <p className="text-xs text-gray-500 mb-2">
                      PNG or JPEG (Min 1080×600px)
                    </p>

                    {hasImage ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="px-3 py-1 border border-red-500 text-red-500 rounded-md text-sm"
                          onClick={() => {
                            formik.setFieldValue("course_logo", "");
                            setPreviewUrl("/assets/images/icons/empty.png");
                          }}
                        >
                          Remove
                        </button>

                        <button
                          type="button"
                          className="px-3 py-1 border rounded-md text-sm"
                          onClick={() =>
                            document.getElementById("image-upload")?.click()
                          }
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="px-3 py-1 border rounded-md text-sm"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                      >
                        Upload
                      </button>
                    )}

                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file || !SUPPORTED_IMG_TYPES.includes(file.type)) {
                          alert("Only PNG or JPEG allowed");
                          return;
                        }
                        formik.setFieldValue("course_logo", file);
                        setPreviewUrl(URL.createObjectURL(file));
                      }}
                    />
                  </div>
                </div>

                {/* NAME & SLUG */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    fieldLabel="Course Name"
                    placeholder="Course Name"
                    value={formik.values.name}
                    error={formik.touched.name && formik.errors.name}
                    onChange={(e) => {
                      formik.setFieldValue("name", e.target.value);
                      if (!isSlugEdited) {
                        formik.setFieldValue(
                          "slug",
                          generateSlug(e.target.value)
                        );
                      }
                    }}
                  />

                  <Input
                    fieldLabel="Slug"
                    placeholder="slug"
                    value={formik.values.slug}
                    error={formik.touched.slug && formik.errors.slug}
                    onChange={(e) => {
                      setIsSlugEdited(true);
                      formik.setFieldValue("slug", e.target.value);
                    }}
                  />
                </div>

                {/* CATEGORY & PRICE */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className=" text-sm font-semibold text-gray-800">Category</Label>
                    <Select
                      value={formik.values.category_id}
                      onValueChange={(v) =>
                        formik.setFieldValue("category_id", v)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryList?.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Input
                    fieldLabel="Price"
                    type="number"
                    value={formik.values.price}
                    onChange={(e) =>
                      formik.setFieldValue("price", Number(e.target.value))
                    }
                  />
                </div>

                {/* LANGUAGE & LEVEL */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    fieldLabel="Course Language"
                    placeholder="English"
                    value={formik.values.course_language}
                    onChange={(e) =>
                      formik.setFieldValue("course_language", e.target.value)
                    }
                  />

                  <Input
                    fieldLabel="Course Level"
                    placeholder="Beginner, Intermediate"
                    value={formik.values.course_level}
                    onChange={(e) =>
                      formik.setFieldValue("course_level", e.target.value)
                    }
                  />
                </div>
                {/* LANGUAGE & LEVEL */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Duration"
                    fieldLabel="Duration"
                    value={formik.values.duration}
                    onChange={(e) =>
                      formik.setFieldValue("duration", e.target.value)
                    }
                  />

                  <Input
                    type="number"
                    fieldLabel="Module Count"
                    value={formik.values.module_count}
                    onChange={(e) => {
                      const value = e.target.value;
                      formik.setFieldValue(
                        "module_count",
                        value === "" ? 0 : Number(value)
                      );
                    }}
                  />

                </div>

                {/* QUILL FIELDS */}
                {[
                  ["shortdesc", "Short Description"],
                  ["overview", "Overview"],
                  ["course_advantage", "Course Advantage"],
                  ["couse_faq", "Course FAQ"],
                ].map(([key, label]) => (
                  <div key={key}>
                    <Label className=" text-sm font-semibold text-gray-800">{label}</Label>
                    <ReactQuill
                      value={(formik.values as any)[key]}
                      onChange={(v) =>
                        formik.setFieldValue(key, v)
                      }
                    />
                    {formik.touched[key as keyof CourseFormData] &&
                      formik.errors[key as keyof CourseFormData] && (
                        <p className="text-sm text-red-500">
                          {formik.errors[key as keyof CourseFormData]}
                        </p>
                      )}
                  </div>
                ))}

                {/* ACTIONS */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 text-white">
                    {defaultValues ? "Update" : "Save"}
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
