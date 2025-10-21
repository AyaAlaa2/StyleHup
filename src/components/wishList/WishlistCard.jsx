import { AiOutlineDelete } from "react-icons/ai";
import { useCartAndWishlist } from "../hooks/useCartAndWishlist";
import { Link } from "react-router-dom";
import ModalSelectSize from "../productPage/ModalSelectSize";

export default function WishlistCard({ product, handleDelete }) {
  const {
    requireLogin,
    addProductToCart,
    loading,
    isOpen,
    setIsOpen,
    selectedSize,
    setSelectedSize,
  } = useCartAndWishlist();
  return (
    <div>
      <div className="group relative block overflow-hidden border border-gray-100 pb-3">
        <button
          onClick={() => handleDelete(product.id)}
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 text-gray-700 hover:bg-red-500 hover:text-white transition cursor-pointer"
        >
          <AiOutlineDelete className="w-5 h-5" />
        </button>

        <Link
          to={`/Products/${
            product.category ? product.category.toLowerCase() : "all"
          }/${product.name.replace(/\s+/g, "-")}-${product.id}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full aspect-square object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="relative bg-white p-4">
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
        <div className="px-3">
          <button
            className="mt-3 block w-full rounded-sm !bg-black p-2 text-sm text-white cursor-pointer font-medium transition hover:scale-105 duration-500"
            onClick={() => requireLogin(() => setIsOpen(true))}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {isOpen && (
        <ModalSelectSize
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          setIsOpen={setIsOpen}
          handleConfirmAddToCart={() => addProductToCart(product, selectedSize)}
          loading={loading}
        />
      )}
    </div>
  );
}
