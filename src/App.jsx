import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FQA";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Prouducts from "./components/Products/Prouducts";
const App = () => {
  return (
    <>
      <Header />
      <div className="flex  justify-center min-h-screen  ">
        <div className="container lg:w-[85%] p-[20px]">
          <Routes>
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/Contact" element={<ContactUs />} />
            <Route path="/Prouducts" element={<Prouducts />} />
            <Route path="/Prouducts/:categoryName" element={<Prouducts />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
