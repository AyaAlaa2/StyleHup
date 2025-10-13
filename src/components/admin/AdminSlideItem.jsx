import { GoHome } from "react-icons/go";
import { HiOutlineClipboardList } from "react-icons/hi";
import { LuChartSpline } from "react-icons/lu";
import { PiPackage, PiUsers } from "react-icons/pi";
import { GoHomeFill } from "react-icons/go";
import { BiSolidPackage } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { AiOutlineAreaChart } from "react-icons/ai";

export const menuItems = [
  {
    name: "Dashboard",
    icon: <GoHome size={24} />,
    selectedIcon: <GoHomeFill size={24} />,
    path: "/admin/dashboard",
  },
  {
    name: "Products",
    icon: <PiPackage size={24} />,
    selectedIcon: <BiSolidPackage size={24} />,
    path: "/admin/products",
  },
  {
    name: "Orders",
    icon: <HiOutlineClipboardList size={24} />,
    selectedIcon: <FaClipboardList size={24} />,
    path: "/admin/orders",
  },
  {
    name: "Customers",
    icon: <PiUsers size={24} />,
    selectedIcon: <FaUserGroup size={24} />,
    path: "/admin/customers",
  },
  {
    name: "Analytics",
    icon: <LuChartSpline size={24} />,
    selectedIcon: <AiOutlineAreaChart size={24} />,
    path: "/admin/analytics",
  },
];
