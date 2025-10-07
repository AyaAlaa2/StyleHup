import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeOneFromCart } from "../reducers/cartReducer";
import ShppingCart from "./ShppingCart";
import Order from "./Order";
import HeaderLinks from "./HeaderLinks";

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
      <HeaderLinks />
      <ShppingCart
        selector={selector}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <Order total={total} subTotal={subTotal} estimatedTax={estimatedTax} />
    </div>
  );
};

export default Cart;
