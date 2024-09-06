// my-next-app/src/app/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../components/protected/header';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';


const HomePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login success:', userCredential.user);
      window.location.href = '/home';
    }
    catch (e) {
      setError('Failed to login. Check your email or password.');
      console.error('Error logging in: ', e);

    }
  }

  return (
    <>
    <title>{"Sync"}</title>
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
              <form onSubmit={handleLogin} className="space-y-4 w-full flex flex-col items-center">
                <div className="w-full">
                  <input
                    id="email"
                    type="email"
                    className="w-full px-5 py-3 rounded-3xl bg-gray-100 text-gray-800"
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
                    className="w-full px-5 py-3 rounded-3xl bg-gray-100 text-gray-800"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button
                  type="submit"
                  className="w-[80%] px-6 py-3 rounded-3xl bg-[#7731E3] text-white font-semibold hover:bg-[#5d1abf] transition duration-300"
                >
                  Login
                </button>
              </form>

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
