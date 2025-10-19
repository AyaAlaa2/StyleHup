import React, { useState, useEffect, useCallback, useMemo } from "react";
import "react-phone-input-2/lib/style.css";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import CheckoutForm from "./checkoutForm";
import CheckoutCart from "./checkoutCart";

const CheckoutPage = () => {
  const [user, setUser] = useState(null);
  const [cartFirebase, setCartFirebase] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const fetchCartFromFirebase = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setCartFirebase(userSnap.data()?.cart || []);
      } else {
        setCartFirebase([]);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const total = useMemo(() => {
    const subTotal = cartFirebase.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subTotal > 0 ? 15 : 0;
    return subTotal + tax;
  }, [cartFirebase]);

  return (
    <div className="flex items-start justify-start gap-8 p-4">
      <CheckoutForm
        total={total}
        user={user}
        cartFirebase={cartFirebase}
        setCartFirebase={setCartFirebase}
      />
      <CheckoutCart
        loading={loading}
        cartFirebase={cartFirebase}
        total={total}
        fetchCartFromFirebase={fetchCartFromFirebase}
      />
    </div>
  );
};

export default CheckoutPage;
