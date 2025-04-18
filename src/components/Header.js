import React, { useState, useRef, useEffect } from 'react';
import { FaChartLine, FaComments, FaQuestionCircle } from 'react-icons/fa';
import ProfileMenu from './ProfileMenu';
import eduAppLogo from './edu-app-logo.jpg';
import './styles.css';

const Header = ({ toggleSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Retrieve user details (you could also use a global state or context)
  const firstName = localStorage.getItem('firstName') || '';
  const lastName  = localStorage.getItem('lastName') || '';
  const initials  = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'USER';

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
        <img src={eduAppLogo} alt="Logo" className="dashboard-logo" />
        <div className="dashboard-title-wrapper">
          <h1 className="dashboard-title">BrightPath</h1>
        </div>
      </div>
      <div className="header-right">
        <FaChartLine title="Progress" className="header-icon" style={{ color: '#28a745' }} />
        <FaComments title="Community Chat" className="header-icon" style={{ color: '#007bff' }} />
        <FaQuestionCircle title="Help" className="header-icon" style={{ color: '#dc3545' }} />
        <div className="profile-container" ref={profileMenuRef} onClick={() => setShowProfileMenu(!showProfileMenu)}>
          <div className="profile-icon">{initials}</div>
          {showProfileMenu && <ProfileMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
