import { useState } from "react";
import { Link } from "react-router-dom";
import { headerLinks, shopLinks } from "./navLinks";
import { FaCube, FaTimes } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { GoHeart, GoPerson } from "react-icons/go";
import { PiShoppingBagThin } from "react-icons/pi";
import { HiBars4 } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const closeAll = () => {
    setMenuOpen(false);
    setShopOpen(false);
  };

  return (
    <header className="navbar justify-between items-center px-4 md:px-[40px] py-[12px] shadow-sm text-black relative">
      <div className="flex items-center gap-4 md:gap-[32px]">
        <Link to="/" className="flex flex-row gap-2 md:gap-[16px] items-center">
          <FaCube className="text-[18px]" />
          <p className="font-bold text-[18px] leading-[23px] text-[#141414]">
            STYLEHUP
          </p>
        </Link>

        <div className="hidden md:flex gap-6 text-md font-semibold">
          {headerLinks.map((L, index) =>
            L.title === "Shop" ? (
              <div key={index} className="relative">
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  {L.title}
                  <HiChevronDown
                    className={`w-4 h-4 transition-transform ${
                      shopOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {shopOpen && (
                  <ul className="absolute left-0 top-full mt-1 w-48 rounded-lg shadow-lg z-50 bg-white">
                    {shopLinks.map((cat, idx) => (
                      <li key={idx}>
                        <Link
                          to={`/Products/${cat.path}`}
                          className="block px-4 py-2 text-gray-800  hover:!bg-gray-200 rounded-md"
                          onClick={() => setShopOpen(false)}
                        >
                          {cat.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link key={index} to={L.path}>
                {L.title}
              </Link>
            )
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-[32px]">
        <label className="hidden md:flex bg-[#F2F2F2] rounded-lg ps-[12px] items-center">
          <CiSearch className="text-[22px] text-[#757575]" />
          <input
            type="search"
            placeholder="Search"
            className="py-[6px] ps-[12px] pe-[8px] text-[14px] md:text-[16px] text-[#757575] focus:outline-none"
          />
        </label>

        <div className="flex gap-[6px] md:gap-[8px] items-center">
          <div className="bg-[#F2F2F2] rounded-lg p-[8px] md:p-[10px]">
            <Link to="#">
              <GoHeart className="text-[18px] md:text-[20px] text-[#141414]" />
            </Link>
          </div>
          <div className="bg-[#F2F2F2] rounded-lg p-[8px] md:p-[10px]">
            <Link to="/signin">
              <GoPerson className="text-[18px] md:text-[20px] text-[#141414]" />
            </Link>
          </div>
          <div className="bg-[#F2F2F2] rounded-lg p-[8px] md:p-[10px]">
            <Link to="#">
              <PiShoppingBagThin className="text-[18px] md:text-[20px] text-[#141414]" />
            </Link>
          </div>
        </div>

        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <div className="bg-[#F2F2F2] rounded-lg p-[8px] md:p-[10px]">
              <FaTimes className="text-[18px] md:text-[20px] text-[#141414]" />
            </div>
          ) : (
            <div className="bg-[#F2F2F2] rounded-lg p-[8px] md:p-[10px]">
              <HiBars4 className="text-[18px] md:text-[20px] text-[#141414]" />
            </div>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute z-50 top-[60px] left-0 w-full bg-white shadow-md md:hidden flex flex-col gap-2 p-4 font-semibold">
          {headerLinks.map((L, index) =>
            L.title === "Shop" ? (
              <div key={index} className="flex flex-col gap-1">
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  {L.title}
                  <HiChevronDown
                    className={`w-4 h-4 transition-transform ${
                      shopOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {shopOpen && (
                  <div className="flex flex-col ps-4 gap-1">
                    {shopLinks.map((cat, idx) => (
                      <Link
                        key={idx}
                        to={`/Prouducts/${cat.path}`}
                        onClick={closeAll}
                        className="block py-1 px-2 hover:!bg-gray-200 rounded-md"
                      >
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={index} to={L.path} onClick={closeAll} className="py-2">
                {L.title}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
