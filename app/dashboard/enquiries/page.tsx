"use client";

import { useState } from "react";
import DataTable from "@/components/common/table";

// EMPLOYEE LIST
const employeesList = [
 {
  id: 1,
  name: "Aarav Sharma",
  inOutTime: "09:00 AM - 06:00 PM",
  location: "Lucknow"
},

  {
    id: 2,
    name: "Siya Patel",
   inOutTime: "09:00 AM - 06:00 PM",
  location: "Lucknow"
  },
  {
    id: 3,
    name: "Kabir Mehta",
   inOutTime: "09:00 AM - 06:00 PM",
  location: "Lucknow"
  },
  {
    id: 4,
    name: "Myra Rao",
   inOutTime: "09:00 AM - 06:00 PM",
  location: "Lucknow"
  },
  {
    id: 5,
    name: "Vivaan Khanna",
  inOutTime: "09:00 AM - 06:00 PM",
  location: "Lucknow"
  },

];

export default function EmployeeDirectory() {
  return (
    <main className="p-4">
      <DataTable
        columns={[
          { colname: "idx", value: "S No." },
          { colname: "name", value: "Name" },
          { colname: "inOutTime", value: "In-Out Time" },
          { colname: "location", value: "Location" },
        ]}
        rows={employeesList}
        pageName="employee"
      />
    </main>
  );
}
