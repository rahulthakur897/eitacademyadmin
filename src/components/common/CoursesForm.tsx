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

interface CoursesProps {
    open: boolean;
    onClose: () => void;
    onSubmit?: (data: any) => void;
    defaultValues?: any; // Used for editing
    categoryList?: any;
}

export default function Courses({
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
        couse_faq: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        console.log("e--", e.target.name)
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        // clear error on change
        setErrors({ ...errors, [name]: "" });
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
        if (formData?.course_logo) {
            const url = URL.createObjectURL(formData?.course_logo);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else if (defaultValues?.course_logo) {
            setPreviewUrl(defaultValues.course_logo);
        } else {
            setPreviewUrl("/assets/images/curriculum.png");
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
                couse_faq: ''
            })
        }
    }, [defaultValues, open]);

    // Submit
    const handleSave = () => {
        const newEmployee = {

        };

        onSubmit?.(newEmployee);
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
                            onChange={handleChange}
                            placeholder="Enter course name"
                        />
                    </div>
                    <div className="row flex gap-4">
                        <div className="space-y-1 w-full">
                            <Label className=" text-sm font-semibold text-gray-800">Category</Label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
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
                                value={formData.price}
                                  min="0"
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                                placeholder="beginner, intermediate"
                            />

                        </div>
                        <div className="space-y-1 w-full">
                            <Label className="text-sm font-semibold text-gray-800">Provide Certificatee</Label>

                            <select
                                name="provide_certificate"
                                value={formData.provide_certificate}
                                onChange={handleChange}
                                className="p-3 w-full text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#E8774D] bg-white"
                            >
                                <option value={"0"} selected disabled> Select</option>
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
                                onChange={handleChange}
                                placeholder="English, Hindi .."
                            />

                        </div>
                        <div className="space-y-1 w-full">
                            <Label className="text-sm font-semibold text-gray-800">Instructor Support</Label>

                            <select
                                name="instructor_support"
                                value={formData.instructor_support}
                                onChange={handleChange}
                                className="p-3 w-full text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#E8774D] bg-white"
                            >
                                <option value={""} key={0} selected disabled> Select</option>
                                <option value={"Yes"} key={1}>Yes</option>
                                <option value={"No"} key={2}>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Short description</Label>
                        <ReactQuill theme="snow" value={formData?.shortdesc} name="shortdesc" onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Overview</Label>
                        <ReactQuill theme="snow" value={formData?.overview} name="overview" onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Course Advantage</Label>
                        <ReactQuill theme="snow" value={formData?.course_advantage} name="course_advantage" onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Couse Faq</Label>
                        <ReactQuill theme="snow" value={formData?.couse_faq} name="couse_faq" onChange={handleChange} />
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

                            {image || previewUrl !== "/assets/images/icons/empty.png" ? (
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
