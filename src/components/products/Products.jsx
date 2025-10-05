import { useProducts } from "../hooks/useProducts";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export default function Products() {
  const { categoryName } = useParams();
  const { data: products, isLoading, isError } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryName]);

  if (isLoading)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <span className="loading loading-spinner loading-xl "></span>
      </div>
    );
  if (isError)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <p className="text-center text-3xl">Oops ! An Error Occured</p>
      </div>
    );

  const filteredProducts =
    categoryName && categoryName === "all"
      ? products
      : products.filter((item) => item.category === categoryName);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div>
      <div className=" text-gray-600 text-md my-10">
        <span className="hover:underline cursor-pointer">
          <Link to="/Prouducts/All">Shop</Link>
        </span>
        {categoryName && categoryName !== "all" && (
          <>
            <span className="mx-2">{"/ "}</span>
            <span className="font-semibold">{categoryName}</span>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 min-h-[250px]">
        {currentProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        ) : (
          currentProducts.map((p) => <ProductCard key={p.id} product={p} />)
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
