
import React from 'react';
import { useSelector } from 'react-redux';
import { User } from 'lucide-react';

// Header Component
const Header = () => {
  const { name, role } = useSelector((state) => state.user);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Intervue
                </span>
                <span className="text-white">.io</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {role && (
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <User className="w-5 h-5 text-white" />
                <div className="text-white">
                  <span className="font-semibold capitalize">{role}</span>
                  {role === 'STUDENT' && name && (
                    <span className="ml-2 text-blue-100">- {name}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
