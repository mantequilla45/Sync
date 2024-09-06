"use client"

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../firebase'; 

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, setError); // Use the separated login function
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center">
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
  );
};

export default LoginForm;


export const login = async (email: string, password: string, setError: (message: string) => void) => {
  setError(''); // Clear previous errors

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken(); 

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login success:', data);
      window.location.href = '/home';
    } else {
      setError(data.error || 'Failed to login.');
      console.error('Error:', data.error);
    }
  } catch (e) {
    setError('Failed to login. Check your email or password.');
    console.error('Error logging in:', e);
  }
};
