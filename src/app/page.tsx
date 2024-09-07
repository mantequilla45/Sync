'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../components/protected/header';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Background from '../components/protected/background';

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
    } catch (e) {
      setError('Failed to login. Check your email or password.');
      console.error('Error logging in: ', e);
    }
  }

  return (
    <div className="relative min-h-screen">
      <title>{"Sync"}</title>
      <Background />

      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center w-full">
          <div className="flex flex-row gap-10 w-[70%]">
            <div className="w-[80%] pt-5">
              <h1 className="text-5xl md:text-6xl font-bold text-white font-poppins mb-6">Sync</h1>
              <p className="text-lg w-full text-gray-300 mb-8 text-left">
                Seamlessly collaborate in real-time with Sync. Experience a streamlined workflow with advanced features tailored for teams and projects of all sizes.
              </p>
            </div>
            <div className="bg-[linear-gradient(to_top_right,_#9B2B77,_#CF4E7D,_#D78E61)] text-white shadow-lg rounded-2xl px-12 py-12 w-[35%] h-auto mx-auto flex flex-col items-center">
              <h2 className="text-2xl font-regular mb-6">Welcome back!</h2>
              <div className="space-y-4 w-full flex flex-col items-center">
                <form onSubmit={handleLogin} className="space-y-8 w-full flex flex-col items-center">
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
                  <div className="flex flex-col space-y-2 w-full items-center">
                    <button type="submit" className="w-full px-6 py-3 rounded-3xl bg-[#FFC700] text-white font-semibold hover:bg-[#D8A620] transition duration-300">
                      Login
                    </button>

                    <a href="/forgot-password" className="text-white text-sm mt-4 hover:underline">
                      Forgot Password?
                    </a>
                  </div>

                  <Link href="/signup" legacyBehavior>
                    <button className="w-full px-6 py-3 rounded-3xl bg-[#EF893C] text-white font-semibold hover:bg-[#CD7A4A] transition duration-300 mt-4">
                      Create an Account
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-[20px] flex-row w-full h-[100px] items-center gap-5 justify-between px-[300px]">
          <div className="flex space-x-6">
            <a href='/about' className="text-sm">About</a>
            <a href='/contact-us' className="text-sm">Contact us</a>
            <a href='/our-team' className="text-sm">Our Team</a>
          </div>
          <div className="flex flex-row gap-6">
            <FaXTwitter className="w-[30px] h-[30px]" />
            <FaInstagram className="w-[30px] h-[30px]" />
            <FaFacebook className="w-[30px] h-[30px]" />
            <FaGithub className="w-[30px] h-[30px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
