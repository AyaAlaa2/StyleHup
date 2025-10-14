import React, { useState, memo } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../reducers/cartReducer";
import { addToWishlist } from "../reducers/wishListReducer";
import toast from "react-hot-toast";
import ModalSelectSize from "../productPage/ModalSelectSize";

const ProductCard = ({ product, categoryName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);

  const handleAddToCart = () => {
    if (!selector.logged) {
      toast.error("Please sign in to add items to your cart.");
      navigate("/signin");
    } else {
      setIsOpen(true);
    }
  };

  const handleConfirmAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please Select size first !");
      return;
    }

    dispatch(
      addToCart({
        product: { ...product, selectedSize, inCard: true },
        selectedSize,
      })
    );
    toast.success("Added to cart successfully !");
    setIsOpen(false);
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ ...product, inWishlist: true }));
    toast.success("Added to wishlist successfully !");
  };

  return (
    <div>
      <div className="group relative block overflow-hidden">
        <button
          onClick={handleAddToWishlist}
          className="absolute end-2 top-2 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
        >
          <span className="sr-only">Wishlist</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
        <Link
          to={`/Products/${
            categoryName ? categoryName.toLowerCase() : "all"
          }/${product.name.replace(/\s+/g, "-")}-${product.id}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full aspect-square object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="relative border border-gray-100 bg-white p-4">
            <h3 className="mt-2 text-sm font-medium text-gray-900 truncate">
              {product.name}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">
              {product.description}
            </p>
            <h1 className="mt-1 text-sm font-bold text-gray-700">
              ${product.price}
            </h1>
          </div>
        </Link>
      </div>

      <button
        className="mt-3 block w-full rounded-sm !bg-black p-2 text-sm text-white cursor-pointer font-medium transition hover:scale-105 duration-500"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      {isOpen && (
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

export default memo(ProductCard);
