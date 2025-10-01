import React from "react";
import { RiGlobalLine } from "react-icons/ri";
import { LuPhone } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";

const ContactInfo = () => {
  return (
    <div>
      <p className="font-normal text-[16px] mt-[4px] text-[#141414]">
        Visit us at our store or connect with us online. We're always happy to
        assist you.
      </p>
      <div className="flex flex-row gap-[8px] mt-[16px] items-center">
        <div className="bg-[#F2F2F2] w-[40px] h-[40px] rounded-xl gap-[16px] flex items-center justify-center">
          <IoLocationOutline className="text-[#141414] text-[22px]" />
        </div>
        <p className="text-[16px] font-normal text-[#141414]">
          123 Fashion Avenue, San Francisco, CA 94105
        </p>
      </div>
      <div className="flex flex-row gap-[8px] mt-[16px] items-center">
        <div className="bg-[#F2F2F2] w-[40px] h-[40px] rounded-xl gap-[16px] flex items-center justify-center">
          <LuPhone className="text-[#141414] text-[22px]" />
        </div>
        <p className="text-[16px] font-normal text-[#141414]">(555) 123-4567</p>
      </div>
      <div className="flex flex-row mt-[16px] items-center justify-between">
        <div className="w-[50%] flex items-center gap-[8px]">
          <div className="bg-[#F2F2F2] w-[40px] h-[40px] rounded-xl gap-[16px] flex items-center justify-center">
            <RiGlobalLine className="text-[#141414] text-[22px]" />
          </div>
          <p className="text-[16px] font-normal text-[#141414]">
            Follow us on social media
          </p>
        </div>
        <div>
          <GoArrowRight className="text-[24px]" />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
