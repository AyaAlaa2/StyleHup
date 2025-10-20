import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useProductsReviews } from "../hooks//useProductReview";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";

const ProductPage = () => {
  const { itemPage } = useParams();
  const id = Number(itemPage.split("-").pop());

  const {
    data: productsReviews,
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
  } = useProductsReviews();

  const { data: product, isLoading, isError } = useProduct(id);

  const currentReview = useMemo(() => {
    return (
      productsReviews?.find((review) => review.id === product?.id)?.reviews ||
      []
    );
  }, [productsReviews, product]);

  if (isLoading || isLoadingReviews)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <span className="loading loading-spinner loading-xl "></span>
      </div>
    );
  if (isError || isErrorReviews)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <p className="text-center text-3xl">Oops ! An Error Occured</p>
      </div>
    );

  return (
    <div key={product.id}>
      <ProductImage productImage={product.image} productName={product.name} />
      <ProductDetails product={product} />
      <ProductReviews product={product} currentReview={currentReview} />
    </div>
  );
};

export default ProductPage;
