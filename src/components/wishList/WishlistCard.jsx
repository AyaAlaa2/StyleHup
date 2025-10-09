import { AiOutlineDelete } from "react-icons/ai";
export default function WishlistCard({ currentProducts, handleDelete }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {currentProducts.map((product) => (
        <div
          key={product.id}
          className="group relative block overflow-hidden rounded-lg shadow-md border border-gray-200"
        >
          <button
            onClick={() => handleDelete(product.id)}
            className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 text-gray-700 hover:bg-red-500 hover:text-white transition cursor-pointer"
          >
            <AiOutlineDelete className="w-5 h-5" />
          </button>

          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="relative border-t border-gray-100 bg-white p-4">
            <h3 className="mt-2 text-sm font-medium text-gray-900 truncate">
              {product.name}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">
              {product.description}
            </p>
            <h1 className="mt-1 text-sm font-bold text-gray-700">
              ${product.price}
            </h1>
            <button className="mt-3 block w-full rounded-sm bg-black p-2 text-sm text-white cursor-pointer font-medium transition hover:scale-105 duration-500">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
