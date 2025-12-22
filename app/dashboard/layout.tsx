"use client";

import { ReactNode } from "react";
import LeftMenu from "@/components/common/leftMenuBar";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayouts({ children }: RootLayoutProps) {
  const pathname = usePathname();

  const lastSegment =
    pathname?.split("/").filter(Boolean).pop() ?? "dashboard";

  const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const pageTitle = toTitleCase(lastSegment);


  const isDashboard = pathname === "/dashboard";

  return (
    <div className="flex flex-col h-screen w-full bg-[#f8f9fc]">
      <header className="h-20 bg-white border-b border-[#d9e7ff] shadow-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <img src="/assets/images/logo.png" className="w-16" alt="logo" />

          <div className="flex flex-col">
            <h1 className="text-[#003b7d] text-xl font-bold leading-tight">
              EXPERT IT ACADEMY
            </h1>
            <span className="text-[#0056b3] text-sm font-medium tracking-wide">
              & CONSULTANCY SERVICES
            </span>
          </div>
        </div>

        {/* RIGHT — Logout Button */}
        <button
          className="text-white bg-[#003b7d] px-4 py-2 rounded-md font-semibold 
          hover:bg-[#002a56] transition shadow-md"
          onClick={() => {
            sessionStorage.removeItem("isAdminLoggedIn");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <LeftMenu />

        <div className="flex-1 flex flex-col overflow-hidden bg-[#f8f9fc]">

          {/* PAGE TITLE — visible on all pages EXCEPT dashboard */}
          {!isDashboard && (
            <div className="px-6 pt-4 text-[#003b7d] text-xl font-semibold">
              {pageTitle}
            </div>
          )}

          <main className="flex-1 overflow-y-auto px-6">
            <Toaster theme="system" richColors position="top-right" />
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
