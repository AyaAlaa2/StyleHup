import React from "react";
import HeaderOfSection from "./HeaderOfSection";

const ContactUs = () => {
  return (
    <div>
      <HeaderOfSection title="Contact Us" />
      <div className="px-[16px] pt-[4px] pb-[12px]">
        <p className="text-[16px] font-normal leading-[24px] text-[#141414]">
          If you have any questions or would like to learn more about StyleHub,
          please don't hesitate to reach out. You can contact us via email at
          support@stylehub.com or call us at (555) 123-4567. We're always happy
          to help!
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
