import React, { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { HiChevronDown } from "react-icons/hi";
import Deletep from "../../hooks/deleteProduct";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProductEditDelete = () => {
  const navigate = useNavigate();
  const { data: products, isLoading, isError } = useProducts();
  const [categorySelected, setCategorySelected] = useState("All");
  const [catOpen, setCatOpen] = useState(false);

  const [priceRangeSelected, setPriceRangeSelected] = useState("All");
  const [priceOpen, setPriceOpen] = useState(false);

  const Categorys = ["All", "Men", "Women", "Kids", "Accessories"];
  const PriceRanges = ["All", "$0-50", "$50-100", "$100-200", "$200+"];
  const Delete = Deletep();
  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Delete.mutate(id);
        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };
  const handleCategoryChange = (category) => {
    setCategorySelected(category);
    setCatOpen(false);
  };

  const handlePriceChange = (range) => {
    setPriceRangeSelected(range);
    setPriceOpen(false);
  };

  if (isLoading)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <p className="text-center text-3xl">Oops! An Error Occurred</p>
      </div>
    );

  let filteredProducts =
    categorySelected === "All"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === categorySelected.toLowerCase()
        );

  filteredProducts = filteredProducts.filter((product) => {
    if (priceRangeSelected === "All") return true;

    const price = parseInt(product.price);
    if (priceRangeSelected === "$0-50") return price >= 0 && price <= 50;
    if (priceRangeSelected === "$50-100") return price > 50 && price <= 100;
    if (priceRangeSelected === "$100-200") return price > 100 && price <= 200;
    if (priceRangeSelected === "$200+") return price > 200;
  });

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
            {priceRangeSelected === "All" ? "Price " : priceRangeSelected}{" "}
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
              <th>Id</th>
              <th>Product Name</th>
              <th>Image</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product.id}>
                  <th>{index + 1}</th>
                  <td>{product.name}</td>
                  <td>
                    <img
                      className="w-10 h-10 rounded-full object-cover"
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
                            `/Products/${
                              product.category
                                ? product.category.toLowerCase()
                                : "all"
                            }/${product.name.replace(/\s+/g, "-")}-${
                              product.id
                            }/edit`
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
};
export default ProductEditDelete;
