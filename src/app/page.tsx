// src/app/page.tsx

import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      {/* Header Section */}
      <h1 className="text-5xl md:text-6xl font-bold text-green-500 mb-6">
        Sync()
      </h1>
      
      {/* Subtitle Section */}
      <p className="text-lg md:text-xl text-gray-300 mb-8 text-center max-w-2xl">
        Seamlessly collaborate in real-time with Sync. Experience a streamlined workflow with advanced features tailored for teams and projects of all sizes.
      </p>

      {/* Call to Action Button */}
      <button className="px-6 py-3 bg-green-500 text-black font-semibold rounded-lg shadow-lg hover:bg-green-600 hover:text-white transition duration-300 ease-in-out">
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
