import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../reducers/wishListReducer";
import toast from "react-hot-toast";
import { useState } from "react";
import Pagination from "../Pagination.jsx";
import WishlistCard from "./WishlistCard.jsx";
export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const handleDelete = (id) => {
    dispatch(removeFromWishlist(id));
    toast.error("product removed from wishlist");
  };
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = wishlist.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Wishlist Items</h2>
      <div className="min-h-[80vh]">
        {currentProducts.length === 0 ? (
          <p className="text-gray-600 text-center">
            No products in your wishlist.
          </p>
        ) : (
          <div>
            <WishlistCard
              currentProducts={currentProducts}
              handleDelete={handleDelete}
            />
          </div>
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
