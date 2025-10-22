import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async () => {
  const res = await axios.get("https://api.jsonbin.io/v3/b/68f8b24043b1c97be977f072/latest");
  return res.data.record.Products;
};

export function useProducts() {
  return useQuery({
    queryKey: ["Products"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });
}
