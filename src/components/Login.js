// src/components/Login.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import eduAppLogo from './edu-app-logo.jpg'; // Adjust path as needed
import './styles.css';
import { FaFacebook, FaTiktok, FaInstagram } from 'react-icons/fa';
import { FaTrophy, FaNewspaper, FaInfoCircle, FaPhone, FaHandHoldingUsd } from 'react-icons/fa';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  //const auth = getAuth();

  // Collapse menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successful login: store uid (if needed) and navigate to dashboard
        localStorage.setItem('uid', userCredential.user.uid);
        navigate('/dashboard');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="header-left">
          <img src={eduAppLogo} alt="Logo" className="login-logo" />
        </div>
        <div className="header-center">
          <h1 className="login-title">BrightPath</h1>
          <p className="login-slogan">Your Gateway to Bright Learning.</p>
        </div>
        <div className="header-right">
          <div className="login-menu-container">
            <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
              ☰
            </button>
            {showMenu && (
              <div className="dropdown-menu" ref={menuRef}>
                <button onClick={() => alert('Top Achievers')}>
                  <FaTrophy style={{ marginRight: '8px' }} />
                  Top Achievers
                </button>
                <button onClick={() => alert('News & Events')}>
                  <FaNewspaper style={{ marginRight: '8px' }} />
                  News & Events
                </button>
                <button onClick={() => alert('About Us')}>
                  <FaInfoCircle style={{ marginRight: '8px' }} />
                  About Us
                </button>
                <button onClick={() => alert('Contact Us')}>
                  <FaPhone style={{ marginRight: '8px' }} />
                  Contact Us
                </button>
                <button onClick={() => alert('Donate')}>
                  <FaHandHoldingUsd style={{ marginRight: '8px' }} />
                  Donate
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <div className="login-extra">
              <span onClick={() => navigate('/register')}>Register</span>
              <span onClick={() => alert('Forgot Password')}>Forgot Password?</span>
            </div>
          </form>
        </div>
      </div>
      <footer className="login-footer">
        <div className="footer-icons">
          <FaFacebook size={24} title="Facebook" />
          <FaTiktok size={24} title="TikTok" />
          <FaInstagram size={24} title="Instagram" />
        </div>
        <div className="footer-copy">
          &copy; 2025 My Edu App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Login;
