import { Link } from "react-router-dom";
export default function ProductCat({ categoryName }) {
  return (
    <div>
      <span className="hover:underline cursor-pointer">
        <Link to="/Prouducts/All">Shop</Link>
      </span>
      {categoryName && categoryName !== "All" && (
        <>
          <span className="mx-2">{"/ "}</span>
          <span className="font-semibold">{categoryName}</span>
        </>
      )}
    </div>
  );
}
