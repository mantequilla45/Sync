"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [isFadingOut, setIsFadingOut] = useState(false); // Manage visibility for fade effect

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password, setError);
    } else {
      console.log("Signup functionality goes here");
    }
  };

  const toggleForm = () => {
    setError(""); // Clear any previous errors

    // Trigger the slide and fade out transition
    setIsFadingOut(true);

    // Wait for both the slide and fade-out to finish
    setTimeout(() => {
      setIsLogin(!isLogin); // Toggle between login and signup
      setIsFadingOut(false); // Start fade-in
    }, 300); // 300ms for the slide and fade transition
  };

  return (
    <div className="relative bg-[linear-gradient(to_top_right,_#9B2B77,_#CF4E7D,_#D78E61)] text-white shadow-lg rounded-2xl px-12 py-12 w-[35%] h-auto mx-auto flex flex-col items-center">
      {/* Back to Login button positioned above the title */}
      <div
        className={`absolute top-4 left-4 transition-transform duration-300 ease-in-out ${
          isLogin ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
      >
        <button
          type="button"
          onClick={toggleForm}
          className="flex flex-rows items-center justify-center gap-2 px-4 py-2 text-white font-semibold hover:text-[#D4D4D4] transition duration-300"
        >
          <FaArrowLeftLong className="text-lg" />
          Log In
        </button>
      </div>

      {/* Title container */}
      <div className="relative w-full h-[40px] overflow-hidden ml-5">
        <div
          className="absolute flex w-[200%] transition-all duration-300 ease-in-out"
          style={{
            transform: isLogin ? "translateX(0%)" : "translateX(-50%)",
          }}  
        >
          <h2 className="w-1/2 text-2xl font-regular">Welcome back!</h2>
          <h2 className="w-1/2 text-2xl font-regular mt-[10px]">Create your Account!</h2>
        </div>
      </div>

      <div className="space-y-4 w-full flex flex-col items-center">
        <div className="relative h-[325px] w-full overflow-hidden">
          <div
            className="relative flex w-[200%] transition-all duration-300 ease-in-out"
            style={{
              transform: isLogin ? "translateX(0%)" : "translateX(-50%)", // Toggle between login and signup forms
            }}
          >
            {/* Login Form */}
            
            <div
              className={`w-1/2 z-10 transition-transform duration-300 ease-in-out transform ${
                isFadingOut
                  ? "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-8 w-full flex flex-col items-center"
              >
                <div className="w-full">
                  <input
                    id="email"
                    type="email"
                    className="w-full px-5 py-3 rounded-3xl bg-gray-100 text-gray-800 shadow-inner focus:outline-none focus:ring-0 focus:shadow-[inset_0_0_0_1px_#9C9C9C]"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="w-full">
                  <input
                    id="password"
                    type="password"
                    className="w-full px-5 py-3 rounded-3xl bg-gray-100 text-gray-800 shadow-inner focus:outline-none focus:ring-0 focus:shadow-[inset_0_0_0_1px_#9C9C9C]"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <div className="flex flex-col space-y-2 w-full items-center">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-3xl bg-[#FFC700] text-white font-semibold hover:bg-[#D8A620] transition duration-300"
                  >
                    Login
                  </button>

                  <a
                    href="/forgot-password"
                    className="text-white text-sm mt-4 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="button"
                  onClick={toggleForm}
                  className="flex flex-rows items-center justify-center gap-6 w-full px-6 py-3 rounded-3xl text-white font-semibold hover:text-[#D4D4D4] transition duration-300 mt-4"
                >
                  Create an Account
                  <FaArrowRightLong className="text-lg" />
                </button>
              </form>
            </div>

            {/* Signup Form */}
            <div
              className={`w-1/2 mt-[20px] transition-transform duration-300 ease-in-out transform ${
                isFadingOut
                  ? "translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <div className="text-white text-sm ml-[10px]">
                Create an account to view and manage your projects.
              </div>
              <form className="space-y-8 w-full flex flex-col items-center">
                {/* Back to Login button positioned above the title */}
                <div
                  className={`absolute top-4 left-4 transition-transform duration-300 ease-in-out ${
                    isLogin ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                  }`}
                >
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="flex flex-rows items-center justify-center gap-2 px-4 py-2 text-white font-semibold hover:text-[#D4D4D4] transition duration-300"
                  >
                    <FaArrowLeftLong className="text-lg" />
                    Log In
                  </button>
                </div>

                {/* Signup form fields */}
                <div className="w-full">
                  <input
                    id="signup-email"
                    type="email"
                    className="w-full px-5 py-3 rounded-3xl bg-gray-100 text-gray-800 shadow-inner focus:outline-none focus:ring-0 focus:shadow-[inset_0_0_0_1px_#9C9C9C]"
                    placeholder="Email"
                  />
                </div>

                <div className="w-full">
                  <input
                    id="signup-password"
                    type="password"
                    className="w-full px-5 py-3 rounded-3xl bg-gray-100 text-gray-800 shadow-inner focus:outline-none focus:ring-0 focus:shadow-[inset_0_0_0_1px_#9C9C9C]"
                    placeholder="Password"
                  />
                </div>

                <div className="flex flex-col space-y-2 w-full items-center">
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

// Login function (unchanged)
export const login = async (
  email: string,
  password: string,
  setError: (message: string) => void
) => {
  setError(""); // Clear previous errors

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Login success:", data);
      window.location.href = "/home";
    } else {
      setError(data.error || "Failed to login.");
      console.error("Error:", data.error);
    }
  } catch (e) {
    setError("Failed to login. Check your email or password.");
    console.error("Error logging in:", e);
  }
};
