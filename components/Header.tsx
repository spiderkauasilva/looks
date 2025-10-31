
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 sm:p-6 bg-white/60 backdrop-blur-lg sticky top-0 z-10 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
          Bluezinhas S.A.
        </h1>
      </div>
    </header>
  );
};

export default Header;
