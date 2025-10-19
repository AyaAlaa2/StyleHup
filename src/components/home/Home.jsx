import React, { memo, useCallback, useEffect, useState } from "react";
import Hero from "./Hero";
import HomeComponent from "./HomeComponent";
import { useProducts } from "../hooks/useProducts";

const Home = () => {
  const { data: product, isLoading, isError } = useProducts();
  const [newArrivalProduct, setNewArrivalProduct] = useState([]);
  const [bestSellersProduct, setBestSellersProduct] = useState([]);
  const [curatedProduct, setCuratedProduct] = useState([]);
  const [blogProduct, setBlogProduct] = useState([]);

  const fetchProduct = useCallback(() => {
    if (!product) return;
    const newArrivalProduct = product
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    const bestSellersProduct = product
      .sort(
        (a, b) =>
          b.customer_reviews.total_reviews - a.customer_reviews.total_reviews
      )
      .slice(0, 4);

    const curatedProduct = product
      .filter((p) => p.category === "Accessories")
      .slice(0, 4);

    const blogProduct = product.sort(() => 0.5 - Math.random()).slice(0, 4);
    return [newArrivalProduct, bestSellersProduct, curatedProduct, blogProduct];
  }, [product]);

  useEffect(() => {
    const [newArrivalProduct, bestSellersProduct, curatedProduct, blogProduct] =
      fetchProduct();
    setNewArrivalProduct(newArrivalProduct);
    setBestSellersProduct(bestSellersProduct);
    setCuratedProduct(curatedProduct);
    setBlogProduct(blogProduct);
  }, [fetchProduct]);

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
      <Hero />
      <HomeComponent title="new arrival" products={newArrivalProduct} />
      <HomeComponent title="best sellers" products={bestSellersProduct} />
      <HomeComponent title="curated collection" products={curatedProduct} />
      <HomeComponent title="from our blog" products={blogProduct} />
    </div>
  );
};

export default memo(Home);
