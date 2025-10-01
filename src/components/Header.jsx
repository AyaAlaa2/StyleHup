import React from "react";
import { Link } from "react-router-dom";
import { headerLinks } from "./navLinks";
import { FaCube } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { PiShoppingBagThin } from "react-icons/pi";
import { GoPerson } from "react-icons/go";

const Header = () => {
  return (
    <header className="navbar justify-between items-center px-[40px] py-[12px] shadow-sm border-bottom">
      <div className="flex justify-center items-center gap-[32px]">
        <Link
          to="/"
          className="flex flex-row gap-[16px] justify-center items-center"
        >
          <FaCube className="text-[16px]" />
          <p className="font-bold text-[18px] leading-[23px] text-[#141414]">
            STYLEHUP
          </p>
        </Link>
        <div className="flex gap-10 text-md font-semibold">
          {headerLinks.map((L, index) =>
            L.title === "Shop" ? (
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} className="cursor-pointer">
                  {L.title}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <Link to="#">Male</Link>
                  </li>
                  <li>
                    <Link to="#">Female</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link key={index} to={L.path}>
                {L.title}
              </Link>
            )
          )}
        </div>
      </div>

      <div className="flex gap-[32px] items-center">
        <label className="bg-[#F2F2F2] flex flex-row gap-0 rounded-lg ps-[16px] items-center">
          <CiSearch className="text-[24px] text-[#757575]" />
          <input
            type="search"
            placeholder="Search"
            className="py-[8px] ps-[16px] pe-[8px] text-[16px] text-[#757575] focus:outline-none"
          />
        </label>

        <div className="flex gap-[8px] items-center h-full">
          <div className="bg-[#F2F2F2] rounded-lg p-[10px]">
            <Link to="#">
              <GoHeart className="text-[20px] text-[#141414]" />
            </Link>
          </div>
          <div className="bg-[#F2F2F2] rounded-lg p-[10px]">
            <Link to="#">
              <GoPerson className="text-[20px] text-[#141414]" />
            </Link>
          </div>
          <div className="bg-[#F2F2F2] rounded-lg p-[10px]">
            <Link to="#">
              <PiShoppingBagThin className="text-[20px] text-[#141414]" />
            </Link>
          </div>
        </div>
        {/* <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
