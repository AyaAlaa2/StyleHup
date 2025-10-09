import { memo } from "react";

const BlogCard = ({ Article }) => {
  return (
    <div
      key={Article.id}
      className=" overflow-hidden shadow hover:shadow-lg transition"
    >
      <img
        src={Article.image}
        alt={Article.title}
        loading="lazy"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{Article.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{Article.description}</p>
        <p className="text-xs text-gray-400">
          {Article.author} • {Article.date}
        </p>
      </div>
    </div>
  );
};

export default memo(BlogCard);
