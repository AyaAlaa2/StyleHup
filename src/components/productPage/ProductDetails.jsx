import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/cartReducer";
import { addToWishlist } from "../reducers/wishListReducer";
import toast from "react-hot-toast";
import ModalSelectSize from "./ModalSelectSize";

const ProductDetails = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleConfirmAddToCart = useCallback(() => {
    if (!selectedSize) {
      toast.error("Please Select Size First !");
      return;
    }

    dispatch(addToCart({ ...product, selectedSize }));
    toast.success("Added to cart successfully !");
    setIsOpen(false);
  }, [dispatch, product, selectedSize]);

  const handleAddToWishlist = useCallback(() => {
    dispatch(addToWishlist(product));
    toast.success("Added to wishlist successfully !");
  }, [dispatch, product]);

  return (
    <div>
      <div className="px-[16px] pt-[20px] pb-[12px]">
        <p className="font-bold text-[22px] leading-[28px]">{product.name}</p>
      </div>
      <div className="px-[16px] pt-[4px] pb-[12px]">
        <p className="font-normal text-[16px]">{product.description}</p>
      </div>
      <div className="px-[16px] pt-[16px] pb-[8px]">
        <p className="font-bold text-[18px] leading-[23px]">Details</p>
      </div>
      <div className="grid grid-cols-4 grid-row-2 p-[16px] gap-[24px]">
        <div className="border-t border-[#E5E8EB] py-[20px] flex flex-col justify-center items-start">
          <p className="text-[14px] font-normal text-[#757575]">Price</p>
          <p className="text-[14px] font-normal text-[#141414]">
            {product.price} $
          </p>
        </div>
        <div className="border-t col-span-3 border-[#E5E8EB] py-[20px] flex flex-col justify-center items-start">
          <p className="text-[14px] font-normal text-[#757575]">Material</p>
          <p className="text-[14px] font-normal text-[#141414]">
            {product.material}
          </p>
        </div>
        <div className="border-t border-[#E5E8EB] py-[20px] flex flex-col justify-center items-start">
          <p className="text-[14px] font-normal text-[#757575]">Sizes</p>
          <p className="text-[14px] font-normal text-[#141414]">
            {product.size.map((size, idx) =>
              idx === product.size.length - 1 ? size : size + " , "
            )}
          </p>
        </div>
        <div className="border-t col-span-3 border-[#E5E8EB] py-[20px] flex flex-col justify-center items-start">
          <p className="text-[14px] font-normal text-[#757575]">
            Care Instructions
          </p>
          <p className="text-[14px] font-normal text-[#141414]">
            {product.careInstructions}
          </p>
        </div>
      </div>
      <div className="px-[16px] py-[12px] flex gap-[12px] items-center justify-start">
        <button
          className="rounded-lg px-[16px] py-[10px] text-[14px] bg-black text-white cursor-pointer font-bold transition leading-[21px]"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button
          className="rounded-lg px-[16px] py-[10px] text-[14px] bg-[#F2F2F2] text-black cursor-pointer font-bold transition leading-[21px]"
          onClick={handleAddToWishlist}
        >
          Add to Wishlist
        </button>
      </div>

      {isOpen && product && (
        <ModalSelectSize
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          setIsOpen={setIsOpen}
          handleConfirmAddToCart={handleConfirmAddToCart}
        />
      )}
    </div>
  );
};

export default ProductDetails;
