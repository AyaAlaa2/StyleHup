import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

const SignPage = () => {
  const [tab, setTab] = useState("login");

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-[20px]">
      <div className="card w-96 bg-gray-200/40 shadow-2xl">
        <div className="flex justify-around border-b border-[#E5E8EB] px-[8px]">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-3 font-medium cursor-pointer text-[16px] ${
              tab === "login"
                ? "rounded border-b-2 text-black "
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-3 font-medium cursor-pointer text-[16px] ${
              tab === "signup"
                ? "rounded border-b-2 text-black "
                : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="card-body">
          {tab === "login" ? (
            <Login setTab={setTab} />
          ) : (
            <Signup setTab={setTab} />
          )}
        </div>
      </div>
    </div>
  );
};
export default SignPage;
