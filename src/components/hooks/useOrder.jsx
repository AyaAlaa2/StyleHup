import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchOrder = async () => {
  const res = await axios.get("https://api.jsonbin.io/v3/b/68f8d4b1ae596e708f23e80b/latest");
  return res.data.record.order;
};

export function useProducts() {
  return useQuery({
    queryKey: ["order"],
    queryFn: fetchOrder,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });
}
