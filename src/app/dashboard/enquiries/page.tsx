"use client";

import DataTable from "@/components/common/table";
import { fetchEnquiry } from "@/redux/actions/enquiry";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Enquiry() {
    const dispatch = useDispatch<any>();
  const { enquiryList } = useSelector(
    (state: any) => state.enquiry
  );

    useEffect(() => {
      dispatch(fetchEnquiry());
    }, [dispatch]);

    console.log("enquiryList", enquiryList)
  return (
    <main className="p-4">
      <DataTable
        columns={[
          { colname: "idx", value: "S No." },
          { colname: "name", value: "Name" },
          { colname: "email", value: "Email" },
          { colname: "contact", value: "Contact No." },
          { colname: "message", value: "Message" },
          { colname: "status", value: "Status" },
        ]}
        rows={enquiryList}
        pageName="enquiryList"
      />
    </main>
  );
}
