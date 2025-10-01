import React from "react";

const HeaderOfSection = ({ title }) => {
  return (
    <div className="px-[16px] pt-[20px] pb-[12px]">
      <p className="text-[22px] font-bold leading-[28px] text-[#141414]">
        {title}
      </p>
    </div>
  );
};

export default HeaderOfSection;
