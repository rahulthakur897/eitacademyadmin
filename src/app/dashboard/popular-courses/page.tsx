"use client";

import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@/components/common/table";
import PopularCourseDelete from "@/components/common/PopularCoursesDeleteDialog";
import PopularCoursesForm from "./PopularCoursesForm";
import { fetchCategory } from "@/app/redux/actions/category";
import { fetchCourses, getPopularCourse, addPopularCourse, deletePopularCourse } from "@/app/redux/actions/course";
import { toast } from "sonner";
const category = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Furniture" },
];

const subCategory = [
  { id: 1, name: "Television", parentId: 1 },
  { id: 2, name: "Home Entertainment Systems", parentId: 1 },
  { id: 3, name: "Home Entertainment Systems", parentId: 1 },
  { id: 4, name: "Headphones", parentId: 1 },
  { id: 5, name: "Speakers", parentId: 1 },
  { id: 20, name: "Tables", parentId: 2 },
  { id: 21, name: "Chairs", parentId: 2 },
];

export default function SubCategory() {
  const [stockData, setStockData] = useState(subCategory);
  const dispatch = useDispatch();
  const [openSheet, setOpenSheet] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedStock, setSelectedStock] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");

  const { categoryData } = useSelector((state: any) => state.category);
  const { courseList, popularCourseList } = useSelector((state: any) => state.course);
  
  const combined = popularCourseList.map((sub : any) => ({
    ...sub,
    categoryName: categoryData.find((c : any) => c.id === sub.category_id)?.name || "Unknown",
  }));

  useEffect(() => {
      dispatch(fetchCategory());
      dispatch(fetchCourses())
      dispatch(getPopularCourse())
     
    }, [dispatch]);

  const filterRecords = combined
    .filter((item : any) =>
      selectedCategory === "all" ? true : item.category_id === selectedCategory
      ||  item?.name?.toLowerCase().includes(searchQuery.toLowerCase()
    ));
  
  const handleAdd = () => {
    setMode("add");
    setSelectedStock(null);
    setOpenSheet(true);
  };

  const handleDelete = (item: any) => {
    setSelectedStock(item);
    setOpenDeleteDialog(true);
  };

  const handleSave = (data: any) => {
    dispatch(addPopularCourse(data));
    toast.success("Course added successfully");
  };

  const handleConfirmDelete = () => {
    dispatch(deletePopularCourse(selectedStock.id));
    setOpenDeleteDialog(false);
    toast.success("Data deleted successfully")
  };

  return (
    <main className="p-4">

      {/* TOP BAR */}
      <div className="flex justify-end items-center mb-4 px-4">
        <div className="flex gap-3 items-center">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border border-blue-600 text-blue-700 px-3 py-2 rounded-md w-52 text-sm"
          />

          {/* CATEGORY FILTER */}
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
            className="bg-white border border-blue-600 text-blue-700 px-2 py-2 rounded-md text-sm"
          >
            <option value="all">All Categories</option>
            {categoryData.map((cat : any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* ADD BUTTON */}
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white font-semibold px-3 py-2 rounded-md text-[12px] hover:bg-blue-700 transition"
          >
            + Add
          </button>
        </div>
      </div>

      {/* TABLE */}
      <DataTable
        columns={[
          { colname: "idx", value: "S No." },
          { colname: "name", value: "Course Name" },
          { colname: "categoryName", value: "Category" },
          { colname: "action", value: "Action" },
        ]}
        rows={filterRecords}
        delRecord={handleDelete}
        pageName="popular-course"
      />

      <PopularCoursesForm
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        onSave={handleSave}
        categories={categoryData}
        courseList = { courseList}
      />

      <PopularCourseDelete
        open={openDeleteDialog}
        record={selectedStock}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />

    </main>
  );
}
