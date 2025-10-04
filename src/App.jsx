import React from "react";
import Home from "./components/home/Home";
import Header from "./components/Header";
import SignPage from "./components/signPages/SignPage";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import About from "./components/about/About";
import ContactUs from "./components/contactUs/ContactUs";
import Products from "./components/products/Products";

const App = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center">
        <div className="container lg:w-[85%] p-[20px] pb-[0]">
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/shop" element={<Home />} />
            <Route path="/new" element={<Home />} />
            <Route path="/Products">
              <Route index path="all" element={<Products />} />
              <Route path="men" element={<Home />} />
              <Route path="women" element={<Home />} />
              <Route path="kids" element={<Home />} />
              <Route path="accessories" element={<Home />} />
            </Route>
            <Route path="/blog" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signin" element={<SignPage />} />
            <Route path="/wishList" element={<Home />} />
            <Route path="/card" element={<Home />} />
            <Route path="/aboutUs" element={<About />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
