import React, { useCallback, useEffect, useMemo, useState } from "react";
import ShppingCart from "./ShppingCart";
import Order from "./Order";
import HeaderLinks from "./HeaderLinks";
import toast from "react-hot-toast";
import { auth, db } from "../firebase/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Cart = () => {
  const [user, setUser] = useState(null);
  const [cartFirebase, setCartFirebase] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const fetchCartFromFirebase = useCallback(async () => {
    try {
      if (!user) {
        setCartFirebase([]);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setCartFirebase(userSnap.data().cart || []);
      } else {
        setCartFirebase([]);
      }
    } catch {
      console.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCartFromFirebase();
    } else {
      setCartFirebase([]);
    }
  }, [user, fetchCartFromFirebase]);

  const updateCartInFirebase = useCallback(
    async (updatedCart) => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { cart: updatedCart });
      setCartFirebase(updatedCart);
    },
    [user]
  );

  const handleAddToCart = useCallback(
    async (item) => {
      if (!user) {
        toast.error("Please login to add items to your cart!");
        return;
      }

      const existingIndex = cartFirebase.findIndex(
        (cartItem) =>
          cartItem.id === item.id && cartItem.selectedSize === item.selectedSize
      );

      let updatedCart;
      if (existingIndex !== -1) {
        updatedCart = cartFirebase.map((cartItem, index) =>
          index === existingIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCart = [
          ...cartFirebase,
          {
            ...item,
            selectedSize: item.selectedSize,
            inCard: true,
            quantity: 1,
          },
        ];
      }

      await updateCartInFirebase(updatedCart);
      toast.success("Added to cart successfully!");
    },
    [cartFirebase, updateCartInFirebase, user]
  );

  const handleRemoveFromCart = useCallback(
    async (item) => {
      if (!user) {
        toast.error("Please login first!");
        return;
      }

      const existingIndex = cartFirebase.findIndex(
        (cartItem) =>
          cartItem.id === item.id && cartItem.selectedSize === item.selectedSize
      );

      if (existingIndex === -1) return;

      const existingItem = cartFirebase[existingIndex];
      let updatedCart;

      if (existingItem.quantity > 1) {
        updatedCart = cartFirebase.map((cartItem, index) =>
          index === existingIndex
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        updatedCart = cartFirebase.filter(
          (cartItem) =>
            !(
              cartItem.id === item.id &&
              cartItem.selectedSize === item.selectedSize
            )
        );
      }

      await updateCartInFirebase(updatedCart);
      toast.error("Product removed from cart!");
    },
    [cartFirebase, updateCartInFirebase, user]
  );

  const { subTotal, estimatedTax, total } = useMemo(() => {
    const sub = (cartFirebase || []).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const tax = sub > 0 ? 15 : 0;
    const tot = sub + tax;
    return { subTotal: sub, estimatedTax: tax, total: tot };
  }, [cartFirebase]);

  if (loading)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <span className="loading loading-spinner loading-xl "></span>
      </div>
    );

  if (!user)
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold text-gray-700">
          Please log in to view your cart
        </h2>
      </div>
    );

  if (user && cartFirebase.length === 0)
    return (
      <div className="text-center mt-20">
        <HeaderLinks />
        <h2 className="text-xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
      </div>
    );

  return (
    <div>
      <HeaderLinks />
      <ShppingCart
        cartFirebase={cartFirebase}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <Order
        cartFirebase={cartFirebase}
        total={total}
        subTotal={subTotal}
        estimatedTax={estimatedTax}
      />
    </div>
  );
};

export default Cart;
