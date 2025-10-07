import { useState } from "react";
import { useBlog } from "../hooks/useArticle";
import BlogCard from "./BlogCard";
export default function Blog() {
  //Fetch Articles
  const { data: Articles, isLoading, isError, error } = useBlog();
  const [categoryName, setCategoryName] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-xl  text-center"></span>
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-xl">Error: {error.message} </p>
      </div>
    );

  const categories = ["All", "Fashion", "Lifestyle", "Trends", "Reviews"];
  const filteredArticles =
    categoryName === "All"
      ? Articles
      : Articles.filter((a) => a.category === categoryName);

  const itemsPerPage = 15;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticle = filteredArticles.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-4">Blog</h2>
      <div className="min-h-[80vh]">
        <div className="flex gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryName(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                categoryName === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
          {currentArticle.map((a) => (
            <BlogCard Article={a} />
          ))}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 bottom-0">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === num
                  ? "!bg-black text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
