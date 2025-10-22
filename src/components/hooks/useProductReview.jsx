import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProductsReviews = async () => {
  const res = await axios.get("https://api.jsonbin.io/v3/b/68f8d3e3d0ea881f40b3218c/latest");
  return res.data.record.products_reviews;
};

export function useProductsReviews() {
  return useQuery({
    queryKey: ["productsReviews"],
    queryFn: fetchProductsReviews,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });
}
