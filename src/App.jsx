import React from "react";
import Home from "./components/home/Home";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center">
        <div className="container lg:w-[85%] p-[20px] pb-[0]">
          <Home />
        </div>
      </div>
    </>
  );
};

export default App;
