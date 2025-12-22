"use client";

import { useState } from "react";
import DataTable from "@/components/common/table";
import CategoryDialog from "@/components/common/CategoryForm";
import CategoryDelete from "@/components/common/CategoryDeleteDialog";

const category = [
  { id: 1, name: "Ai" },
  { id: 2, name: "Cloud" },
];

export default function Category() {
  const [stockData, setStockData] = useState(category);

  const [openSheet, setOpenSheet] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedStock, setSelectedStock] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");

  // FILTER SEARCH
  const filteredStock = stockData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // OPEN ADD
  const handleAdd = () => {
    setMode("add");
    setSelectedStock(null);
    setOpenSheet(true);
  };

  // OPEN EDIT
  const handleEdit = (item: any) => {
    setMode("edit");
    setSelectedStock(item);
    setOpenSheet(true);
  };

  // OPEN DELETE
  const handleDelete = (item: any) => {
    setSelectedStock(item);
    setOpenDeleteDialog(true);
  };

  // SAVE CATEGORY
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
        prev.map((e) =>
          e.id === selectedStock.id ? { ...e, ...data } : e
        )
      );
    }
  };

  // CONFIRM DELETE
  const handleConfirmDelete = () => {
    setStockData((prev) =>
      prev.filter((item) => item.id !== selectedStock.id)
    );
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
            + Add Category
          </button>

        </div>
      </div>

      {/* TABLE */}
      <DataTable
        columns={[
          { colname: "idx", value: "S No." },
          { colname: "name", value: "Name" },
          { colname: "action", value: "Action" },
        ]}
        rows={filteredStock}
        editModal={handleEdit}
        delRecord={handleDelete}
        pageName="course"
      />

      <CategoryDialog
        open={openSheet}
        mode={mode}
        record={selectedStock}
        onClose={() => setOpenSheet(false)}
        onSave={handleSave}
      />

      <CategoryDelete
        open={openDeleteDialog}
        category={selectedStock}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}
