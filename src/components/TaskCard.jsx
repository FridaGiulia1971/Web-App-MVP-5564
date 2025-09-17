import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useTask } from '../contexts/TaskContext';
import { format, isToday, isTomorrow, isPast } from 'date-fns';

const { FiEdit, FiTrash2, FiCalendar, FiFlag, FiCheckCircle, FiClock, FiAlertCircle, FiStar } = FiIcons;

function TaskCard({ task, index, onEdit }) {
  const { updateTask, deleteTask } = useTask();

  const getDateLabel = (date) => {
    const taskDate = new Date(date);
    if (isToday(taskDate)) return 'Today';
    if (isTomorrow(taskDate)) return 'Tomorrow';
    if (isPast(taskDate) && task.status !== 'completed') return 'Overdue';
    return format(taskDate, 'MMM dd, yyyy');
  };

  const getPriorityGradient = (priority) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-amber-500 to-orange-500';
      case 'low': return 'from-emerald-500 to-teal-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusGradient = (status) => {
    switch (status) {
      case 'completed': return 'from-emerald-500 to-teal-500';
      case 'in-progress': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return FiCheckCircle;
      case 'in-progress': return FiClock;
      default: return FiAlertCircle;
    }
  };

  const handleStatusChange = (newStatus) => {
    updateTask(task.id, { status: newStatus });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const isOverdue = isPast(new Date(task.dueDate)) && task.status !== 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border hover:shadow-2xl transition-all duration-500 relative overflow-hidden ${
        isOverdue ? 'border-red-200 bg-red-50/50' : 'border-gray-200/50'
      }`}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getPriorityGradient(task.priority)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className={`w-4 h-4 rounded-full bg-gradient-to-r ${getStatusGradient(task.status)} shadow-lg`}
            ></motion.div>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getPriorityGradient(task.priority)} shadow-lg`}
            >
              {task.priority}
            </motion.span>
          </div>
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(task)}
              className="p-2 rounded-xl hover:bg-primary-100 transition-colors"
            >
              <SafeIcon icon={FiEdit} className="w-4 h-4 text-primary-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="p-2 rounded-xl hover:bg-red-100 transition-colors"
            >
              <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600" />
            </motion.button>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-primary-600 transition-colors line-clamp-2">
          {task.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {task.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-xl ${isOverdue ? 'bg-red-100' : 'bg-gray-100'} group-hover:bg-primary-100 transition-colors`}>
              <SafeIcon icon={FiCalendar} className={`w-4 h-4 ${isOverdue ? 'text-red-600' : 'text-gray-600'} group-hover:text-primary-600 transition-colors`} />
            </div>
            <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
              {getDateLabel(task.dueDate)}
            </span>
          </div>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`p-2 rounded-xl bg-gradient-to-r ${getStatusGradient(task.status)}`}
          >
            <SafeIcon icon={getStatusIcon(task.status)} className="w-4 h-4 text-white" />
          </motion.div>
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {task.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.span
                key={tagIndex}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: tagIndex * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-full text-xs font-medium border border-blue-200"
              >
                {tag}
              </motion.span>
            ))}
            {task.tags.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                +{task.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <motion.select
          whileHover={{ scale: 1.02 }}
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white/50 backdrop-blur-sm transition-all duration-300 font-medium"
        >
          <option value="pending">📋 Pending</option>
          <option value="in-progress">⚡ In Progress</option>
          <option value="completed">✅ Completed</option>
        </motion.select>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-accent-200/20 to-primary-200/20 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
    </motion.div>
  );
}

export default TaskCard;