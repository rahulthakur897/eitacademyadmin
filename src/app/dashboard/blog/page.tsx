"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import DataTable from "@/components/common/table";
import BlogForm from "./blogForm";
import { fetchCategory } from "@/redux/actions/category";
import {
  addBlog,
  deleteBlog,
  fetchBlog,
  updateBlog,
} from "@/redux/actions/blog";
import { Blog } from "@/utils/type";
import DeleteBlog from "./blogDelete";

export default function BlogPage() {
  const dispatch = useDispatch<any>();

  const [openSheet, setOpenSheet] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedRecord, setSelectedRecord] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { categoryData } = useSelector(
    (state: any) => state.category
  );

  const { blogList } = useSelector(
    (state: any) => state.blog
  );

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchBlog());
  }, [dispatch]);

  /* ---------------- HANDLERS ---------------- */

  const handleAdd = () => {
    setMode("add");
    setSelectedRecord(null);
    setOpenSheet(true);
  };

  const handleEdit = (record: Blog) => {
    setMode("edit");
    setSelectedRecord(record);
    setOpenSheet(true);
  };

  const handleDelete = (record: Blog) => {
    setSelectedRecord(record);
    setOpenDeleteDialog(true);
  };


  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await fetch("/api/upload-blog-image", {
      method: "POST",
      body: fd,
    });

    return res.json();
  };

  const handleSave = useCallback(
    async (data: Blog) => {
      try {
        let imageName = data.image;

        if (data.image instanceof File) {
         const uploadRes = await uploadImage(data.image);
           if (uploadRes?.status) {
          imageName = uploadRes.filename;
        }
        }
        
        const payload: Blog = {
          ...data,
          image: imageName,
        };

        if (mode === "add") {
          dispatch(addBlog(payload));
          toast.success("Blog added successfully");
        } else {
          payload["id"]= selectedRecord?.id
          dispatch(updateBlog(payload));
          toast.success("Blog updated successfully");
        }

        setOpenSheet(false);
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [dispatch, mode]
  );

  /* ---------------- DELETE ---------------- */

  const handleConfirmDelete = () => {
    if (!selectedRecord) return;
    dispatch(deleteBlog(selectedRecord.id));
    toast.success("Blog deleted successfully");
    setOpenDeleteDialog(false);
  };

  /* ---------------- FILTERED DATA ---------------- */

  const filteredBlogs = blogList?.filter((blog: Blog) =>
    blog.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="p-4">
      {/* HEADER */}
      <div className="flex justify-end items-center mb-4 px-4">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search blog..."
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
            + Add Blog
          </button>
        </div>
      </div>

      {/* TABLE */}
      <DataTable
        columns={[
          { colname: "idx", value: "S No." },
          { colname: "image", value: "Image" },
          { colname: "title", value: "Title" },
          { colname: "shortdesc", value: "Short Description" },
          { colname: "action", value: "Action" },
        ]}
        rows={filteredBlogs}
        editModal={handleEdit}
        delRecord={handleDelete}
        pageName="blog"
      />

      {/* FORM */}
      <BlogForm
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        onSubmit={handleSave}
        defaultValues={selectedRecord ?? undefined}
        categoryList={categoryData}
      />

      {/* DELETE */}
      <DeleteBlog
        open={openDeleteDialog}
        record={selectedRecord}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}
