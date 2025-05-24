import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Sidebar.css';
import { FaHome, FaBell, FaFlask, FaChalkboardTeacher, FaHandsHelping, FaUserCircle, FaChevronLeft, FaChevronRight, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import logo from '../../images/sidebar logo.png';
import AccountPopup from './AccountPopup';

const Sidebar = ({ onLogout }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };
  
  const confirmLogout = () => {
    // Perform logout actions here
    onLogout();
    navigate('/');
    setShowLogoutConfirm(false);
  };
  
  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Main navigation items (Part 2)
  const navItems = [
    { icon: <FaHome className="nav-icon" />, label: 'Home', path: '/home' },
    { icon: <FaBell className="nav-icon" />, label: 'Notifications', path: '/notifications' },
    { icon: <FaFlask className="nav-icon" />, label: 'Research Activities', path: '/research' },
    { icon: <FaChalkboardTeacher className="nav-icon" />, label: 'Teaching Activities', path: '/teaching' },
    { icon: <FaHandsHelping className="nav-icon" />, label: 'Public Service', path: '/public' }
  ];
  
  // Approval items (Part 3)
  const approvalItems = [
    { icon: <FaClipboardList className="nav-icon" />, label: 'My Requests', path: '/requests' }
  ];

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
      
      {/* Part 1: Logo and Profile */}
      <div className="sidebar-header">
        <div className="logo-container">
          <img src={logo} alt="FRIS Logo" className="sidebar-logo" />
          {isExpanded && <span className="logo-text">FRIS</span>}
        </div>
        <div className="sidebar-profile">
          <div 
            className={`profile-info ${!isExpanded ? 'centered' : ''}`} 
            onClick={() => setShowAccountPopup(true)}
          >
            <FaUserCircle className="profile-icon" />
            {isExpanded && (
              <div className="user-info">
                <div className="user-badge">kbarellano3 [Faculty]</div>
                <span className="user-name">Kristine Joy Arellano</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Part 2: Main Navigation + Part 3: Approval (directly beneath Public Service) */}
      <nav className="sidebar-nav">
        <ul>
          {/* Main navigation items */}
          {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className="nav-link">
                {item.icon}
                {isExpanded && <span className="nav-label">{item.label}</span>}
              </Link>
            </li>
          ))}
          
          {/* Approval section - directly beneath Public Service */}
          <li className="approval-section">
            <span className="approval-header">Approval</span>
          </li>
          
          {/* Approval items */}
          {approvalItems.map((item, index) => (
            <li key={`approval-${index}`}>
              <Link to={item.path} className="nav-link">
                {item.icon}
                {isExpanded && <span className="nav-label">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Part 4: Logout at bottom */}
      <div className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt className="nav-icon" />
        {isExpanded && <span className="nav-label">Log Out</span>}
      </div>
      
      {/* Logout confirmation popup */}
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
      
      <AccountPopup 
        isOpen={showAccountPopup} 
        onClose={() => setShowAccountPopup(false)}
        isSidebarExpanded={isExpanded}
      />
    </div>
  );
};

export default Sidebar;
