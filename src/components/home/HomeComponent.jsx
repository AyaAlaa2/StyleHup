import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

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
          <Link
            to={`/Products/all/${item.name.replace(/\s+/g, "-")}-${item.id}`}
            key={idx}
          >
            <div className="rounded-xl min-h-[400px] flex flex-col gap-[16px] hover:scale-102 duration-500 hover:shadow-lg cursor-pointer p-2">
              <div className="w-full h-[320px]">
                <img
                  src={item.image}
                  className="rounded-xl h-[320px] w-full"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <p className="font-medium text-[16px] text-[#141414]">
                  {item.name}
                </p>
                <p className="font-normal text-[14px] text-[#757575]">
                  {item.description.slice(0, 30)} ...
                </p>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default HomeComponent;
