import React from "react";
import { motion } from "motion/react";

const HomeComponent = ({ title, products }) => {
  return (
    <div className="mb-[20px]">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
          type: "spring",
          ease: "easeOut",
          stiffness: 100,
        }}
        className="px-[16px] pb-[12px]"
      >
        <p className="font-bold text-[22px] capitalize">{title}</p>
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
        }}
        className="ps-[16px] pt-[16px] grid grid-cols-2 lg:grid-cols-4 gap-[12px]"
      >
        {products.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl h-[400px] flex flex-col gap-[16px]"
          >
            <div className="w-full h-[320px]">
              <img
                src={item.img}
                className="rounded-xl h-[320px] w-full"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-medium text-[16px] text-[#141414]">
                {item.name}
              </p>
              <p className="font-normal text-[14px] text-[#757575]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomeComponent;
