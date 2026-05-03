import React, { useState, useEffect, useCallback } from 'react';
import { taskService, authService } from '../services/api';
import socketService from '../services/socket';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import NotificationToast from '../components/NotificationToast';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [user, setUser] = useState(authService.getCurrentUser());

  const fetchTasks = useCallback(async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      setNotification({ message: 'Failed to fetch tasks', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();

    if (user) {
      socketService.connect(user._id);
      socketService.onUpdateTasks(() => {
        fetchTasks();
      });
    }

    return () => {
      socketService.disconnect();
    };
  }, [fetchTasks, user]);

  const handleCreateOrUpdateTask = async (taskData) => {
    try {
      if (taskToEdit) {
        await taskService.updateTask(taskToEdit._id, taskData);
        setNotification({ message: 'Task updated successfully', type: 'success' });
      } else {
        await taskService.createTask(taskData);
        setNotification({ message: 'Task created successfully', type: 'success' });
      }
      setIsModalOpen(false);
      setTaskToEdit(null);
      socketService.emitTaskChange(user._id);
      fetchTasks();
    } catch (error) {
      setNotification({ message: 'Operation failed', type: 'error' });
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        setNotification({ message: 'Task deleted', type: 'success' });
        socketService.emitTaskChange(user._id);
        fetchTasks();
      } catch (error) {
        setNotification({ message: 'Failed to delete task', type: 'error' });
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await taskService.updateTask(id, { status });
      socketService.emitTaskChange(user._id);
      fetchTasks();
    } catch (error) {
      setNotification({ message: 'Failed to update status', type: 'error' });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === 'All' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStats = () => {
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'Pending').length,
      inProgress: tasks.filter(t => t.status === 'In-progress').length,
      completed: tasks.filter(t => t.status === 'Completed').length,
    };
  };

  return (
    <div className="dashboard-layout">
      <Navbar user={user} />
      <div className="dashboard-content">
        <Sidebar 
          currentFilter={filter} 
          setFilter={setFilter} 
          stats={getStats()} 
        />
        <main className="main-content">
          <div className="content-header">
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search tasks..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn-primary" onClick={() => {
              setTaskToEdit(null);
              setIsModalOpen(true);
            }}>
              + Add Task
            </button>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className="task-grid">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskCard 
                    key={task._id} 
                    task={task} 
                    onEdit={(t) => {
                      setTaskToEdit(t);
                      setIsModalOpen(true);
                    }} 
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <p>No tasks found. Start by creating a new task!</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleCreateOrUpdateTask}
        taskToEdit={taskToEdit}
      />
      
      <NotificationToast 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ message: '', type: '' })} 
      />
    </div>
  );
};

export default Dashboard;
