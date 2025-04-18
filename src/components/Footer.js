import React from 'react';
import { FaFacebook, FaTiktok, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="dashboard-footer">
      <div className="social-icons">
        <FaFacebook size={24} title="Facebook" />
        <FaTiktok size={24} title="TikTok" />
        <FaInstagram size={24} title="Instagram" />
      </div>
      <p>&copy; 2025 My Edu App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
