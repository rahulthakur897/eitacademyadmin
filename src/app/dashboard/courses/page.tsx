"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@/components/common/table";

import Courses from "@/components/common/CoursesForm";
import { fetchCategory } from "@/app/redux/actions/category";
import { fetchCourses, addCourse, deleteCourse} from "@/app/redux/actions/course";
import { toast } from "sonner";
import DeleteCourse from "@/components/common/DeleteCourse";

export default function CoursesPage() {
  const [openSheet, setOpenSheet] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchCourses());
  }, [dispatch]);
  
  const { categoryData } = useSelector((state: any) => state.category);
  const { courseList, errorData } = useSelector((state: any) => state.course);
 // Combine all data into a common list
  const getCombinedList = () => {
    return courseList.map(clist => {
      const category = categoryData.find((cats: any) => cats.id === parseInt(clist.category_id));
      return {
        ...clist,
        category_name: category ? category.name : 'Unknown Category',
      };
    });
  };

  const combinedList = getCombinedList();
  // SEARCH FILTER
  const filteredRecords = (combinedList|| []).filter((list) => {
    const q = searchQuery.toLowerCase();
    return (
      list.name.toLowerCase().includes(q) 
    );
  });

  // ADD EMPLOYEE
  const handleAdd = () => {
    setMode("add");
    setSelectedRecord(null);
    setOpenSheet(true);
  };

  // EDIT EMPLOYEE
  const handleEdit = (emp: any) => {
    setMode("edit");
    setSelectedRecord(emp);
    setOpenSheet(true);
  };

  // DELETE EMPLOYEE
  const handleDelete = (emp: any) => {
    setSelectedRecord(emp);
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

  // HANDLE FORM SUBMIT (ADD / EDIT)
  const handleSave = async (data: any) => {
    if (mode === "add") {
  // ✅ Upload image to frontend server
   let imageName = "";

    if (data.course_logo) {
      const uploadRes = await uploadImage(data.course_logo);
      if (uploadRes.status) {
        imageName = uploadRes.filename;
      }
    }
        const newRecord = {
        name: data.name,
        category_id: data.category_id,
        shortdesc:  data.shortdesc,
        overview:  data.overview,
        price:  data.price,
        duration:  data.duration,
        module_count:  data.module_count,
        course_level:  data.course_level,
        provide_certificate:  data.provide_certificate,
        course_language:  data.course_language,
        instructor_support:  data.instructor_support,
        course_advantage:  data.course_advantage,
        couse_faq:  data.couse_faq,
        slug: data.slug,
        course_logo: imageName,
      };
  
      dispatch(addCourse(newRecord));
       toast.success("Course added duccessfully");
    } else {
      
    }
  };

  // DELETE CONFIRM
  const handleConfirmDelete = () => {
    dispatch(deleteCourse(selectedRecord.id));
    toast.success("Course deleted duccessfully");
    setOpenDeleteDialog(false);
  };

  return (
    <main className="p-4">

      {/* TOP BAR */}
      <div className="flex justify-end items-center mb-4 px-4">
        <div className="flex gap-3 items-center">

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border border-red-600 text-red-700 
              px-3 py-2 rounded-md w-52 text-sm
              focus:outline-none focus:ring-1 focus:ring-red-600"
          />

          <button
            onClick={handleAdd}
            className="bg-red-600 text-white font-semibold px-3 py-2 rounded-md text-[12px] hover:bg-red-700 transition"
          >
            + Add 
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
          { colname: "module_count", value: "Total Module" },
          { colname: "action", value: "Action" }
        ]}
        rows={filteredRecords}
        editModal={handleEdit}
        delRecord={handleDelete}
        pageName="course"
      />

      {/* ADD / EDIT FORM */}
      <Courses
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        onSubmit={handleSave}
        defaultValues={selectedRecord}
        categoryList= {categoryData}
      />

      {/* DELETE DIALOG */}
      <DeleteCourse
        open={openDeleteDialog}
        record={selectedRecord}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}
