import React from "react";
import Hero from "./Hero";
import HomeComponent from "./HomeComponent";
import {
  newArrivalProduct,
  blogProduct,
  bestSellersProduct,
  curatedProduct,
} from "./homeProducts";

const Home = () => {
  return (
    <div className="py-[20px]">
      <Hero />
      <HomeComponent title="new arrival" products={newArrivalProduct} />
      <HomeComponent title="best sellers" products={bestSellersProduct} />
      <HomeComponent title="curated collection" products={curatedProduct} />
      <HomeComponent title="from our blog" products={blogProduct} />
    </div>
  );
};

export default Home;
