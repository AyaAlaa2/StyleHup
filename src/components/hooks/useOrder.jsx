import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchOrder = async () => {
  const res = await axios.get("http://localhost:3000/order");
  return res.data;
};

export function useOrder() {
  return useQuery({
    queryKey: ["order"],
    queryFn: fetchOrder,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });
}
