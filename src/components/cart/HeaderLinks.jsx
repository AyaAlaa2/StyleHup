import React from "react";
import { Link } from "react-router-dom";

const HeaderLinks = () => {
  return (
    <div>
      <div className="flex gap-[8px] p-[16px]">
        <Link to="/">
          <p className="text-[#757575] font-medium text-[16px] leading-[24px] hover:underline cursor-pointer">
            Home
          </p>
        </Link>

        <p className="text-[#757575] font-medium text-[16px] leading-[24px]">
          /
        </p>

        <Link to="/cart">
          <p className="text-[#141414] font-medium text-[16px] leading-[24px] hover:underline cursor-pointer">
            Shopping Cart
          </p>
        </Link>
      </div>
    </div>
  );
};

export default HeaderLinks;
