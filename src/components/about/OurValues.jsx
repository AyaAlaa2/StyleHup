import React from "react";
import HeaderOfSection from "./HeaderOfSection";
import { GoHeart } from "react-icons/go";
import { GoPeople } from "react-icons/go";
import { RiLeafLine } from "react-icons/ri";

const OurValues = () => {
  const values = [
    {
      icon: <GoHeart className="text-[24px] text-[#141414]" />,
      name: "Quality",
      desc: "We are committed to using the finest materials and craftsmanship to ensure our products meet the highest standards.",
    },
    {
      icon: <GoPeople className="text-[24px] text-[#141414]" />,
      name: "Customer-Centric",
      desc: "Our customers are at the heart of everything we do. We strive to provide exceptional service and build lasting relationships.",
    },
    {
      icon: <RiLeafLine className="text-[24px] text-[#141414]" />,
      name: "Sustainability",
      desc: "We are dedicated to minimizing our environmental impact by adopting sustainable practices and promoting ethical sourcing.",
    },
  ];
  return (
    <div>
      <HeaderOfSection title="Our Values " />
      <div className="p-[16px] flex flex-col sm:flex-row gap-[12px]">
        {values.map((val, index) => (
          <div
            key={index}
            className="w-full md:w-[30%] shrink-1 p-[16px] flex flex-col gap-[12px] border border-[#E0E0E0] rounded-lg items-start justify-center"
          >
            {val.icon}
            <div className="flex flex-col gap-[4px]">
              <p className="font-bold text-[16px] leading-[20px] text-[#141414]">
                {val.name}
              </p>
              <p className="font-normal text-[14px] leading-[21px] text-[#757575]">
                {val.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurValues;
