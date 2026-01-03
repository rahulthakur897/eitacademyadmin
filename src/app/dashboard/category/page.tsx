"use client";

import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@/components/common/table";
import CategoryDialog from "@/components/common/CategoryForm";
import CategoryDelete from "@/components/common/CategoryDeleteDialog";
import { fetchCategory, addCategory,updateCategory,deleteCategory } from "@/app/redux/actions/category";
import { toast } from "sonner";

export default function Category() {
  const [openSheet, setOpenSheet] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { categoryData } = useSelector((state: any) => state.category);

useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  // FILTER SEARCH
  const filteredData = (categoryData || [])?.filter((item) =>
    item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // OPEN ADD
  const handleAdd = () => {
    setMode("add");
    setSelectedRecord(null);
    setOpenSheet(true);
  };

  // OPEN EDIT
  const handleEdit = (item: any) => {
    setMode("edit");
    setSelectedRecord(item);
    setOpenSheet(true);
  };

  // OPEN DELETE
  const handleDelete = (item: any) => {
    setSelectedRecord(item);
    setOpenDeleteDialog(true);
  };

  // SAVE CATEGORY
  const handleSave = (data: any) => {
    mode === "edit" ?  dispatch(updateCategory(data)) : dispatch(addCategory(data));
    toast.success(`Category ${mode === "add" ? "added" : "updated"} successfully`);
  };

  // CONFIRM DELETE
  const handleConfirmDelete = () => {
    dispatch(deleteCategory(selectedRecord.id));
    toast.success("Category deleted successfully");
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
        rows={filteredData}
        editModal={handleEdit}
        delRecord={handleDelete}
        pageName="course"
      />

      <CategoryDialog
        open={openSheet}
        mode={mode}
        record={selectedRecord}
        onClose={() => setOpenSheet(false)}
        onSave={handleSave}
      />

      <CategoryDelete
        open={openDeleteDialog}
        category={selectedRecord}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}
