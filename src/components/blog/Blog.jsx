import { useState, useEffect, useMemo } from "react";
import { useBlog } from "../hooks/useArticle";
import BlogCard from "./BlogCard";
import BlogCat from "./BlogCat.jsx";
import Pagination from "../Pagination.jsx";

const Blog = () => {
  const categories = ["All", "Fashion", "Lifestyle", "Trends", "Reviews"];
  const { data: Articles, isLoading, isError, error } = useBlog();
  const [categoryName, setCategoryName] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryName]);

  const filteredArticles = useMemo(() => {
    if (!Articles) return [];
    return categoryName === "All"
      ? Articles
      : Articles.filter(
          (a) => a.category.toLowerCase() === categoryName.toLowerCase()
        );
  }, [Articles, categoryName]);

  const currentArticle = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredArticles?.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

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

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-4">Blog</h2>
      <div className="min-h-[80vh]">
        <div>
          <BlogCat
            categories={categories}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
          {currentArticle.map((article) => (
            <BlogCard key={article.id} Article={article} />
          ))}
        </div>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Blog;
