"use client";

import React, { useState } from 'react';
import { signUpWithEmailAndPassword } from '../../../features/auth';
import SocketClient from '../../../features/socket_testing/testsocket';
import Header from '../../components/protected/header';
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Background from '../../components/protected/background';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<string>('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUpWithEmailAndPassword(email, password, setError);
  };

  const handleConnectionStatusChange = (status: string) => {
    setConnectionStatus(status);
  };
  
  return (
    <div className="relative min-h-screen">
      <title>{"Sync()"}</title>
      <Background className="absolute inset-0" />
      <div className="relative z-10 flex flex-col items-center min-h-screen text-white">  
        <Header />
        <div className="flex flex-col justify-center flex-grow items-center rounded-lg mx-6 p-8">
          <h1 className="text-4xl font-bold text-white mb-10">Create your account!</h1>
          <form onSubmit={handleSignup} className="flex flex-col space-y-7 w-[80%] max-w-sm">
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-3xl border border-gray-600 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#FB0E9C]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-3xl border border-gray-600 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#FB0E9C]"
              required
            />

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-3xl bg-[#FB0E9C] text-white font-semibold hover:bg-[#C00073] transition duration-300 mt-4"
            >
              Sign Up
            </button>
            <div className="hidden">
              <SocketClient />
              <p>Status: {connectionStatus}</p>
            </div>
          </form>
        </div>
        <div className="flex mb-[40px] flex-col w-[70%] h-auto gap-6 items-center justify-between">
          <div className="flex flex-row gap-6">
            <FaXTwitter className="w-[30px] h-[30px]" />
            <FaInstagram className="w-[30px] h-[30px]" />
            <FaFacebook className="w-[30px] h-[30px]" />
            <FaGithub className="w-[30px] h-[30px]" />
          </div>
          <div className="flex space-x-6">
            <a href='/about' className="text-sm">About</a>
            <a href='/contact-us' className="text-sm">Contact us</a>
            <a href='/our-team' className="text-sm">Our Team</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
