import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiNotification2Line } from "react-icons/ri";
import { RiDashboardFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/loggedReducer";
import { menuItems } from "./AdminSlideItem";
import { motion } from "motion/react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { persistor } from "../store/store";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useOrder } from "../hooks/useOrder";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const selector = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: orders, isLoading } = useOrder();
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [numOfNewNotifications, setNumOfNewNotifications] = useState(0);
  const prevOrdersCount = useRef(0);

  useEffect(() => {
    if (!isLoading && orders) {
      if (orders.length > prevOrdersCount.current) {
        const newOrders = orders.slice(prevOrdersCount.current);
        setNumOfNewNotifications(newOrders.length);
        const newNotifications = newOrders.map((order) => ({
          id: order.id,
          text: `New order received: ${order.firstName} ${order.lastName}`,
          time: new Date(order.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setNotifications((prev) => [...newNotifications, ...prev]);
        prevOrdersCount.current = orders.length;
      } else {
        prevOrdersCount.current = orders.length;
      }
    }
  }, [orders, isLoading]);

  const handleLogout = () => {
    Swal.fire({
      title: "You are about to log out",
      text: "Are you sure you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#c1c1c1ff",
      confirmButtonText: "Log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        persistor.purge();
        signOut(auth);
        navigate("/signin");
        toast.success("Logged out successfully!");
      }
    });
  };

  const handleNotificationsOpen = () => {
    setNumOfNewNotifications(0);
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
        <div className="flex gap-[6px] md:gap-[8px] items-center">
          <div className="dropdown dropdown-end">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                handleNotificationsOpen();
              }}
              className="relative btn btn-ghost avatar bg-[#F2F2F2] rounded-lg p-[8px] md:p-[10px]"
            >
              <RiNotification2Line className="text-[18px] md:text-[20px] text-[#141414]" />
              {numOfNewNotifications > 0 && (
                <div className="absolute top-[-5px] right-[-5px] bg-red-600 w-[15px] h-[15px] rounded-full"></div>
              )}
            </button>

            {isNotificationsOpen && (
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-80 p-2 shadow">
                {notifications && notifications.length > 0 ? (
                  notifications.map((noti, index) => (
                    <li
                      className={`p-1 ${
                        index === notifications.length - 1
                          ? ""
                          : "border-b-1 border-gray-200 rounded-lg "
                      }`}
                      key={index}
                    >
                      <div className="flex flex-col gap-[8px] justify-start items-start">
                        <p>{noti.text}</p>
                        <p className="text-gray-400">{noti.time}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="px-3 py-3 text-gray-400 text-center">
                    There is no new Notification
                  </p>
                )}
              </ul>
            )}
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
