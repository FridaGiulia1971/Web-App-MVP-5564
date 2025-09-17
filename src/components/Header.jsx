import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const { FiMenu, FiBell, FiSearch, FiLogOut } = FiIcons;

function Header({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 px-6 py-4 sticky top-0 z-50 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-300 hover:scale-105"
          >
            <SafeIcon icon={FiMenu} className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-lg">TM</span>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent hidden sm:block">
                TaskMaster
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Productivity Hub</p>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-lg mx-6 hidden md:block">
          <div className="relative group">
            <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary-500 transition-colors" />
            <input
              type="text"
              placeholder="Search tasks, projects, or anything..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all duration-300 text-sm placeholder-gray-400"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-3 rounded-xl hover:bg-gray-100/80 transition-all duration-300 group"
          >
            <SafeIcon icon={FiBell} className="w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-danger-gradient rounded-full shadow-lg"
            ></motion.span>
          </motion.button>

          <div className="flex items-center space-x-3 ml-3">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-200 shadow-lg"
            />
            <div className="hidden sm:block">
              <span className="text-sm font-semibold text-gray-800">
                {user?.name}
              </span>
              <p className="text-xs text-gray-500">Premium Member</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="p-3 rounded-xl hover:bg-danger-50 transition-all duration-300 text-gray-600 hover:text-danger-600 group"
            title="Logout"
          >
            <SafeIcon icon={FiLogOut} className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;