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
import { Category, Blog } from "@/utils/type";
import { validateBlogForm } from "@/utils/validation";

interface BlogFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: Blog) => void;
  defaultValues?: Partial<Blog>;
  categoryList?: Category[];
}

export default function BlogForm({
  open,
  onClose,
  onSubmit,
  defaultValues,
  categoryList,
}: BlogFormProps) {
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    defaultValues?.image
      ? `/assets/images/blog/${defaultValues.image}`
      : "/assets/images/icons/empty.png"
  );

  const initialValues: Blog = {
    title: defaultValues?.title ?? "",
    slug: defaultValues?.slug ?? "",
    category_id: defaultValues?.category_id
      ? String(defaultValues.category_id)
      : "",
    shortdesc: defaultValues?.shortdesc ?? "",
    description: defaultValues?.description ?? "",
    image: defaultValues?.image ?? "",
    author: defaultValues?.author ?? "",
  };

  useEffect(() => {
    if (defaultValues?.image) {
      console.log("image", defaultValues.image)

      setPreviewUrl(`/assets/images/blog/${defaultValues.image}`);
    } else {
      setPreviewUrl("/assets/images/icons/empty.png");
    }
  }, [defaultValues]);


  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[40%] p-6 overflow-auto">
        <SheetHeader className="p-0">
          <SheetTitle className="flex items-center gap-2 text-blue-600">
            {defaultValues ? <Pencil /> : <Plus />}
            {defaultValues ? "Edit Blog" : "Add Blog"}
          </SheetTitle>
        </SheetHeader>

        <Formik
          initialValues={initialValues}
          validate={validateBlogForm}
          enableReinitialize
          onSubmit={(values) => {
            onSubmit?.(values);
            onClose();
          }}
        >
          {(formik) => {
            const hasImage =
              !!formik.values.image &&
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
                            formik.setFieldValue("image", "");
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
                        formik.setFieldValue("image", file);
                        setPreviewUrl(URL.createObjectURL(file));
                      }}
                    />
                  </div>
                </div>

                {/* TITLE & SLUG */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    fieldLabel="Title"
                    placeholder="Blog title"
                    value={formik.values.title}
                    error={formik.touched.title && formik.errors.title}
                    onChange={(e) => {
                      formik.setFieldValue("title", e.target.value);
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

                {/* CATEGORY & AUTHOR */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-800">
                      Category
                    </Label>
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
                    {formik.touched.category_id &&
                      formik.errors.category_id && (
                        <p className="text-sm text-red-500">
                          {formik.errors.category_id}
                        </p>
                      )}
                  </div>

                  <Input
                    fieldLabel="Author"
                    type="text"
                    value={formik.values.author}
                    error={formik.touched.author && formik.errors.author}
                    onChange={(e) =>
                      formik.setFieldValue("author", e.target.value)
                    }
                  />
                </div>

                {/* QUILL FIELDS */}
                {[
                  ["shortdesc", "Short Description"],
                  ["description", "description"],
                ].map(([key, label]) => (
                  <div key={key}>
                    <Label className="text-sm font-semibold text-gray-800">
                      {label}
                    </Label>
                    <ReactQuill
                      value={(formik.values as any)[key]}
                      onChange={(v) => {
                        formik.setFieldValue(key, v);
                        formik.setFieldTouched(key, true);
                      }}
                    />
                    {formik.touched[key as keyof Blog] &&
                      formik.errors[key as keyof Blog] && (
                        <p className="text-sm text-red-500">
                          {formik.errors[key as keyof Blog]}
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
