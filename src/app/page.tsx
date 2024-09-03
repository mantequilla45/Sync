// my-next-app/src/app/page.tsx

import React from 'react';
import Link from 'next/link';
import SocketClient from '../../features/socket_testing/testsocket';
<<<<<<< HEAD
import Header from '../../component/protected/header';
=======
import Header from '../../components/(protected)/header';
>>>>>>> 932a76c3a5d6e528f33d17ea377cc1ca7d22ca16


const HomePage: React.FC = () => {
  return (
    <>
    <title>{"Sync()"}</title>
    <div className="flex flex-col items-center justify-center min-h-screen bg-[linear-gradient(to_top_right,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
    <Header />
    <div className="flex-grow flex items-center justify-center w-full">

      <div className="grid grid-cols-[2fr_1.5fr] gap-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-poppins mb-6">Sync</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 text-left max-w-2xl font-poppins">
              Seamlessly collaborate in real-time with Sync. Experience a streamlined workflow with advanced features tailored for teams and projects of all sizes.
            </p>
          </div>
          <div className="bg-[linear-gradient(to_bottom_right,_#B2179E,_#7A178B,_#311772)] text-white shadow-lg rounded-2xl px-8 py-10 w-[90%] h-[500px] mx-auto flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-6">Welcome Back</h2>
            <div className="space-y-4 w-full flex flex-col items-center">
              <div className="w-full">
                <input
                  id="username"
                  type="text"
                  className="w-full px-5 py-3 rounded-3xl border border-gray-100 bg-gray-100 text-gray-800"
                  placeholder="Username"
                />
              </div>

              
              <div className="w-full">
                <input
                  id="password"
                  type="password"
                  className="w-full px-5 py-3 rounded-3xl border border-gray-100 bg-gray-100 text-gray-800"
                  placeholder="Password"
                />
              </div>
              
              <Link href="/home" legacyBehavior>
                <button className="w-[80%] px-6 py-3 rounded-3xl bg-[#7731E3] text-white text-lg font-semibold hover:bg-[#5d1abf] transition duration-300">
                  Login
                </button>
              </Link>
              <a href="/forgot-password" className="text-white text-sm mt-4 hover:underline">
                Forgot Password?
              </a>
              
              <Link href="/signup" legacyBehavior>
                <button className="w-[80%] px-6 py-3 rounded-3xl bg-[#FB0E9C] text-white text-lg font-semibold hover:bg-[#C00073] transition duration-300 mt-4">
                  Create an Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomePage;
