"use client";

import { useState } from "react";
import DataTable from "@/components/common/table";
import UpcomingCourseForm from "@/components/common/UpcomingCourseForm";
import UpcomingCourseDelete from "@/components/common/UpcomingCourseDeleteDialog";

/* ==========================================================
   UPCOMING COURSES (MASTER LIST)
========================================================== */
export const upcomingCourses = [
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    categoryId: 1,
    categoryName: "Electronics",
    startDate: "2025-03-10",
    demoDate: "2025-03-05",
    duration: "6 Weeks",
    instructor: "Dr. Anita Sharma",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Advanced Machine Learning",
    categoryId: 1,
    categoryName: "Electronics",
    startDate: "2025-04-05",
    demoDate: "2025-03-28",
    duration: "8 Weeks",
    instructor: "Prof. Rahul Verma",
    level: "Advanced",
  },
  {
    id: 3,
    title: "Cloud Computing Essentials",
    categoryId: 2,
    categoryName: "Furniture",
    startDate: "2025-03-20",
    demoDate: "2025-03-12",
    duration: "5 Weeks",
    instructor: "Aditi Gupta",
    level: "Intermediate",
  },
  {
    id: 4,
    title: "Cybersecurity Fundamentals",
    categoryId: 2,
    categoryName: "Furniture",
    startDate: "2025-04-15",
    demoDate: "2025-04-05",
    duration: "6 Weeks",
    instructor: "Vikram Singh",
    level: "Beginner",
  },
  {
    id: 5,
    title: "Data Visualization with Python",
    categoryId: 1,
    categoryName: "Electronics",
    startDate: "2025-03-28",
    demoDate: "2025-03-22",
    duration: "4 Weeks",
    instructor: "Neha Kapoor",
    level: "Intermediate",
  },
];

/* ==========================================================
   FACULTY LIST (For dropdown)
========================================================== */
export const facultyList = [
  { name: "Dr. Anita Sharma" },
  { name: "Prof. Rahul Verma" },
  { name: "Aditi Gupta" },
  { name: "Vikram Singh" },
  { name: "Neha Kapoor" }
];

/* ==========================================================
   PAGE COMPONENT
========================================================== */
export default function UpcomingCourse() {
  const [stockData, setStockData] = useState(upcomingCourses);

  const [openSheet, setOpenSheet] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedStock, setSelectedStock] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");

  // SEARCH FILTER
  const filteredStock = stockData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ADD
  const handleAdd = () => {
    setMode("add");
    setSelectedStock(null);
    setOpenSheet(true);
  };

  // EDIT
  const handleEdit = (item: any) => {
    setMode("edit");
    setSelectedStock(item);
    setOpenSheet(true);
  };

  // DELETE
  const handleDelete = (item: any) => {
    setSelectedStock(item);
    setOpenDeleteDialog(true);
  };

  // SAVE COURSE - ADD / EDIT
  const handleSave = (data: any) => {
    if (mode === "add") {
      setStockData((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          ...data,
        },
      ]);
    } else {
      setStockData((prev) =>
        prev.map((e) => (e.id === selectedStock.id ? { ...e, ...data } : e))
      );
    }
  };

  // DELETE CONFIRM
  const handleConfirmDelete = () => {
    setStockData((prev) => prev.filter((item) => item.id !== selectedStock.id));
    setOpenDeleteDialog(false);
  };

  return (
    <main className="p-4">

      {/* TOP BAR */}
      <div className="flex justify-end items-center mb-4 px-4">
        <div className="flex gap-3 items-center">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border border-blue-600 text-blue-700 
              px-3 py-2 rounded-md w-52 text-sm 
              focus:outline-none focus:ring-1 focus:ring-blue-600"
          />

          {/* ADD BUTTON */}
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white font-semibold px-3 py-2 
              rounded-md text-[12px] hover:bg-blue-700 transition"
          >
            + Add Upcoming Course
          </button>

        </div>
      </div>

      {/* TABLE */}
      <DataTable
        columns={[
          { colname: "idx", value: "S No." },
          { colname: "title", value: "Title" },
          { colname: "categoryName", value: "Category" },
          { colname: "demoDate", value: "Demo Date" },
          { colname: "startDate", value: "Start Date" },
          { colname: "duration", value: "Duration" },
          { colname: "instructor", value: "Instructor" },
          { colname: "level", value: "Level" },
          { colname: "action", value: "Action" },
        ]}
        rows={filteredStock}
        editModal={handleEdit}
        delRecord={handleDelete}
        pageName="upcoming-course"
      />

      {/* ADD / EDIT FORM */}
      <UpcomingCourseForm
        open={openSheet}
        mode={mode}
        record={selectedStock}
        onClose={() => setOpenSheet(false)}
        onSave={handleSave}
        courseList={upcomingCourses}
        categories={[
          { id: 1, name: "Electronics" },
          { id: 2, name: "Furniture" },
        ]}
        instructors={facultyList.map((f) => f.name)}
      />

      {/* DELETE DIALOG */}
      <UpcomingCourseDelete
        open={openDeleteDialog}
        record={selectedStock}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}
