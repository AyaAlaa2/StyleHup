import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[90vh] rounded-2xl overflow-hidden p-4">
      <div className="relative w-full h-full">
        <img
          src="/img/Hero.png"
          alt="Hero"
          className="w-full h-full max-h-[90vh] object-cover object-center rounded-2xl transition-all duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a90] via-[#4b4b4b70] to-[#1a1a1a90] rounded-2xl flex flex-col justify-center items-center sm:items-start text-center sm:text-left px-6 sm:px-16 md:px-24 transition-all duration-300">
          <div className="max-w-[650px]">
            <p className="text-white font-bold sm:font-extrabold text-[24px] sm:text-[42px] md:text-[50px] leading-[32px] sm:leading-[56px] md:leading-[64px] tracking-tight font-serif drop-shadow-lg">
              Step into Style
            </p>
            <p className="text-white font-light sm:font-normal text-[13px] sm:text-[16px] md:text-[18px] leading-[18px] sm:leading-[22px] mt-3 sm:mt-4 drop-shadow-md">
              Discover the latest trends and exclusive collections that define
              your unique fashion statement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
