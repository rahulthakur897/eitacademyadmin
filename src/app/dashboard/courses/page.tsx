"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@/components/common/table";
import DeleteEmployee from "@/components/common/EmployeeDeleteDialog";
import Courses from "@/components/common/CoursesForm";
import { fetchCategory } from "@/app/redux/actions/category";
import { fetchCourses} from "@/app/redux/actions/course";

const employeesList = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@mysrl.com",
    phone: "9876543210",
    position: "Senior Supervisor",
    password: "Aarav@123",
    joiningDate: "2023-04-10"
  },
  {
    id: 2,
    name: "Siya Patel",
    email: "siya.patel@mysrl.com",
    phone: "9123456780",
    position: "Store Coordinator",
    password: "Siya#890",
    joiningDate: "2022-11-25"
  },
  {
    id: 3,
    name: "Kabir Mehta",
    email: "kabir.mehta@mysrl.com",
    phone: "9988776655",
    position: "Junior Sales Exec",
    password: "Kabir!456",
    joiningDate: "2024-01-08"
  },
  {
    id: 4,
    name: "Myra Rao",
    email: "myra.rao@mysrl.com",
    phone: "9090909090",
    position: "Assistant Manager",
    password: "Myra@909",
    joiningDate: "2023-08-19"
  },
  {
    id: 5,
    name: "Vivaan Khanna",
    email: "vivaan.khanna@mysrl.com",
    phone: "8080808080",
    position: "Senior Sales Exec",
    password: "Vivaan#808",
    joiningDate: "2021-06-30"
  },
  {
    id: 6,
    name: "Anaya Chopra",
    email: "anaya.chopra@mysrl.com",
    phone: "9123123123",
    position: "Front Desk Staff",
    password: "Anaya$123",
    joiningDate: "2022-09-14"
  },
  {
    id: 7,
    name: "Reyansh Desai",
    email: "reyansh.desai@mysrl.com",
    phone: "9001122334",
    position: "Inventory Assistant",
    password: "Reyan@001",
    joiningDate: "2023-02-05"
  },
  {
    id: 7,
    name: "Reyansh Desai",
    email: "reyansh.desai@mysrl.com",
    phone: "9001122334",
    position: "Inventory Assistant",
    password: "Reyan@001",
    joiningDate: "2023-02-05"
  },
  {
    id: 7,
    name: "Reyansh Desai",
    email: "reyansh.desai@mysrl.com",
    phone: "9001122334",
    position: "Inventory Assistant",
    password: "Reyan@001",
    joiningDate: "2023-02-05"
  },
  {
    id: 7,
    name: "Reyansh Desai",
    email: "reyansh.desai@mysrl.com",
    phone: "9001122334",
    position: "Inventory Assistant",
    password: "Reyan@001",
    joiningDate: "2023-02-05"
  },
  {
    id: 7,
    name: "Reyansh Desai",
    email: "reyansh.desai@mysrl.com",
    phone: "9001122334",
    position: "Inventory Assistant",
    password: "Reyan@001",
    joiningDate: "2023-02-05"
  },
];

export default function CoursesPage() {
  const [employeeData, setEmployeeData] = useState(employeesList);

  const [openSheet, setOpenSheet] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchCourses());
  }, [dispatch]);
  
  const { categoryData } = useSelector((state: any) => state.category);
  const { courseList,errorData } = useSelector((state: any) => console.log(state.courseReducer));

  // SEARCH FILTER
  // console.log("courseList",courseList)
  const filteredRecords = (employeeData|| []).filter((list) => {
    const q = searchQuery.toLowerCase();

    return (
      list.name.toLowerCase().includes(q) 
    );
  });

  // ADD EMPLOYEE
  const handleAdd = () => {
    setMode("add");
    setSelectedEmployee(null);
    setOpenSheet(true);
  };

  // EDIT EMPLOYEE
  const handleEdit = (emp: any) => {
    setMode("edit");
    setSelectedEmployee(emp);
    setOpenSheet(true);
  };

  // DELETE EMPLOYEE
  const handleDelete = (emp: any) => {
    setSelectedEmployee(emp);
    setOpenDeleteDialog(true);
  };

  // HANDLE FORM SUBMIT (ADD / EDIT)
  const handleSave = (data: any) => {
    if (mode === "add") {
      
      setEmployeeData((prev) => [
        ...prev,
        { id: prev.length + 1, ...data }
      ]);
    } else {
      setEmployeeData((prev) =>
        prev.map((e) => (e.id === selectedEmployee.id ? { ...e, ...data } : e))
      );
    }
  };

  // DELETE CONFIRM
  const handleConfirmDelete = () => {
    setEmployeeData((prev) =>
      prev.filter((emp) => emp.id !== selectedEmployee.id)
    );

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
          { colname: "email", value: "Email" },
          { colname: "phone", value: "Phone" },
          { colname: "position", value: "Position" },
          { colname: "action", value: "Action" }
        ]}
        rows={filteredRecords}
        editModal={handleEdit}
        delRecord={handleDelete}
        pageName="employee"
      />

      {/* ADD / EDIT FORM */}
      <Courses
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        onSubmit={handleSave}
        defaultValues={selectedEmployee}
        categoryList= {categoryData}
      />

      {/* DELETE DIALOG */}
      <DeleteEmployee
        open={openDeleteDialog}
        employee={selectedEmployee}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}
