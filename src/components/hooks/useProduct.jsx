import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProduct = async (id) => {
  const res = await axios.get(`http://localhost:3000/Products/${id}`);
  return res.data;
};

export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}
