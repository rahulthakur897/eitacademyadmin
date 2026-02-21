"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import DataTable from "@/components/common/table";
import UpcomingCourseDelete from "@/components/common/UpcomingCourseDeleteDialog";
import { fetchUpcomingCourse, addUpcomingCourse,updateUpcomingCourse, deleteUpcomingCourse} from "@/redux/actions/course";
import { fetchCategory } from "@/redux/actions/category";
import { getInstructorList } from "@/redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import UpcomingCourseForm from "./UpcomingCourseForm";

export default function UpcomingCourse() {
    const dispatch = useDispatch();
    const [openSheet, setOpenSheet] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const [mode, setMode] = useState<"add" | "edit">("add");
    const [selectedRecord, setSelectedRecord] = useState<any>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const { upcomingCourseList } = useSelector((state: any) => state.course);
    const { categoryData } = useSelector((state: any) => state.category);
    const { instructorList } = useSelector((state: any) => state.user);

      useEffect(() => {
       dispatch(fetchUpcomingCourse());
       dispatch(fetchCategory());
       dispatch(getInstructorList());
    }, [dispatch]);
    
     const getCombinedList = () => {
        return upcomingCourseList.map((rowData: any) => {
          const categoryName = categoryData.find((blist: any) => blist.id === parseInt(rowData.category_id));
          return {
            ...rowData,
            category_name: categoryName ? categoryName?.name : "Unknown Category"
          };
        });
      };
    
      const combinedList = getCombinedList();
    // SEARCH FILTER
    const filteredStock = combinedList.filter((item: any) =>
        item?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ADD
    const handleAdd = () => {
        setMode("add");
        setSelectedRecord(null);
        setOpenSheet(true);
    };

    // EDIT
    const handleEdit = (item: any) => {
        setMode("edit");
        setSelectedRecord(item);
        setOpenSheet(true);
    };

    // DELETE
    const handleDelete = (item: any) => {
        setSelectedRecord(item);
        setOpenDeleteDialog(true);
    };

    // SAVE DATA (Add / Edit)
    const handleSave = (data: any) => {
        if (mode === "add") {
            dispatch(addUpcomingCourse(data))
            toast.success("Upcoming Course added successfully!");
        } else {     
            dispatch(updateUpcomingCourse(data))   
            toast.success("Upcoming Course updated successfully!");
        }
    };

    // CONFIRM DELETE
    const handleConfirmDelete = () => {
        // Dispatch delete action here
        dispatch(deleteUpcomingCourse(selectedRecord.id));
        toast.success("Upcoming Course deleted successfully!");
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
                        + Add Upcoming Course
                    </button>

                </div>
            </div>

            {/* TABLE */}
            <DataTable
                columns={[
                    { colname: "idx", value: "S No." },
                    { colname: "name", value: "Title" },
                    { colname: "category_name", value: "Category" },
                    { colname: "demo_date", value: "Demo Date" },
                    { colname: "batch_start", value: "Start Date" },
                    { colname: "demo_duration", value: "Duration" },
                    { colname: "faculty_id", value: "Instructor" },
                    { colname: "action", value: "Action" },
                ]}
                rows={filteredStock}
                editModal={handleEdit}
                delRecord={handleDelete}
                pageName="course"
            />

            <UpcomingCourseForm
                open={openSheet}
                mode={mode}
                record={selectedRecord}
                onClose={() => setOpenSheet(false)}
                onSave={handleSave}
                instructors={instructorList}
            />

            {/* DELETE DIALOG */}
            <UpcomingCourseDelete
                open={openDeleteDialog}
                record={selectedRecord}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleConfirmDelete}
            />
        </main>
    );
}

