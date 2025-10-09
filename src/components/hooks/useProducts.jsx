import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async () => {
  const res = await axios.get("http://localhost:3000/Products");
  return res.data;
};

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });
}

const fetchProductsReviews = async () => {
  const res = await axios.get("http://localhost:3000/products_reviews");
  return res.data;
};

export function useProductsReviews() {
  return useQuery({
    queryKey: ["productsReviews"],
    queryFn: fetchProductsReviews,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });
}
