import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Initialize with sample data
      const sampleTasks = [
        {
          id: '1',
          title: 'Complete project proposal',
          description: 'Write and submit the Q4 project proposal',
          status: 'in-progress',
          priority: 'high',
          dueDate: '2024-01-20',
          createdAt: '2024-01-10T10:00:00Z',
          tags: ['work', 'urgent']
        },
        {
          id: '2',
          title: 'Review team feedback',
          description: 'Go through the feedback from the last sprint',
          status: 'pending',
          priority: 'medium',
          dueDate: '2024-01-18',
          createdAt: '2024-01-11T14:30:00Z',
          tags: ['team', 'review']
        },
        {
          id: '3',
          title: 'Update documentation',
          description: 'Update API documentation with latest changes',
          status: 'completed',
          priority: 'low',
          dueDate: '2024-01-15',
          createdAt: '2024-01-08T09:15:00Z',
          tags: ['documentation']
        }
      ];
      setTasks(sampleTasks);
      localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    }
  }, []);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    const newTasks = [...tasks, newTask];
    saveTasks(newTasks);
  };

  const updateTask = (taskId, updates) => {
    const newTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    saveTasks(newTasks);
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(newTasks);
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const overdue = tasks.filter(t => 
      t.status !== 'completed' && new Date(t.dueDate) < new Date()
    ).length;

    return { total, completed, inProgress, pending, overdue };
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskStats
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}