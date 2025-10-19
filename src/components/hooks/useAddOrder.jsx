import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addNewOrder = async (newOrder) => {
  const res = await axios.post("http://localhost:3000/order", newOrder);
  return res.data;
};

export function useAddOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNewOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["order"]);
    },
    onError: (error) => {
      console.error("Error adding order:", error);
    },
  });
}
