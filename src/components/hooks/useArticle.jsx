import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchArticles = async () => {
  const res = await axios.get(`https://api.jsonbin.io/v3/b/68f8ce7f43b1c97be9781f17/latest`);
  return res.data.record.Articles;
};

export function useBlog() {
  return useQuery({
    queryKey: ["Articles"],
    queryFn: fetchArticles,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });
}

