import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BIN_ID = "68f8b24043b1c97be977f072";
const MASTER_KEY = "$2a$10$9v3g5dfZQRcse0C30wx2N.K1xzs.X/v.JGWDo3fQwMDAiGegOEICm";

const deleteProduct = async (id) => {
  const res = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: {
      "X-Master-Key": MASTER_KEY,
    },
  });

  const products = res.data.record.Products;
  const updatedProducts = products.filter((p) => p.id !== String(id));
  const updateRes = await axios.put(
    `https://api.jsonbin.io/v3/b/${BIN_ID}`,
    { Products: updatedProducts },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY,
      },
    }
  );

  return updateRes.data;
};

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["Products"]);
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
}
