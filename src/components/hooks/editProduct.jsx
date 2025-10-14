import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function EditProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...Product }) => {
      return axios.put(`http://localhost:3000/Products/${id}`, Product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
