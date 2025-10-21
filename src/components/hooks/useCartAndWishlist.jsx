import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { addToWishlist } from "../reducers/wishListReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCartAndWishlist = () => {
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        setCartCount(0);
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(userRef, (snapshot) => {
        const data = snapshot.data();
        const cart = data?.cart || [];
        setCartCount(
          cart.reduce((total, item) => total + (item.quantity || 1), 0)
        );
      });

      return () => unsubscribe();
    });

    return () => unsubscribeAuth();
  }, []);

  const requireLogin = useCallback(() => {
    if (!selector.logged) {
      toast.error("Please sign in to continue.");
      navigate("/signin");
    } else {
      setIsOpen(true);
    }
  }, [selector.logged, navigate]);

  const addProductToCart = useCallback(async (product, selectedSize) => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        toast.error("Please sign in first!");
        return;
      }

      if (!selectedSize) {
        toast.error("Please select a size first!");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userData = await getDoc(userRef);
      const cartFirebase = userData.data()?.cart || [];

      const existingIndex = cartFirebase.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );

      let updatedCart;
      if (existingIndex !== -1) {
        updatedCart = cartFirebase.map((item, i) =>
          i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [
          ...cartFirebase,
          { ...product, selectedSize, inCard: true, quantity: 1 },
        ];
      }

      await updateDoc(userRef, { cart: updatedCart });
      toast.success("Added to cart successfully!");
      setIsOpen(false);
      setLoading(false);
      setSelectedSize("");
    } catch {
      toast.error("Failed to add to cart!");
    } finally {
      setLoading(false);
    }
  }, []);

  const addProductToWishlist = useCallback(
    (product) => {
      dispatch(addToWishlist({ ...product, inWishlist: true }));
      toast.success("Added to wishlist successfully!");
    },
    [dispatch]
  );

  return {
    requireLogin,
    addProductToCart,
    addProductToWishlist,
    loading,
    isOpen,
    setIsOpen,
    selectedSize,
    setSelectedSize,
    cartCount,
  };
};
