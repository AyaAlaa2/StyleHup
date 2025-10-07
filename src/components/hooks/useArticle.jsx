import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchProducts = async () => {
  const res = await axios.get("http://localhost:3000/Articles");
  return res.data;
};

export function useBlog() {
  return useQuery({
    queryKey: ["Articles"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });
}
