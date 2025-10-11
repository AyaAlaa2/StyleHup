import { useState } from "react";
import { Link } from "react-router-dom";
import { headerLinks } from "./navLinks";
import { FaCube, FaBars, FaTimes } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { GoHeart, GoPerson } from "react-icons/go";
import { PiShoppingBagThin } from "react-icons/pi";
import { HiChevronDown } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { logout } from "./reducers/loggedReducer";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopLink = ["All", "Men", "Women", "Kids", "Accessories"];
  const selector = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const closeAll = () => {
    setMenuOpen(false);
    setShopOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
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
                  <ul className="absolute bg-white left-0 top-full mt-1 w-48 rounded-lg shadow-lg z-50">
                    {shopLink.map((cat, idx) => (
                      <li key={idx}>
                        <Link
                          to={`/Products/${cat.toString().toLowerCase()}`}
                          className="block px-4 py-2 text-gray-800  hover:!bg-gray-200 rounded-md"
                          onClick={() => setShopOpen(false)}
                        >
                          {cat}
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
        <SearchBar />

        <div className="flex gap-[6px] md:gap-[8px] items-center">
          <div className="bg-[#F2F2F2] rounded-lg p-[8px] md:p-[10px]">
            <Link to="/wishList">
              <GoHeart className="text-[18px] md:text-[20px] text-[#141414]" />
            </Link>
          </div>

          <div className="bg-[#F2F2F2] rounded-lg p-[8px] md:p-[10px]">
            <Link to="/cart">
              <PiShoppingBagThin className="text-[18px] md:text-[20px] text-[#141414]" />
            </Link>
          </div>
          <div>
            {!selector.uid ? (
              <div className="bg-[#F2F2F2] rounded-lg p-[8px] md:p-[10px]">
                <Link to="/signin">
                  <GoPerson className="text-[18px] md:text-[20px] text-[#141414]" />
                </Link>
              </div>
            ) : (
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
            )}
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
                    {["All", "Men", "Woman", "Kids", "Accessories"].map(
                      (cat, idx) => (
                        <Link
                          key={idx}
                          to={`/Products/${cat.toString().toLowerCase()}`}
                          onClick={closeAll}
                          className="block py-1 px-2 hover:!bg-gray-200 rounded-md"
                        >
                          {cat}
                        </Link>
                      )
                    )}
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
