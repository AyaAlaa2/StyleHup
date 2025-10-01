import React from "react";
import HeaderOfSection from "./HeaderOfSection";

const Team = () => {
  const team = [
    { img: "/img/Team1.png", name: " Ava Harper", role: "CEO & Founder" },
    { img: "/img/Team2.png", name: " Liam Carter", role: "Head of Design" },
    {
      img: "/img/Team3.png",
      name: " Chloe Bennett",
      role: "Marketing Director",
    },
  ];
  return (
    <div>
      <HeaderOfSection title="Meet the Team" />
      <div className="p-[16px] flex flex-col sm:flex-row gap-[12px]">
        {team.map((member, index) => (
          <div
            key={index}
            className="w-full md:w-[30%] shrink-1 pb-[12px] flex flex-col gap-[12px] items-center justify-center"
          >
            <div className="w-[200px] h-[200px] lg:w-[269px] lg:h-[269px]">
              <img
                src={member.img}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="font-medium text-[16px] leading-[24px] text-[#141414]">
                {member.name}
              </p>
              <p className="font-normal text-[14px] leading-[21px] text-[#757575]">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
