"use client";

import React, { useState } from "react";
import { login, register } from "./FormFunctions";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";
import { useAuth } from "../../services/Auth/AuthContext";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const user = useAuth();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password, setError);
    } else {
      e.preventDefault();
      register(email, password, password, setError);
    }
  };

  const toggleForm = () => {
    setError("");
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsTransitioning(false);
    }, 300);
  };

  if(user.user !== null){
    return;
  }

  return (
  <div className="relative bg-gradient-to-tr from-[#9B2B77] via-[#CF4E7D] to-[#D78E61] text-white shadow-lg rounded-2xl px-12 py-12 w-[35%] h-auto mx-auto flex flex-col items-center">
  {/* Back to Login button positioned above the title */}
    <div
      className={`absolute top-4 left-4 transition-transform duration-300 ease-in-out ${
        isLogin ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={toggleForm}
        className="flex flex-rows items-center justify-center font-regular gap-2 px-4 mt-1 py-2 text-white hover:text-[#D4D4D4] transition duration-300"
      >
        <FaArrowLeftLong className="text-lg" />
        Log In
      </button>
    </div>

      {/* Title container */}
      <div className="relative w-full h-[50px] overflow-hidden ml-5">
        <div
          className="absolute flex w-[200%] transition-all duration-300 ease-in-out mt-[15px]"
          style={{
            transform: isLogin ? "translateX(0%)" : "translateX(-50%)",
          }}  
        >
          <h2 className="w-1/2 text-2xl font-regular">Welcome back!</h2>
          <h2 className="w-1/2 text-xl font-regular">Create your Account!</h2>
        </div>
      </div>
      <div className="space-y-4 w-full flex flex-col items-center">
        <div className="relative h-[325px] w-full overflow-hidden">
          <div
            className="relative flex w-[200%] h-full transition-all duration-300 ease-in-out"
            style={{
              transform: isLogin ? "translateX(0%)" : "translateX(-50%)",
            }}
          >
            <div
              className={`w-1/2 z-10 transition-opacity duration-300 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"}`}
              style={{ transform: isLogin ? "translateX(0%)" : "translateX(-100%)" }}
            >
              <form
                onSubmit={handleSubmit}
                className="justify-between w-full flex h-full flex-col items-center"
              >
                <div className="flex flex-col gap-5 w-full mt-4">
                  <input
                    id="email"
                    type="email"
                    className="w-full font-light px-5 py-3 rounded-3xl bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#5A3E91]"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <input
                    id="password"
                    type="password"
                    className="w-full font-light px-5 py-3 rounded-3xl bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#5A3E91]"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                

                {error && <p className="text-white-500 px-5 text-sm">{error}</p>}

                <div className="flex flex-col space-y-2 w-full items-center">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-3xl bg-[#FFC700] text-white font-semibold hover:bg-[#D8A620] transition duration-300"
                  >
                    Login
                  </button>

                  <a
                    href="/forgot-password"
                    className="text-white text-sm mt-4 font-light hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="button"
                  onClick={toggleForm}
                  className="flex flex-rows items-center justify-center gap-6 w-full rounded-3xl text-white font-regular hover:text-[#D4D4D4] transition duration-300 mt-7"
                >
                  Create an Account
                  <FaArrowRightLong className="text-lg" />
                </button>
              </form>
            </div>

            {/* Signup Form */}
            <div
              className={`w-1/2 transition-opacity duration-300 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"}`}
              style={{ transform: isLogin ? "translateX(100%)" : "translateX(0%)" }}
            >
              
              <form className="w-full flex flex-col py-3 items-center"
                onSubmit={handleSubmit}>
                {/* Back to Login button positioned above the title */}
                

                {/* Signup form fields */}
                <div className="flex flex-col w-full gap-5 font-light">
                  <div className="relative">
                    <LuMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                    <input
                      id="signup-email"
                      type="email"
                      className="w-full pl-12 px-5 py-3 rounded-3xl bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#5A3E91]"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="relative">
                  <MdLockOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                    <input
                      id="signup-password"
                      type="password"
                      className="w-full pl-12 px-5 py-3 rounded-3xl bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#5A3E91]"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative">
                    <MdLockOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                      <input
                        id="signup-password"
                        type="password"
                        className="w-full pl-12 px-5 py-3 rounded-3xl bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#5A3E91]"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                

                <div className="flex flex-col mt-8 w-full items-center">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-3xl bg-[#FFC700] text-white font-semibold hover:bg-[#D8A620] transition duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

