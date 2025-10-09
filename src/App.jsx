import Home from "./components/home/Home";
import Header from "./components/Header";
import SignPage from "./components/registerPages/SignPage";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import About from "./components/about/About";
import ContactUs from "./components/contactUs/ContactUs";
import Products from "./components/products/Products";
import ProductPage from "./components/productPage/ProductPage";
import Card from "./components/cart/Cart";
import Blog from "./components/blog/Blog";
import WishList from "./components/wishList/WishList";
import { Toaster } from "react-hot-toast";
import FAQ from "./components/FAQ";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  return (
    <>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-start justify-center min-h-[50vh]">
        <div className="container lg:w-[85%] p-[20px] pb-[0]">
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/new" element={<Home />} />
            <Route path="/Products">
              <Route index element={<Products />} />
              <Route path=":categoryName" element={<Products />}>
                <Route path=":itemPage" element={<ProductPage />} />
              </Route>
            </Route>
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signin" element={<SignPage />} />
            <Route path="/wishList" element={<WishList />} />
            <Route path="/cart" element={<Card />} />
            <Route path="/aboutUs" element={<About />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
