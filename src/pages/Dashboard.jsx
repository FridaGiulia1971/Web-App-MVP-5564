import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useTask } from '../contexts/TaskContext';
import { format, isToday, isTomorrow } from 'date-fns';

const { FiCheckCircle, FiClock, FiAlertCircle, FiTrendingUp, FiPlus, FiTarget, FiZap } = FiIcons;

function StatCard({ title, value, icon, gradient, change, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group overflow-hidden"
    >
      <div className={`bg-gradient-to-br ${gradient} p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500`}>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <p className="text-white/80 text-sm font-medium mb-2">{title}</p>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            {change && (
              <div className="flex items-center">
                <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-white/80 mr-1" />
                <span className="text-sm text-white/80">{change}% from last week</span>
              </div>
            )}
          </div>
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl"
          >
            <SafeIcon icon={icon} className="w-8 h-8 text-white" />
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute -bottom-5 -left-5 w-15 h-15 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
      </div>
    </motion.div>
  );
}

function RecentTask({ task, index }) {
  const getDateLabel = (date) => {
    const taskDate = new Date(date);
    if (isToday(taskDate)) return 'Today';
    if (isTomorrow(taskDate)) return 'Tomorrow';
    return format(taskDate, 'MMM dd');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-danger-gradient text-white';
      case 'medium': return 'bg-warning-gradient text-white';
      case 'low': return 'bg-success-gradient text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return FiCheckCircle;
      case 'in-progress': return FiClock;
      default: return FiAlertCircle;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 4, scale: 1.02 }}
      className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/50 to-white border border-gray-200/50 rounded-2xl hover:shadow-lg hover:border-primary-200 transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className={`p-2 rounded-xl ${task.status === 'completed' ? 'bg-success-gradient' : 'bg-warning-gradient'}`}
        >
          <SafeIcon 
            icon={getStatusIcon(task.status)} 
            className="w-4 h-4 text-white" 
          />
        </motion.div>
        <div>
          <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{task.title}</h4>
          <p className="text-sm text-gray-500">{getDateLabel(task.dueDate)}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)} shadow-sm`}>
        {task.priority}
      </span>
    </motion.div>
  );
}

function Dashboard() {
  const { tasks, getTaskStats } = useTask();
  const stats = getTaskStats();
  
  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const upcomingTasks = tasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Welcome back! Here's your productivity overview.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary-gradient text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center space-x-3 group"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          <span>New Task</span>
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={FiTarget}
          gradient="from-blue-500 to-cyan-500"
          change={12}
          delay={0.1}
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={FiCheckCircle}
          gradient="from-emerald-500 to-teal-500"
          change={8}
          delay={0.2}
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={FiClock}
          gradient="from-amber-500 to-orange-500"
          change={-3}
          delay={0.3}
        />
        <StatCard
          title="Overdue"
          value={stats.overdue}
          icon={FiAlertCircle}
          gradient="from-red-500 to-pink-500"
          delay={0.4}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-primary-gradient rounded-2xl">
              <SafeIcon icon={FiZap} className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Recent Tasks</h2>
          </div>
          <div className="space-y-4">
            {recentTasks.length > 0 ? (
              recentTasks.map((task, index) => (
                <RecentTask key={task.id} task={task} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiTarget} className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">No tasks yet. Create your first task!</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-secondary-gradient rounded-2xl">
              <SafeIcon icon={FiClock} className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Deadlines</h2>
          </div>
          <div className="space-y-4">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task, index) => (
                <RecentTask key={task.id} task={task} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiCheckCircle} className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-gray-500 text-lg">No upcoming deadlines!</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;