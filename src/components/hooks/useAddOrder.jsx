import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BIN_ID = "68f8d4b1ae596e708f23e80b";
const MASTER_KEY = "$2a$10$9v3g5dfZQRcse0C30wx2N.K1xzs.X/v.JGWDo3fQwMDAiGegOEICm";

const addNewOrder = async (newOrder) => {
  const res = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: {
      "X-Master-Key": MASTER_KEY,
    },
  });

   const orders = res.data.record.order;
  const updatedOrders = [...orders, newOrder];
  const updateRes = await axios.put(
    `https://api.jsonbin.io/v3/b/${BIN_ID}`,
    { order: updatedOrders },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY,
      },
    }
  );

  return updateRes.data;
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
