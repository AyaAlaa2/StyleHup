import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeOneFromCart } from "../reducers/cartReducer";
import ShppingCart from "./ShppingCart";
import Order from "./Order";

const Cart = () => {
  const selector = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  const handleRemoveFromCart = (item) => {
    dispatch(removeOneFromCart(item));
  };
  const subTotal = selector.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const estimatedTax = subTotal > 0 ? 15 : 0;
  const total = subTotal + estimatedTax;

  return (
    <div>
      <div className="flex gap-[8px] p-[16px]">
        <Link to="/">
          <p className="text-[#757575] fonr-medium text-[16px] leading-[24px] hover:underline cursor-pointer">
            Home
          </p>
        </Link>

        <p className="text-[#757575] fonr-medium text-[16px] leading-[24px]">
          /
        </p>

        <Link to="/cart">
          <p className="text-[#141414] fonr-medium text-[16px] leading-[24px] hover:underline cursor-pointer">
            Shopping Cart
          </p>
        </Link>
      </div>
      <ShppingCart
        selector={selector}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <Order total={total} subTotal={subTotal} estimatedTax={estimatedTax} />
      <div className="py-[12px] px-[16px]">
        <button className="px-[20px] h-[48px] rounded-lg bg-black text-white w-[480px] text-[16px] font-bold leading-[24px]">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
