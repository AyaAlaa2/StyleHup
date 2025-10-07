import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-start px-[16px] h-[495px]">
      <div className="pt-[16px] pb-[12px]">
        <p className="text-[32px] font-bold leading-[40px] text-[#141414]">
          Page Not Found
        </p>
      </div>
      <div className="pt-[4px] pb-[12px] w-[80%] text-center">
        <p className="text-[16px] font-normal leading-[24px] text-[#141414]">
          The page you are looking for does not exist or has been moved. Please
          check the URL or use the search bar below to find what you need.
        </p>
      </div>
      <div className="py-[12px] w-full">
        <label className="flex bg-[#F2F2F2] border-[#F2F2F2] items-center justify-center px-[16px]">
          <IoSearchOutline className="text-[#757575] text-[24px]" />
          <input
            type="search"
            placeholder="Search  for products"
            className="w-full rounded text-[16px] py-[12px] px-[8px] focus:outline-none text-[#757575]"
          />
        </label>
      </div>
      <div className="flex items-center justify-center px-[12px] gap-[12px] pt-[12px]">
        <button
          className="px-[48px] py-[9.5px] bg-black text-white rounded-lg font-bold text-[14px] leading-[21px] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Go To Homepage
        </button>
        <button
          className="px-[48px] py-[9.5px] bg-[#F2F2F2] text-black rounded-lg font-bold text-[14px] leading-[21px] cursor-pointer"
          onClick={() => navigate("/Products/all")}
        >
          Browse Categories
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
