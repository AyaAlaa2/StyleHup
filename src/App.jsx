import Home from "./components/home/Home";
import UserLayout from "./components/layout/UserLayout";
import AdminLayout from "./components/layout/AdminLayout";
import SignPage from "./components/registerPages/SignPage";
import { Route, Routes } from "react-router-dom";
import About from "./components/about/About";
import ContactUs from "./components/contactUs/ContactUs";
import Products from "./components/products/Products";
import ProductsPage from "./components/admin/products/ProductsPage";
import ProductPage from "./components/productPage/ProductPage";
import Card from "./components/cart/Cart";
import Blog from "./components/blog/Blog";
import WishList from "./components/wishList/WishList";
import FAQ from "./components/FAQ";
import ErrorPage from "./components/ErrorPage";
import SearchResult from "./components/SearchResult";
import { Toaster } from "react-hot-toast";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import Dashboard from "./components/admin/dashboard/Dashboard";
import ScrollToTop from "./components/ScrollToTop";
import Edit from "./components/admin/products/Edit";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <Routes>
        <Route element={<UserLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/Products">
            <Route index element={<Products />} />
            <Route path=":categoryName" element={<Products />}>
              <Route path=":itemPage" element={<ProductPage />} />
              <Route path=":itemPage/edit" element={<Edit />} />
            </Route>
          </Route>
          <Route path="/Search/:query" element={<SearchResult />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/wishList" element={<WishList />} />
          <Route path="/cart" element={<Card />} />
          <Route path="/aboutUs" element={<About />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/signin" element={<SignPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<Dashboard />} />
          <Route path="customers" element={<Dashboard />} />
          <Route path="analytics" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
