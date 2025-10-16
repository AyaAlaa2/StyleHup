import React from "react";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const ShppingCart = ({
  cartFirebase,
  handleRemoveFromCart,
  handleAddToCart,
}) => {
  return (
    <div>
      <div className="p-[16px]">
        <p className="font-bold text-[32px] leading-[40px]">Shopping Card</p>
      </div>

      <div className="flex flex-col">
        {!cartFirebase || !cartFirebase.length ? (
          <p className="text-center text-[20px] leading-[28px] font-medium mb-[100px]">
            Your cart is empty
          </p>
        ) : (
          cartFirebase.map((item, idx) => (
            <div
              key={idx}
              className="py-[8px] px-[16px] flex justify-between items-center"
            >
              <div className="flex gap-[16px]">
                <div className="w-[56px] h-[56px] bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    loading="lazy"
                    alt="image"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-[16px] leading-[24px] font-medium text-[#141414]">
                    {item.name}
                  </p>
                  <p className="text-[14px] leading-[21px] text-[#757575]">
                    Size: {item.selectedSize}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-[2px] p-[2px]">
                <button
                  className="w-[28px] h-[28px] bg-[#F2F2F2] rounded-full flex items-center justify-center"
                  onClick={() => handleAddToCart(item)}
                >
                  <FiPlus />
                </button>
                <span>{item.quantity}</span>
                <button
                  className="w-[28px] h-[28px] bg-[#F2F2F2] rounded-full flex items-center justify-center"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  <FiMinus />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShppingCart;
