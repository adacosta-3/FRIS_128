import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import AccountPopup from './AccountPopup';
import { FaUserCircle } from 'react-icons/fa';

const Sidebar = ({ onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => setShowLogoutConfirm(true);
  const confirmLogout = () => {
    onLogout();
    navigate('/');
    setShowLogoutConfirm(false);
  };
  const cancelLogout = () => setShowLogoutConfirm(false);

  const navItems = [
    { path: '/home', label: 'Home', iconClass: 'icon-home-alt' },
    { path: '/notifications', label: 'Notifications', iconClass: 'icon-bell' },
    { path: '/research', label: 'Research Activities', iconClass: 'icon-book-open' },
    { path: '/teaching', label: 'Teaching Activities', iconClass: 'icon-chalkboard' },
    { path: '/public', label: 'Public Service', iconClass: 'icon-globe' },
  ];

  const approvalItems = [
    { path: '/requests', label: 'My Requests', iconClass: 'icon-file' },
    { path: '/approval-tasks', label: 'Approval Tasks', iconClass: 'fa fa-check-square' }
  ];

  const adminItems = [
    { path: '/admin', label: 'Admin Dashboard', iconClass: 'fa fa-shield' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar-folded">
      <div className="header-body">
        <div className="header">
          <div className="logo" />
        </div>

        <div className="frame">
          <div className="account centered-profile" onClick={() => setShowAccountPopup(true)}>
            <div className="profile-icon-wrapper">
              <FaUserCircle className="profile-icon-svg" />
            </div>
          </div>

          <div className="main-pages">
            {navItems.map((item, index) => (
              <div key={index} className={`nav-item-wrapper ${item.label.toLowerCase().replace(/\s/g, '-')}`}>
                <Link to={item.path} className={`nav-link-item ${isActive(item.path) ? 'active' : ''}`}>
                  <div className={`nav-icon-bg ${item.iconClass}`} />
                </Link>
              </div>
            ))}
          </div>

          <div className="divider" />

          <div className="spaces">
            <div className="page">
              <span className="approval">Approval</span>
              {approvalItems.map((item, index) => (
                <div key={`approval-${index}`} className={`nav-item-wrapper ${item.label.toLowerCase().replace(/\s/g, '-')}`}>
                  <Link to={item.path} className={`nav-link-item ${isActive(item.path) ? 'active' : ''}`}>
                    <div className={`nav-icon-bg ${item.iconClass}`} />
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="page">
              <span className="approval">Admin</span>
              {adminItems.map((item, index) => (
                <div key={`admin-${index}`} className={`nav-item-wrapper ${item.label.toLowerCase().replace(/\s/g, '-')}`}>
                  <Link to={item.path} className={`nav-link-item ${isActive(item.path) ? 'active' : ''}`}>
                    <div className={`nav-icon-bg ${item.iconClass}`} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="divider-7" />

          <div className="secondary-pages">
            <div className="log-out">
            <button className="nav-link-item logout-btn" onClick={handleLogout}>
              <div className="nav-icon-bg icon-log-out" />
            </button>
          </div>
          </div>

        </div>
      </div>

      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-popup">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="logout-confirm-buttons">
              <button onClick={cancelLogout}>Cancel</button>
              <button onClick={confirmLogout} className="confirm-btn">Logout</button>
            </div>
          </div>
        </div>
      )}

      <AccountPopup isOpen={showAccountPopup} onClose={() => setShowAccountPopup(false)} />
    </div>
  );
};

export default Sidebar;