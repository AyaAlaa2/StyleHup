import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async () => {
  const res = await axios.get("http://localhost:3000/Products");
  return res.data;
};

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });
}

const fetchProduct = async (id) => {
  const res = await axios.get(`http://localhost:3000/Products/${id}`);
  return res.data;
};

export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}

const fetchProductsReviews = async () => {
  const res = await axios.get("http://localhost:3000/products_reviews");
  return res.data;
};

export function useProductsReviews() {
  return useQuery({
    queryKey: ["productsReviews"],
    queryFn: fetchProductsReviews,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });
}

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
