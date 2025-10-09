import React from "react";

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  return (
    <div>
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
