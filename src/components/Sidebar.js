import React, { forwardRef } from 'react';
import '../styles.css';

const Sidebar = forwardRef(({ isOpen, toggleSidebar }, ref) => {
  return (
    <div ref={ref} className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-sidebar" onClick={toggleSidebar}>
        &times;
      </button>
      <ul>
        <li onClick={() => alert('My Modules')}>My Modules</li>
        <li onClick={() => alert('Resources')}>Resources</li>
        <li onClick={() => alert('Notifications')}>Notifications</li>
        <li onClick={() => alert('Leaderboards')}>Leaderboards</li>
        <li onClick={() => alert('My Journal')}>My Journal</li>
      </ul>
    </div>
  );
});

export default Sidebar;
