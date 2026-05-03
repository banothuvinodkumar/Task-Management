import React from 'react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'In-progress': return 'status-in-progress';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-info">
        <span className="task-due-date">Due: {formatDate(task.dueDate)}</span>
        <span className={`status-badge ${getStatusClass(task.status)}`}>
          {task.status}
        </span>
      </div>
      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className="status-select"
        >
          <option value="Pending">Pending</option>
          <option value="In-progress">In-progress</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="btn-group">
          <button onClick={() => onEdit(task)} className="btn-edit">Edit</button>
          <button onClick={() => onDelete(task._id)} className="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
