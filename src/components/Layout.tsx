import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Database, LogOut, DollarSign, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <div className="flex items-center space-x-2 mb-8">
          <Database className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold">Pandas DB</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <button
            onClick={() => navigate('/dbs')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === '/dbs'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'hover:bg-gray-700'
            }`}
          >
            <Database className="w-5 h-5" />
            <span>DBs</span>
          </button>
          <button
            onClick={() => navigate('/tokens')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === '/tokens'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'hover:bg-gray-700'
            }`}
          >
            <Key className="w-5 h-5" />
            <span>Tokens</span>
          </button>
          <button
            onClick={() => navigate('/consumption')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === '/consumption'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'hover:bg-gray-700'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span>Consumption</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-gray-800 p-4 flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </header>

        {/* Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;