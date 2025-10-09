export default function BlogCat({ categories, categoryName, setCategoryName }) {
  return (
    <div>
      {categories.map((cat, index) => (
        <button
          key={index}
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
  );
}
