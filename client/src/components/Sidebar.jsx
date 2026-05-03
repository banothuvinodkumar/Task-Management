import React from 'react';

const Sidebar = ({ currentFilter, setFilter, stats }) => {
  const filters = ['All', 'Pending', 'In-progress', 'Completed'];

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>Filters</h3>
        <ul>
          {filters.map((filter) => (
            <li
              key={filter}
              className={currentFilter === filter ? 'active' : ''}
              onClick={() => setFilter(filter)}
            >
              {filter}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Statistics</h3>
        <div className="stats-container">
          <div className="stat-item">
            <span>Total:</span>
            <span>{stats.total}</span>
          </div>
          <div className="stat-item">
            <span>Pending:</span>
            <span>{stats.pending}</span>
          </div>
          <div className="stat-item">
            <span>In-progress:</span>
            <span>{stats.inProgress}</span>
          </div>
          <div className="stat-item">
            <span>Completed:</span>
            <span>{stats.completed}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
