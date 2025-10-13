import AdminSidebar from "../admin/AdminSidebar";
import Header from "../admin/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="flex items-start justify-start gap-[4px] min-h-screen px-[24px] py-[20px]">
        <AdminSidebar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default MainLayout;
