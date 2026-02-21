"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import DataTable from "@/components/common/table";
import DeleteCourse from "@/components/common/DeleteCourse";
import CoursesForm from "./CoursesForm";

import { fetchCategory } from "@/redux/actions/category";
import {
  fetchCourses,
  addCourse,
  deleteCourse,
  updateCourse,
} from "@/redux/actions/course";

export default function CoursesPage() {
  const dispatch = useDispatch();
  const [openSheet, setOpenSheet] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchCourses());
  }, [dispatch]);

  const { categoryData } = useSelector((state: any) => state.category);
  const { courseList } = useSelector((state: any) => state.course);

  const combinedList = useMemo(() => {
    return (courseList || []).map((course: any) => {
      const category = categoryData?.find(
        (cat: any) => cat.id === Number(course.category_id)
      );
      return {
        ...course,
        category_name: category?.name || "Unknown",
      };
    });
  }, [courseList, categoryData]);

  const filteredRecords = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return combinedList.filter((item: any) =>
      item.name.toLowerCase().includes(q)
    );
  }, [combinedList, searchQuery]);

  const handleAdd = () => {
    setMode("add");
    setSelectedRecord(null);
    setOpenSheet(true);
  };

  const handleEdit = (record: any) => {
    setMode("edit");
    setSelectedRecord(record);
    setOpenSheet(true);
  };

  const handleDelete = (record: any) => {
    setSelectedRecord(record);
    setOpenDeleteDialog(true);
  };

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("course_logo", file);

    const res = await fetch("/api/upload-course-image", {
      method: "POST",
      body: fd,
    });

    return res.json();
  };

  const handleSave = async (data: any) => {
    try {
      let imageName = data.course_logo || "";

      if (data.course_logo instanceof File) {
        const uploadRes = await uploadImage(data.course_logo);
        if (uploadRes?.status) {
          imageName = uploadRes.filename;
        }
      }

      const payload = {
        name: data.name,
        category_id: data.category_id,
        shortdesc: data.shortdesc,
        overview: data.overview,
        price: data.price,
        duration: data.duration,
        module_count: data.module_count,
        course_level: data.course_level,
        provide_certificate: data.provide_certificate,
        course_language: data.course_language,
        instructor_support: data.instructor_support,
        course_advantage: data.course_advantage,
        couse_faq: data.couse_faq,
        slug: data.slug,
        course_logo: imageName,
      };

      if (mode === "add") {
        dispatch(addCourse(payload));
        toast.success("Course added successfully");
      } else {
        dispatch(updateCourse({ id: data.id, ...payload }));
        toast.success("Course updated successfully");
      }

      setOpenSheet(false);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCourse(selectedRecord.id));
    toast.success("Course deleted successfully");
    setOpenDeleteDialog(false);
  };

  return (
    <main className="p-4">
      {/* HEADER */}
      <div className="flex justify-end items-center mb-4 px-4">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border border-blue-600 text-blue-700
              px-3 py-2 rounded-md w-52 text-sm
              focus:outline-none focus:ring-1 focus:ring-blue-600"
          />

          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white font-semibold
              px-4 py-3 rounded-md text-xs hover:bg-blue-700 transition"
          >
            + Add Course
          </button>
        </div>
      </div>
      <DataTable
        columns={[
          { colname: "idx", value: "S No." },
          { colname: "name", value: "Name" },
          { colname: "category_name", value: "Category" },
          { colname: "shortdesc", value: "Short Description" },
          { colname: "price", value: "Price" },
          { colname: "duration", value: "Duration" },
          { colname: "module_count", value: "Total Modules" },
          { colname: "action", value: "Action" },
        ]}
        rows={filteredRecords}
        editModal={handleEdit}
        delRecord={handleDelete}
        pageName="course"
      />

      {/* ADD / EDIT */}
      <CoursesForm
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        onSubmit={handleSave}
        defaultValues={selectedRecord}
        categoryList={categoryData}
      />

      <DeleteCourse
        open={openDeleteDialog}
        record={selectedRecord}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}
