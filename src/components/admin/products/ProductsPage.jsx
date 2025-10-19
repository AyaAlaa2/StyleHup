import React, { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import Deletep from "../../hooks/deleteProduct";
import Swal from "sweetalert2";
import ProductTable from "./ProductTable";
import toast from "react-hot-toast";

const ProductEditDelete = () => {
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
        toast.success("itProduct deleted successfully");
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

    const price = parseFloat(product.price);
    if (priceRangeSelected === "$0-50") return price >= 0 && price <= 50;
    if (priceRangeSelected === "$50-100") return price > 50 && price <= 100;
    if (priceRangeSelected === "$100-200") return price > 100 && price <= 200;
    if (priceRangeSelected === "$200+") return price > 200;
  });

  return (
    <div>
      <ProductTable
        setCatOpen={setCatOpen}
        setPriceOpen={setPriceOpen}
        catOpen={catOpen}
        categorySelected={categorySelected}
        handleCategoryChange={handleCategoryChange}
        Categorys={Categorys}
        priceOpen={priceOpen}
        priceRangeSelected={priceRangeSelected}
        handlePriceChange={handlePriceChange}
        PriceRanges={PriceRanges}
        filteredProducts={filteredProducts}
        handelDelete={handelDelete}
      />
    </div>
  );
};
export default ProductEditDelete;
