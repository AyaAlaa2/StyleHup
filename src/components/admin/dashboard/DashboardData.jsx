import React from 'react'

const DashboardData = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] p-[16px] w-full">
      <div className="bg-white border border-[#DBE0E5] rounded-lg p-[24px] flex flex-col gap-[8px]">
        <h3 className="text-[#121417] font-medium text-[16px] leading-[24px]">
          Today's Visitors
        </h3>
        <p className="text-[24px] text-[#121417] leading-[30px] font-bold mt-2">
          1,234
        </p>
      </div>
      <div className="bg-white border border-[#DBE0E5] rounded-lg p-[24px] flex flex-col gap-[8px]">
        <h3 className="text-[#121417] font-medium text-[16px] leading-[24px]">
          This Month's Visitors
        </h3>
        <p className="text-[24px] text-[#121417] leading-[30px] font-bold mt-2">
          5,678
        </p>
      </div>
    </div>
  );
}

export default DashboardData
