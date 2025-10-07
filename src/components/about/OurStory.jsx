import React from "react";
import HeaderOfSection from "./HeaderOfSection";

const OurStory = () => {
  return (
    <div>
      <HeaderOfSection title="Our Story" />
      <div className="px-[16px] pt-[4px] pb-[12px]">
        <p className="text-[16px] font-normal leading-[24px] text-[#141414]">
          StyleHub was founded in 2010 with a vision to revolutionize the
          fashion industry by offering high-quality, stylish clothing at
          accessible prices. Our journey began in a small workshop in Brooklyn,
          where a team of passionate designers and artisans crafted unique
          pieces that quickly gained popularity. Over the years, we've grown
          into a global brand, but our commitment to quality, innovation, and
          customer satisfaction remains unchanged.
        </p>
      </div>
      <div className="p-[16px] w-full flex items-center h-[619px]">
        <img
          src="/img/About.png"
          className="w-full rounded-lg h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default OurStory;
