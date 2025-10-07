import React from "react";

const Order = ({ total, subTotal, estimatedTax }) => {
  return (
    <div>
      <div className="p-[16px]">
        <p className="font-bold text-[18px] leading-[23px]">Order Summary</p>
      </div>

      <div className="p-[16px] flex flex-col">
        <div className="flex justify-between items-center py-[8px]">
          <p className="text-[14px] leading-[21px] text-[#757575]">Subtotal</p>
          <p className="text-[14px] leading-[21px] text-[#141414]">
            ${subTotal}
          </p>
        </div>
        <div className="flex justify-between items-center py-[8px]">
          <p className="text-[14px] leading-[21px] text-[#757575]">Shipping</p>
          <p className="text-[14px] leading-[21px] text-[#141414]">FREE</p>
        </div>
        <div className="flex justify-between items-center py-[8px]">
          <p className="text-[14px] leading-[21px] text-[#757575]">
            Estimated Tax
          </p>
          <p className="text-[14px] leading-[21px] text-[#141414]">
            ${estimatedTax}
          </p>
        </div>
      </div>

      <div className="p-[16px]">
        <div className="flex justify-between items-center">
          <p className="text-[14px] leading-[21px] text-[#757575]">Total</p>
          <p className="text-[14px] leading-[21px] text-[#141414]">${total}</p>
        </div>
      </div>

      <div className="py-[12px] px-[16px]">
        <button className="px-[20px] h-[48px] rounded-lg bg-black text-white w-full md:w-[480px] text-[16px] font-bold leading-[24px]">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Order;
