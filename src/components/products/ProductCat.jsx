import React from "react";
import { Link } from "react-router-dom";

const ProductCat = ({ categoryName, itemPage, nameOfProduct }) => {
  return (
    <div className="p-[16px]">
      <span className="hover:underline cursor-pointer text-[16px] font-medium text-[#757575]">
        <Link to="/Products/all">Shop</Link>
      </span>
      {categoryName && categoryName !== "all" && (
        <>
          <span className="mx-2 text-[#757575]">{"/"}</span>
          <span
            className={`${
              itemPage ? "text-[#757575]" : "text-[#141414]"
            } text-[16px] font-medium hover:underline cursor-pointer`}
          >
            <Link to={`/Products/${categoryName}`}>
              {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
            </Link>
          </span>
          {itemPage && (
            <>
              <span className="mx-2 text-[#757575]">{"/"}</span>
              <span className="text-[16px] font-medium text-[#141414]">
                {nameOfProduct}
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCat;
