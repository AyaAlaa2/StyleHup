import React, { useState } from "react";
import { menuItems } from "./AdminSlideItem";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  return (
    <div>
      <aside
        className={`hidden md:block fixed md:static top-0 left-0 h-full w-64 bg-white p-[16px]`}
      >
        <div className="flex flex-col gap-[16px]">
          <h2 className="text-[16px] font-medium leading-[24px]">
            Admin Panel
          </h2>
          <nav className="flex flex-col gap-[8px]">
            {menuItems.map((item) => (
              <Link
                onClick={() => setCurrentPage(item.name)}
                key={item.name}
                to={item.path}
                className={`flex items-center py-[8px] px-[12px] rounded-lg hover:bg-gray-100 hover:text-black transition-colors flex gap-[12px]
                  ${currentPage == item.name ? "bg-[#F0F2F5] text-black" : ""}
                `}
              >
                {currentPage == item.name ? item.selectedIcon : item.icon}
                <span className="text-[14px] leading-[21px] font-medium">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;
