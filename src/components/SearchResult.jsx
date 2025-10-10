import { useParams } from "react-router-dom";
import { useProducts } from "./hooks/useProducts";
import ProductCard from "./products/ProductCard";
import { useState } from "react";
import Pagination from "./Pagination.jsx";

const SearchResult = () => {
  const { query } = useParams();
  const { data: products, isLoading, isError } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  if (isLoading)
    return (
      <div className="min-h-[200px] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-[200px] flex justify-center items-center text-2xl">
        <p>Oops! Something went wrong.</p>
      </div>
    );

  if (!query) {
    return (
      <p className="text-center text-gray-500 text-lg mt-8">
        Please enter a search term.
      </p>
    );
  }

  const normalizedQuery = query.toLowerCase();
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(normalizedQuery) ||
      p.category.toLowerCase().includes(normalizedQuery)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="py-10">
      <h2 className="text-2xl font-semibold mb-6 ">
        Search results for: <span className="text-red-500">{query}</span>
      </h2>

      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 min-h-[250px]">
          {currentProducts.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-8">
          No matching results found.
        </p>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default SearchResult;
