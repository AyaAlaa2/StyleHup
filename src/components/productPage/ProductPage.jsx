import { useLocation } from "react-router-dom";

import { useProductsReviews } from "../hooks/useProducts";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";

const ProductPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const { data: productsReviews, isLoading, isError } = useProductsReviews();

  const currentReview =
    productsReviews?.find((review) => review.id === product?.id)?.reviews || [];

  if (isLoading)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <span className="loading loading-spinner loading-xl "></span>
      </div>
    );
  if (isError)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <p className="text-center text-3xl">Oops ! An Error Occured</p>
      </div>
    );

  return (
    <div>
      <ProductImage productImage={product.image} productName={product.name} />
      <ProductDetails product={product} />
      <ProductReviews product={product} currentReview={currentReview} />
    </div>
  );
};

export default ProductPage;
