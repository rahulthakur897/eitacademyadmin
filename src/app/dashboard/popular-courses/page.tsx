"use client";

import { useState } from "react";
import DataTable from "@/components/common/table";
import PopularCourseDelete from "@/components/common/PopularCoursesDeleteDialog";
import PopularCoursesForm from "./PopularCoursesForm";

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

  const [openSheet, setOpenSheet] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedStock, setSelectedStock] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");

  const combined = stockData.map((sub) => ({
    ...sub,
    categoryName: category.find((c) => c.id === sub.parentId)?.name || "Unknown",
  }));

  const filteredStock = combined
    .filter((item) =>
      selectedCategory === "all" ? true : item.parentId === selectedCategory
    )
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
    if (mode === "add") {
      setStockData((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          parentId: selectedCategory === "all" ? 1 : selectedCategory,
          ...data,
        },
      ]);
    } else {
      setStockData((prev) =>
        prev.map((e) => (e.id === selectedStock.id ? { ...e, ...data } : e))
      );
    }
  };

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
            {category.map((cat) => (
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
        rows={filteredStock}
        delRecord={handleDelete}
        pageName="popular-course"
      />

      <PopularCoursesForm
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        onSave={handleSave}
        categories={category}
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
