import React from "react";
import DashboardData from "./DashboardData";
import AddProduct from "./AddProduct";

const Dashboard = () => {
  return (
    <div>
      <div className="p-[16px]">
        <p className="font-bold text-[32px] leading-[40px]">Dashboard</p>
      </div>
      <DashboardData />
      <AddProduct />
    </div>
  );
};

export default Dashboard;
