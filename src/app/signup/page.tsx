"use client"; // Ensure this is present for client-side components

import React, { useState } from 'react';
import { signUpWithEmailAndPassword } from '../../../features/auth';
import SocketClient from '../../../features/socket_testing/testsocket';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-4xl font-bold text-green-500 mb-6">Sign Up</h1>
      <form onSubmit={handleSignup} className="flex flex-col space-y-4 w-full max-w-sm">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded border border-gray-600 bg-black text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded border border-gray-600 bg-black text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Sign Up
        </button>
        <SocketClient onConnectionStatusChange={handleConnectionStatusChange} />
        <p>Status: {connectionStatus}</p>
      </form>
    </div>
  );
};

export default SignupPage;
