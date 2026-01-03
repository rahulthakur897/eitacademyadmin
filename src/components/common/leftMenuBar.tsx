"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  GuestIcon,
  VenuesIcon,
  CategoryIcon,
  StockIcon,
  AttendanceIcon,
  CategoryUpcomingIcon,
  SubCategoryIcon
} from "@/components/icons/sidebarIcon";

interface MenuItem {
  name: string;
  href: string;
  icon: React.FC<{ className?: string }>;
}

const role = "Admin";

const roleMenus: Record<string, MenuItem[]> = {
  Admin: [
    { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
    { name: "Category", href: "/dashboard/category", icon: CategoryIcon },
    { name: "Courses", href: "/dashboard/courses", icon: StockIcon },
    { name: "Popular Courses", href: "/dashboard/popular-courses", icon: VenuesIcon },
    { name: "Upcoming Courses", href: "/dashboard/upcoming-courses", icon: CategoryUpcomingIcon },
    { name: "Faculty", href: "/dashboard/faculty", icon: AttendanceIcon },
    { name: "Student Enquiry", href: "/dashboard/enquiries", icon: SubCategoryIcon },
    { name: "Student List", href: "/dashboard/students-list", icon: GuestIcon },
  ],
};


export default function LeftMenu() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen flex flex-col bg-white border-r border-[#d9e7ff] shadow-lg">
      <div className="flex-1 px-4 overflow-y- pt-6">
        {roleMenus[role]?.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.name} href={item.href}>
              <div
                className={`flex items-center gap-3 w-full py-2 px-3 rounded-md 
                  font-semibold text-[14px] cursor-pointer transition-all duration-200
                ${isActive
                    ? "bg-[#e0edff] text-[#003b7d] border border-[#b3d4ff]"
                    : "text-[#003b7d] hover:bg-[#f0f6ff] hover:text-[#0056b3]"
                  }`}
              >
                <item.icon
                  className={isActive ? "text-[#003b7d]" : "text-[#0056b3]"}
                />
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>

    </aside>
  );
}
