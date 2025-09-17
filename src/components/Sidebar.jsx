import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiCheckSquare, FiBarChart3, FiUser, FiX, FiStar, FiZap } = FiIcons;

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: FiHome, color: 'from-blue-500 to-cyan-500' },
  { name: 'Tasks', href: '/tasks', icon: FiCheckSquare, color: 'from-emerald-500 to-teal-500' },
  { name: 'Analytics', href: '/analytics', icon: FiBarChart3, color: 'from-violet-500 to-purple-500' },
  { name: 'Profile', href: '/profile', icon: FiUser, color: 'from-orange-500 to-red-500' },
];

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 }
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full w-72 bg-white/95 backdrop-blur-xl border-r border-gray-200/50 z-50 lg:translate-x-0 lg:static lg:z-auto shadow-xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 lg:hidden">
          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-lg">TM</span>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                TaskMaster
              </h1>
              <p className="text-xs text-gray-500">Productivity Hub</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-300"
          >
            <SafeIcon icon={FiX} className="w-5 h-5 text-gray-500" />
          </motion.button>
        </div>

        <div className="p-6">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl border border-primary-200/50"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-gradient rounded-xl">
                <SafeIcon icon={FiStar} className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Premium Plan</p>
                <p className="text-xs text-gray-500">Unlimited tasks & analytics</p>
              </div>
            </div>
          </motion.div>

          <nav>
            <ul className="space-y-2">
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink
                      to={item.href}
                      onClick={onClose}
                      className={`group flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                        isActive
                          ? 'bg-primary-gradient text-white shadow-lg shadow-primary-500/25'
                          : 'text-gray-700 hover:bg-gray-50/80 hover:text-primary-600'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary-gradient rounded-2xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      <div className={`relative p-2 rounded-xl ${isActive ? 'bg-white/20' : 'group-hover:bg-primary-100'} transition-all duration-300`}>
                        <SafeIcon 
                          icon={item.icon} 
                          className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-primary-600'} transition-colors`} 
                        />
                      </div>
                      
                      <span className={`relative font-medium ${isActive ? 'text-white' : 'group-hover:text-primary-600'} transition-colors`}>
                        {item.name}
                      </span>

                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="relative ml-auto"
                        >
                          <SafeIcon icon={FiZap} className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </NavLink>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl"
          >
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-white/50 rounded-xl transition-all duration-300"
              >
                Create New Task
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-white/50 rounded-xl transition-all duration-300"
              >
                View Reports
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;