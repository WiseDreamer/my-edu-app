// ModuleCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModuleCard = ({ module }) => {
  const navigate = useNavigate();
  // Pre-defined background colors for variety.
  const colors = ['#e8eaf6', '#fce4ec', '#e8f5e9', '#fff3e0'];
  const backgroundColor = colors[module.id % colors.length];

  const handleClick = () => {
    // Pass module title (and any other data) as state
    navigate(`/module/${module.id}`, { state: { title: module.title } });
  };

  return (
    <div
      className="module-card"
      style={{ backgroundColor, minHeight: '250px' }}
      onClick={handleClick}
    >
      <h3>{module.title}</h3>
      <div className="continue-learning">Continue Learning</div>
    </div>
  );
};

export default ModuleCard;
