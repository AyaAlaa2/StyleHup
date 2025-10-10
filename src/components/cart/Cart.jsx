import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeOneFromCart } from "../reducers/cartReducer";
import ShppingCart from "./ShppingCart";
import Order from "./Order";
import HeaderLinks from "./HeaderLinks";
import toast from "react-hot-toast";

const Cart = () => {
  const selector = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const handleAddToCart = useCallback(
    (item) => {
      dispatch(addToCart({ product: item, selectedSize: item.selectedSize }));
      toast.success("Added to cart successfully !");
    },
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (item) => {
      dispatch(
        removeOneFromCart({ product: item, selectedSize: item.selectedSize })
      );
      toast.error("Product removed from cart !");
    },
    [dispatch]
  );

  const { subTotal, estimatedTax, total } = useMemo(() => {
    const sub = selector.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const tax = sub > 0 ? 15 : 0;
    const tot = sub + tax;
    return { subTotal: sub, estimatedTax: tax, total: tot };
  }, [selector]);

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
