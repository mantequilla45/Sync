import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-transparent text-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-center">
        <h1 className="text-2xl font-bold font-poppins">Sync</h1>
      </div>
    </header>
  );
};

export default Header;
