"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface Column {
  colname: string;
  value: string;
}

interface RowData {
  [key: string]: any;
  status?: string;
}

interface DataTableProps {
  columns: Column[];
  rows: RowData[];
  editModal?: (row: RowData) => void;
  delRecord?: (row: RowData) => void;
  pageName: string;
}

export default function DataTable({
  columns,
  rows,
  editModal,
  delRecord,
  pageName
}: DataTableProps) {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 8;

  const totalPages = Math.max(1, Math.ceil(rows.length / ITEMS_PER_PAGE));

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return rows.slice(start, start + ITEMS_PER_PAGE);
  }, [rows, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const RowActions = ({ row }: { row: RowData }) => {
    if (pageName === "course" || pageName === "stock") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5 text-[#003B7D]" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-28 bg-white border border-gray-200 shadow-md"
          >
            {/* EDIT */}
            <DropdownMenuItem
              onClick={() => editModal?.(row)}
              className="flex gap-2 text-[#003B7D] hover:bg-blue-50"
            >
              <Pencil className="h-4 w-4" /> Edit
            </DropdownMenuItem>

            {/* DELETE */}
            <DropdownMenuItem
              onClick={() => delRecord?.(row)}
              className="flex gap-2 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
     if (pageName === "popular-course") {
      return (
        <Trash2 onClick={() => delRecord?.(row)} className="h-4 w-4" />
      );
      
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md bg-white border border-[#D0D7E3] shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-[#EAF1FF]">
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.colname}
                  className="text-[#003B7D] font-semibold"
                >
                  {col.value}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (columns.some(c => c.colname === "action") ? 1 : 0)}
                  className="text-center py-10 text-gray-600"
                >
                  <div className="flex flex-col items-center gap-3">
                    <Image
                      src="/assets/images/icons/HR.svg"
                      width={150}
                      height={150}
                      alt="No data"
                      className="opacity-60"
                    />
                    <p className="text-gray-500">No records found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedItems.map((item, i) => (
                <TableRow
                  key={i}
                  className="border-b border-gray-200 hover:bg-blue-50"
                >
                  {columns.map((col) => {
                    const value =
                      col.colname === "idx"
                        ? (currentPage - 1) * ITEMS_PER_PAGE + (i + 1)
                        : item[col.colname];

                    return (
                      <TableCell key={col.colname} className="text-gray-800">
                        {col.colname !== "action" && (value ?? "-")}

                        {col.colname === "action" && (
                          <div>
                            <RowActions row={item} />
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>

        </Table>
      </div>

      {/* PAGINATION */}
      {rows.length > ITEMS_PER_PAGE && (
        <div className="flex justify-between items-center text-gray-700">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex gap-2">
            {/* Previous Buttons */}
            {["«", "‹"].map((label, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(idx === 0 ? 1 : currentPage - 1)}
                className="border-[#003B7D] text-[#003B7D] hover:bg-blue-50"
              >
                {label}
              </Button>
            ))}

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                size="sm"
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => handlePageChange(i + 1)}
                className={`${
                  currentPage === i + 1
                    ? "bg-[#003B7D] text-white"
                    : "border-[#003B7D] text-[#003B7D] hover:bg-blue-50"
                }`}
              >
                {i + 1}
              </Button>
            ))}

            {/* Next Buttons */}
            {["›", "»"].map((label, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() =>
                  handlePageChange(idx === 0 ? currentPage + 1 : totalPages)
                }
                className="border-[#003B7D] text-[#003B7D] hover:bg-blue-50"
              >
                {label}
              </Button>
            ))}
          </div>

          <div className="text-sm px-2 py-1 rounded border border-gray-300 bg-white text-[#003B7D]">
            {ITEMS_PER_PAGE} / page
          </div>
        </div>
      )}
    </div>
  );
}
