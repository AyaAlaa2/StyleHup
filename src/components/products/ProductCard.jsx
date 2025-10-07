import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/cartReducer";

export default function ProductCard({ product, categoryName, itemPage }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <Link
        to={`/Products/${categoryName}/${itemPage}`}
        state={{ product }}
        className="group relative block overflow-hidden"
      >
        <button className="absolute end-2 top-2 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
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
      <button
        className="mt-3 block w-full rounded-sm !bg-black p-2 text-sm text-white cursor-pointer font-medium transition hover:scale-105 duration-500"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
