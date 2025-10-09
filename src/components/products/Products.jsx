import { useProducts } from "../hooks/useProducts";
import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import Pagination from "../Pagination.jsx";

export default function Products() {
  const { categoryName, itemPage } = useParams();
  const { data: products, isLoading, isError } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryName]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return !categoryName || categoryName === "all"
      ? products
      : products.filter((item) => item.category.toString().toLowerCase() === categoryName);
  }, [products, categoryName]);

  // Loading and Error States
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div>
      <div className="p-[16px]">
        <span className="hover:underline cursor-pointer text-[16px] font-medium text-[#757575]">
          <Link to="/Products/all">Shop</Link>
        </span>
        {categoryName && categoryName !== "all" && (
          <>
            <span className="mx-2 text-[#757575]">{"/"}</span>
            <span
              className={`${
                itemPage ? "text-[#757575]" : "text-[#141414]"
              } text-[16px] font-medium hover:underline cursor-pointer`}
            >
              <Link to={`/Products/${categoryName}`}>
                {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
              </Link>
            </span>
            {itemPage && (
              <>
                <span className="mx-2 text-[#757575]">{"/"}</span>
                <span className="text-[16px] font-medium text-[#141414]">
                  {itemPage}
                </span>
              </>
            )}
          </>
        )}
      </div>

      <Outlet />

      {!itemPage && (
        <div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 min-h-[250px]">
            {currentProducts.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            ) : (
              currentProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  categoryName={categoryName}
                  itemPage={p.name}
                />
              ))
            )}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
