import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../reducers/wishListReducer";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const handleDelete = (id) => {
    dispatch(removeFromWishlist(id));
    toast.error("product removed from wishlist");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = wishlist.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(wishlist.length / itemsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Wishlist Items</h2>
      <div className="min-h-[20vh]">
        {currentProducts.length === 0 ? (
          <p className="text-gray-600 text-center">
            No products in your wishlist.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="group relative block overflow-hidden rounded-lg shadow-md border border-gray-200"
              >
                <button
                  onClick={() => handleDelete(product.id)}
                  className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 text-gray-700 hover:bg-red-500 hover:text-white transition cursor-pointer"
                >
                  <AiOutlineDelete className="w-5 h-5" />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full aspect-square object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="relative border-t border-gray-100 bg-white p-4">
                  <h3 className="mt-2 text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <h1 className="mt-1 text-sm font-bold text-gray-700">
                    ${product.price}
                  </h1>
                  <button className="mt-3 block w-full rounded-sm bg-black p-2 text-sm text-white cursor-pointer font-medium transition hover:scale-105 duration-500">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 bottom-0">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === num
                  ? "!bg-black text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
