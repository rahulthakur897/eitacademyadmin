"use client";

import { useEffect, useState } from "react";
import { UserPlus, Calendar as CalendarIcon, Pencil, Book } from "lucide-react";
import Image from "next/image";
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { SUPPORTED_IMG_TYPES } from "@/utils/constant";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { generateSlug } from '@/utils/common';
interface CoursesProps {
    open: boolean;
    onClose: () => void;
    onSubmit?: (data: any) => void;
    defaultValues?: any; // Used for editing
    categoryList?: any;
}

export default function CoursesForm({
    open,
    onClose,
    onSubmit,
    defaultValues,
    categoryList
}: CoursesProps) {

    const [formData, setFormData] = useState({
        name: '',
        category_id: '',
        shortdesc: '',
        overview: '',
        course_logo: '',
        price: 0,
        duration: '',
        module_count: 0,
        course_level: '',
        provide_certificate: '',
        course_language: '',
        instructor_support: '',
        course_advantage: '',
        couse_faq: '',
        slug: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isSlugEdited, setIsSlugEdited] = useState(false);

    const handleChange = (name: string, value: any) => {
        // const { name, value } = e.target;
        setFormData((prev: any) => {
            let updated = { ...prev, [name]: value };

            if (name === "name" && !isSlugEdited && value.trim()) {
                updated.slug = generateSlug(value);
            }

            return updated;
        });

        setErrors({ ...errors, [name]: "" });
    };
    // Handle slug change - mark as edited manually
    const handleSlugChange = (value: any) => {
        setFormData({ ...formData, ['slug']: value });
        setIsSlugEdited(true);
    };

    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(
        defaultValues?.course_logo || "/assets/images/icons/empty.png"
    );

    // Image Upload Handler
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !SUPPORTED_IMG_TYPES.includes(file.type)) {
            alert("Only PNG or JPEG allowed.");
            return;
        }
        // Local preview
        formData['course_logo'] = file;
        setPreviewUrl(URL.createObjectURL(file));
    };

    // Image preview logic
    useEffect(() => {
        if (formData?.course_logo && defaultValues?.course_logo==="") {
            const url = URL.createObjectURL(`/assets/images/course/${formData?.course_logo}`);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else if (defaultValues?.course_logo) {
            setPreviewUrl(`/assets/images/course/${defaultValues.course_logo}`);
        } else {
            setPreviewUrl("/assets/images/icons/Empty.png");
        }
    }, [formData, defaultValues]);

    // Reset or Load Values
    useEffect(() => {
        if (defaultValues) {
            const tempObj = {
                name: defaultValues?.name,
                category_id: defaultValues?.category_id,
                shortdesc: defaultValues?.shortdesc,
                overview: defaultValues?.overview,
                course_logo: defaultValues?.course_logo,
                price: defaultValues?.price,
                duration: defaultValues?.duration,
                module_count: defaultValues?.module_count,
                course_level: defaultValues?.course_level,
                provide_certificate: defaultValues?.provide_certificate,
                course_language: defaultValues?.course_language,
                instructor_support: defaultValues?.instructor_support,
                course_advantage: defaultValues?.course_advantage,
                couse_faq: defaultValues?.couse_faq,
                id: defaultValues?.id,  
                slug: defaultValues?.slug
            }
            setFormData(tempObj)
        } else {
            setFormData({
                name: '',
                category_id: '',
                shortdesc: '',
                overview: '',
                course_logo: '',
                price: 0,
                duration: '',
                module_count: 0,
                course_level: '',
                provide_certificate: '',
                course_language: '',
                instructor_support: '',
                course_advantage: '',
                couse_faq: '',
                slug: ""
            })
        }
    }, [defaultValues, open]);

    // Submit
    const handleSave = () => {


        onSubmit?.(formData);
        onClose();
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right" className="w-[40%]  p-6 space-y-6 overflow-auto">
                <SheetHeader className="p-0">
                    <SheetTitle className="text-red-600 font-semibold flex items-center gap-2">
                        {defaultValues ? (
                            <Pencil className="h-5 w-5 text-red-600" />
                        ) : (
                            <Book className="h-5 w-5 text-red-600" />
                        )}
                        {defaultValues ? "Edit" : "Add"}
                    </SheetTitle>
                </SheetHeader>

                <div className="space-y-5 ">
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Course Name</Label>
                        <Input
                            name="name"
                            type="text"
                            value={formData?.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter course name"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Slug</Label>
                        <Input
                            name="slug"
                            type="text"
                            value={formData?.slug}

                            onChange={handleSlugChange}
                            placeholder="Enter slug"
                        />
                    </div>
                    <div className="row flex gap-4">
                        <div className="space-y-1 w-full">
                            <Label className=" text-sm font-semibold text-gray-800">Category</Label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={(e) => handleChange("category_id", e.target.value)}

                                className="p-3 w-full text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#E8774D] bg-white"
                            >
                                {categoryList?.map((list: any) =>
                                    <option key={list.id} value={list.id}> {list?.name}</option>
                                )

                                }

                            </select>

                        </div>
                        <div className="space-y-1 w-full">
                            <Label className="text-sm font-semibold text-gray-800">Price</Label>
                            <Input
                                name="price"
                                type="number"
                                onChange={(e) => handleChange("price", e.target.value)}
                                value={formData.price}
                                min="0"

                                placeholder="example@mysrl.com"
                            />
                        </div>
                    </div>
                    <div className="row flex gap-4">
                        <div className="space-y-1 w-full">
                            <Label className=" text-sm font-semibold text-gray-800">Duration</Label>
                            <Input
                                name="duration"
                                type="text"
                                value={formData.duration}

                                onChange={(e) => handleChange("duration", e.target.value)}
                                placeholder="2.5 hours etc"
                            />

                        </div>
                        <div className="space-y-1 w-full">
                            <Label className="text-sm font-semibold text-gray-800">Total Module</Label>
                            <Input
                                name="module_count"
                                type="number"
                                min="1"
                                value={formData.module_count}

                                onChange={(e) => handleChange("module_count", e.target.value)}
                                placeholder="2 or 5 etc"
                            />
                        </div>
                    </div>
                    <div className="row flex gap-4">
                        <div className="space-y-1 w-full">
                            <Label className=" text-sm font-semibold text-gray-800">Course Level</Label>
                            <Input
                                name="course_level"
                                type="text"
                                value={formData.course_level}
                                onChange={(e) => handleChange("course_level", e.target.value)}
                                placeholder="beginner, intermediate"
                            />

                        </div>
                        <div className="space-y-1 w-full">
                            <Label className="text-sm font-semibold text-gray-800">Provide Certificatee</Label>

                            <select
                                name="provide_certificate"
                                value={formData.provide_certificate}
                                onChange={(e) => handleChange("provide_certificate", e.target.value)}
                                className="p-3 w-full text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#E8774D] bg-white"
                            >
                                <option value={"0"}> Select</option>
                                <option value={"Yes"} key={1}>Yes</option>
                                <option value={"No"} key={2}>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="row flex gap-4">
                        <div className="space-y-1 w-full">
                            <Label className=" text-sm font-semibold text-gray-800">Course Language</Label>
                            <Input
                                name="course_language"
                                type="text"
                                value={formData.course_language}
                                onChange={(e) => handleChange("course_language", e.target.value)}
                                placeholder="English, Hindi .."
                            />

                        </div>
                        <div className="space-y-1 w-full">
                            <Label className="text-sm font-semibold text-gray-800">Instructor Support</Label>

                            <select
                                name="instructor_support"
                                value={formData.instructor_support}
                                onChange={(e) => handleChange("instructor_support", e.target.value)}
                                className="p-3 w-full text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#E8774D] bg-white"
                            >
                                <option value={""} key={0}> Select</option>
                                <option value={"Yes"} key={1}>Yes</option>
                                <option value={"No"} key={2}>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Short description</Label>
                        <ReactQuill theme="snow" value={formData?.shortdesc} onChange={(value) => handleChange("shortdesc", value)} />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Overview</Label>
                        <ReactQuill theme="snow" value={formData?.overview} onChange={(value) => handleChange("overview", value)} />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Course Advantage</Label>
                        <ReactQuill theme="snow" value={formData?.course_advantage} onChange={(value) => handleChange("course_advantage", value)} />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Couse Faq</Label>
                        <ReactQuill theme="snow" value={formData?.couse_faq} onChange={(value) => handleChange("couse_faq", value)} />
                    </div>
                    {/* IMAGE UPLOAD */}
                    <div className="flex items-start gap-4 mb-5">
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

                            {image || previewUrl !== "/assets/images/icons/Empty.png" ? (
                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1 border border-red-500 text-red-500 rounded-md text-sm"
                                        onClick={() => {
                                            setImage(null);
                                            setPreviewUrl("/assets/images/icons/empty.png");
                                        }}
                                    >
                                        Remove
                                    </button>

                                    <button
                                        className="px-3 py-1 border text-gray-700 rounded-md text-sm"
                                        onClick={() => document.getElementById("image-upload").click()}
                                    >
                                        Change
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="px-3 py-1 border text-gray-700 rounded-md text-sm"
                                    onClick={() => document.getElementById("image-upload").click()}
                                >
                                    Upload
                                </button>
                            )}

                            <input
                                type="file"
                                id="image-upload"
                                accept="image/png,image/jpg,image/jpeg,image/webp"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button className="bg-red-600 text-white hover:bg-red-700" onClick={handleSave}>
                        {defaultValues ? "Update" : "Save"}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
