import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Sidebar.css';
import AccountPopup from './AccountPopup';
import { FaUserCircle } from 'react-icons/fa';

// Import custom SVG icons
import homeIcon from '../../assets/images/icon-home.svg';
import notificationsIcon from '../../assets/images/icon-notifications.svg';
import researchIcon from '../../assets/images/icon-research activities.svg';
import teachingIcon from '../../assets/images/icon-teaching activities.svg';
import publicServiceIcon from '../../assets/images/icon-public service.svg';
import myRequestsIcon from '../../assets/images/icon-my requests.svg';
import logoutIcon from '../../assets/images/icon-logout.svg';
import sidebarToggleIcon from '../../assets/images/icon-Sidebar toggle.svg';
import logo from '../../images/sidebar logo.png';

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
    { path: '/home', label: 'Home', icon: <img src={homeIcon} alt="Home" className="nav-icon" /> },
    { path: '/notifications', label: 'Notifications', icon: <img src={notificationsIcon} alt="Notifications" className="nav-icon" /> },
    { path: '/research', label: 'Research Activities', icon: <img src={researchIcon} alt="Research" className="nav-icon" /> },
    { path: '/teaching', label: 'Teaching Activities', icon: <img src={teachingIcon} alt="Teaching" className="nav-icon" /> },
    { path: '/public', label: 'Public Service', icon: <img src={publicServiceIcon} alt="Public Service" className="nav-icon" /> }
  ];
  
  // Approval items (Part 3)
  const approvalItems = [
    { path: '/requests', label: 'My Requests', icon: <img src={myRequestsIcon} alt="My Requests" className="nav-icon" /> }
  ];

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <img src={sidebarToggleIcon} alt="Toggle Sidebar" className="toggle-icon" />
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
            <div className="profile-icon">
              <FaUserCircle className="profile-icon-svg" />
            </div>
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
                <div className="nav-icon-container">
                  {item.icon}
                </div>
                {isExpanded && <span className="nav-label">{item.label}</span>}
              </Link>
            </li>
          ))}
          {/* Approval section - directly beneath Public Service */}
          <li className={`approval-section ${!isExpanded ? 'centered' : 'left-aligned'}`}>
            <div className={`approval-header ${!isExpanded ? 'centered' : 'left-aligned'}`}>
              <span>Approval</span>
            </div>
          </li>
          
          {/* Approval items */}
          {approvalItems.map((item, index) => (
            <li key={`approval-${index}`}>
              <Link to={item.path} className="nav-link">
                <div className="nav-icon-container">
                  {item.icon}
                </div>
                {isExpanded && <span className="nav-label">{item.label}</span>}
              </Link>
            </li>
          ))}
          
          {/* Logout Button */}
          <li className="logout-item">
            <button className="nav-link logout-btn" onClick={handleLogout}>
              <div className="nav-icon-container">
                <img src={logoutIcon} alt="Logout" className="nav-icon" />
              </div>
              {isExpanded && <span className="nav-label">Logout</span>}
            </button>
          </li>
        </ul>
      </nav>

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
