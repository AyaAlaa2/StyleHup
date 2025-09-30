import React from "react";

const Hero = () => {
  return (
    <div className="w-[100%] h-[80vh] rounded-2xl overflow-hidden p-[16px]">
      <div className="w-[100%] h-[100%] bg-[url(/img/Hero.png)] bg-no-repeat bg-center bg-cover rounded-xl">
        <div className="relative w-full rounded-2xl h-full bg-black/30">
          <div className="absolute bottom-[30px] start-[30%]">
            <p className="text-white font-extrabold text-[48px] tracking-[-2px] leading-[60px]">
              Step into Style
            </p>
            <p className="font-normal text-[16px] leading-[16px] mt-[8px] text-white">
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
