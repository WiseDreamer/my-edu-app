import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="dashboard-nav">
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/dashboard/modules">Modules</Link></li>
        <li><Link to="/dashboard/progress">Progress</Link></li>
        <li><Link to="/dashboard/community">Community Chat</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
