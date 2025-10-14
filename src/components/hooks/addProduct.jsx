import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addNewProduct = async (newProduct) => {
  const res = await axios.post("http://localhost:3000/Products", newProduct);
  return res.data;
};

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNewProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["Products"]);
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });
}
