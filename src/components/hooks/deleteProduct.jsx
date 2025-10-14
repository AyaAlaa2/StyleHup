import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function Deletep() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/Products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
