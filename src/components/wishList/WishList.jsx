import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../reducers/wishListReducer";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import Pagination from "../Pagination.jsx";
import WishlistCard from "./WishlistCard.jsx";
export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const handleDelete = useCallback(
    (id) => {
      dispatch(removeFromWishlist(id));
      toast.error("product removed from wishlist");
    },
    [dispatch]
  );
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 min-h-[30vh]">
        {currentProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products in your wishlist.
          </p>
        ) : (
          currentProducts.map((p) => (
            <WishlistCard key={p.id} product={p} handleDelete={handleDelete} />
          ))
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
