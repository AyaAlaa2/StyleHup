import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProduct = async (id) => {
  const res = await axios.get(
    "https://api.jsonbin.io/v3/b/68f8b24043b1c97be977f072/latest"
  );

  const products = res.data.record.Products;
  const product = products.find((p) => p.id === String(id));
  if (!product) return;
  return product;
};

export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}
