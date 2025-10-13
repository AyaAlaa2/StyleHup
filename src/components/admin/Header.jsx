import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiNotification2Line } from "react-icons/ri";
import { RiDashboardFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar";
import { logout } from "../reducers/loggedReducer";
import { menuItems } from "./AdminSlideItem";
import { motion } from "motion/react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const selector = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="navbar justify-between items-center px-4 md:px-[40px] py-[12px] shadow-sm text-black relative">
      <div className="flex items-center gap-4 md:gap-[32px]">
        <Link
          to="/admin/"
          className="flex flex-row gap-2 md:gap-[16px] items-center"
        >
          <RiDashboardFill className="text-[16px]" />
          <p className="font-bold text-[18px] leading-[23px] text-[#141414]">
            Admin Panel
          </p>
        </Link>
      </div>

      <div className="flex items-center gap-3 md:gap-[32px]">
        <SearchBar />

        <div className="flex gap-[6px] md:gap-[8px] items-center">
          <div className="bg-[#F2F2F2] rounded-lg p-[8px] md:p-[10px]">
            <Link to="/admin/notification">
              <RiNotification2Line className="text-[18px] md:text-[20px] text-[#141414]" />
            </Link>
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={selector.profilePic} />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="#">Profile</Link>
              </li>
              <li>
                <Link to="#">Settings</Link>
              </li>
              <li>
                <Link to="#" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            duration: 0.5,
          }}
          className="absolute top-[60px] bg-white right-0 z-50 h-[100vh] w-[50%] shadow-lg md:hidden"
        >
          <nav className="flex flex-col gap-[8px]">
            {menuItems.map((item) => (
              <Link
                onClick={() => setCurrentPage(item.name)}
                key={item.name}
                to={item.path}
                className={`flex items-center py-[8px] px-[12px] rounded-lg hover:bg-gray-100 hover:text-black transition-colors flex gap-[12px]
                  ${currentPage == item.name ? "bg-black text-white" : ""}
                `}
              >
                {item.icon}
                <span className="text-[14px] leading-[21px] font-medium">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
