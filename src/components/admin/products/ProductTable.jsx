import { HiChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function ProductTable({
  filteredProducts,
  categorySelected,
  catOpen,
  setCatOpen,
  Categorys,
  handleCategoryChange,
  priceRangeSelected,
  priceOpen,
  setPriceOpen,
  PriceRanges,
  handlePriceChange,
  handelDelete,
}) {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      <div className="flex gap-4 mb-4">
        <div className="relative">
          <button
            className="bg-gray-100 rounded-full px-4 py-2 font-semibold"
            onClick={() => setCatOpen(!catOpen)}
          >
            {categorySelected === "All" ? "Category" : categorySelected}{" "}
            <HiChevronDown
              className={`w-4 h-4 inline transition-transform ${
                catOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {catOpen && (
            <ul className="absolute bg-white left-0 mt-1 w-48 rounded-lg shadow-lg z-50">
              {Categorys.map((cat, idx) => (
                <li key={idx}>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <button
            className="bg-gray-100 rounded-full px-4 py-2 font-semibold"
            onClick={() => setPriceOpen(!priceOpen)}
          >
            {priceRangeSelected === "All" ? "Price " : priceRangeSelected}
            <HiChevronDown
              className={`w-4 h-4 inline transition-transform ${
                priceOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {priceOpen && (
            <ul className="absolute bg-white left-0 mt-1 w-48 rounded-lg shadow-lg z-50">
              {PriceRanges.map((range, idx) => (
                <li key={idx}>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
                    onClick={() => handlePriceChange(range)}
                  >
                    {range}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Image</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      loading="lazy"
                      src={product.image}
                      alt={product.name}
                    />
                  </td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>
                    <div>
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/products/${product.name.replace(
                              /\s+/g,
                              "-"
                            )}-${product.id}/edit`
                          )
                        }
                        className="hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <span className="mx-2"> / </span>
                      <button
                        onClick={() => handelDelete(product.id)}
                        className="hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
