import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="flex items-start justify-center min-h-[50vh]">
        <div className="container lg:w-[85%] p-[20px] pb-[0]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default MainLayout;
