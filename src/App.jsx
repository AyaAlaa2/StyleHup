import React from "react";
import Home from "./components/home/Home";

const App = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="container lg:w-[85%] p-[20px] pb-[0]">
        <Home />
      </div>
    </div>
  );
};

export default App;
