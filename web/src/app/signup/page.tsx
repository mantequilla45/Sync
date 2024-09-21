"use client";

import React, { useState } from 'react';
// import { signUpWithEmailAndPassword } from '../../../features/auth';
//import SocketClient from '../../../features/socket_testing/testsocket';
import Header from '../../components/protected/header';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/navigation';
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Background from '../../components/protected/background';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<string>('');
  const route = useRouter();
  const [success, setSuccess] = useState<boolean>(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must at least be six characters long.');
      return;
    };
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        password: password, //password will be temporarily shown for debug purposes
        UID: user.uid
      });
      console.log('Signup successful:', user);

      // Show the success message
      setSuccess(true);

      // Redirect to the home page after 2 seconds
      setTimeout(() => {
        route.push('/home');
      }, 2000);

    }
    catch (e) {
      console.error('Error during signup:', e);
      if (e instanceof FirebaseError) { // Using e as an instance for FirebaseError function
        if (e.code === 'auth/email-already-in-use'){
          setError('Email is already in use.');
        }
        else {
          setError('Failed to sign up. Please try again.');
        }
      }
    }

    // await signUpWithEmailAndPassword(email, password, setError);
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
        <div className="flex flex-col justify-center flex-grow items-center rounded-2xl mx-6 px-[70px] bg-white bg-opacity-20 backdrop-blur-md shadow-lg my-[150px]">
          <h1 className="text-2xl font-bold text-white mb-10">Create your account!</h1>
          <form onSubmit={handleSignup} className="flex flex-col space-y-7 w-[100%] max-w-sm">
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
              {/*<SocketClient />*/}
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
