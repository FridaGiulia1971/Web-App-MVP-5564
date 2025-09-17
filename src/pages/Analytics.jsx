import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useTask } from '../contexts/TaskContext';

const { FiTrendingUp, FiTarget, FiClock, FiCheckCircle } = FiIcons;

function Analytics() {
  const { tasks, getTaskStats } = useTask();
  const stats = getTaskStats();

  const getTaskCompletionChart = () => {
    return {
      title: {
        text: 'Task Completion Rate',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: 'Tasks',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '60%'],
          data: [
            { value: stats.completed, name: 'Completed', itemStyle: { color: '#10b981' } },
            { value: stats.inProgress, name: 'In Progress', itemStyle: { color: '#f59e0b' } },
            { value: stats.pending, name: 'Pending', itemStyle: { color: '#6b7280' } },
            { value: stats.overdue, name: 'Overdue', itemStyle: { color: '#ef4444' } }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  };

  const getPriorityDistribution = () => {
    const priorities = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {});

    return {
      title: {
        text: 'Priority Distribution',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['High', 'Medium', 'Low']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Tasks',
          type: 'bar',
          data: [
            { value: priorities.high || 0, itemStyle: { color: '#ef4444' } },
            { value: priorities.medium || 0, itemStyle: { color: '#f59e0b' } },
            { value: priorities.low || 0, itemStyle: { color: '#10b981' } }
          ],
          emphasis: {
            focus: 'series'
          }
        }
      ]
    };
  };

  const getWeeklyProgress = () => {
    // Generate sample weekly data
    const weeklyData = [
      { day: 'Mon', completed: 3, created: 2 },
      { day: 'Tue', completed: 2, created: 4 },
      { day: 'Wed', completed: 5, created: 1 },
      { day: 'Thu', completed: 1, created: 3 },
      { day: 'Fri', completed: 4, created: 2 },
      { day: 'Sat', completed: 2, created: 1 },
      { day: 'Sun', completed: 1, created: 2 }
    ];

    return {
      title: {
        text: 'Weekly Progress',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Completed', 'Created'],
        bottom: 10
      },
      xAxis: {
        type: 'category',
        data: weeklyData.map(d => d.day)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Completed',
          type: 'line',
          data: weeklyData.map(d => d.completed),
          itemStyle: { color: '#10b981' },
          smooth: true
        },
        {
          name: 'Created',
          type: 'line',
          data: weeklyData.map(d => d.created),
          itemStyle: { color: '#3b82f6' },
          smooth: true
        }
      ]
    };
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const productivityScore = Math.min(100, Math.round((stats.completed * 10 + stats.inProgress * 5) / Math.max(1, stats.total)));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your productivity and task performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{completionRate}%</p>
            </div>
            <div className="p-3 rounded-xl bg-green-500">
              <SafeIcon icon={FiCheckCircle} className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Productivity Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{productivityScore}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500">
              <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Tasks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.inProgress + stats.pending}</p>
            </div>
            <div className="p-3 rounded-xl bg-yellow-500">
              <SafeIcon icon={FiClock} className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Focus Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">85</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500">
              <SafeIcon icon={FiTarget} className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <ReactECharts
            option={getTaskCompletionChart()}
            style={{ height: '350px' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <ReactECharts
            option={getPriorityDistribution()}
            style={{ height: '350px' }}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <ReactECharts
          option={getWeeklyProgress()}
          style={{ height: '400px' }}
        />
      </motion.div>
    </motion.div>
  );
}

export default Analytics;