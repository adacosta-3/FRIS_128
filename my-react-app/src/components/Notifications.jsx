import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft, FaCheck, FaTimes, FaFlask, FaChalkboardTeacher, FaHandsHelping } from 'react-icons/fa';
import './Notifications.css';

const Notifications = ({ onLogout }) => {
  const navigate = useNavigate();
  
  // Sample notifications data
  const notifications = [
    { 
      id: 1, 
      type: 'research', 
      status: 'approved', 
      title: 'Research Activity Approved - Visual Narratives in Philippine Folk Art',
      description: 'Your research project "Visual Narratives in Philippine Folk Art" has been approved. No further action is needed.',
      time: '9:41 AM',
      icon: <FaFlask />
    },
    { 
      id: 2, 
      type: 'teaching', 
      status: 'approved', 
      title: 'Teaching Activity Approved - ART 101: Fundamentals of Drawing (AY 2024-2025 Term 1)',
      description: 'Your teaching record for "ART 101: Fundamentals of Drawing (AY 2024-2025 Term 1)" has been successfully approved.',
      time: '9:41 AM',
      icon: <FaChalkboardTeacher />
    },
    { 
      id: 3, 
      type: 'research', 
      status: 'rejected', 
      title: 'Research Activity Rejected - The Role of Color in Political Posters',
      description: 'Your research entry "The Role of Color in Political Posters" was rejected. Please revise and re-submit for approval.',
      time: '9:41 AM',
      icon: <FaFlask />
    },
    { 
      id: 4, 
      type: 'public', 
      status: 'approved', 
      title: 'Public Service Approved - Community Mural Workshop in Tondo',
      description: 'Your outreach initiative "Community Mural Workshop in Tondo" has been reviewed and approved.',
      time: '9:41 AM',
      icon: <FaHandsHelping />
    },
    { 
      id: 5, 
      type: 'teaching', 
      status: 'rejected', 
      title: 'Teaching Activity Rejected - ART 203: History of Southeast Asian Art',
      description: 'Your teaching activity "ART 203: History of Southeast Asian Art" was not approved. Check the reviewer\'s comments and re-submit when ready.',
      time: '9:41 AM',
      icon: <FaChalkboardTeacher />
    }
  ];

  const getStatusIcon = (status) => {
    return status === 'approved' ? 
      <span className="status-icon approved"><FaCheck /></span> : 
      <span className="status-icon rejected"><FaTimes /></span>;
  };

  return (
    <div className="home-root">
      <Sidebar onLogout={onLogout} />
      
      {/* Main Content */}
      <main className="home-main notifications-main">
        {/* Go Back Button */}
        <div className="go-back-button">
          <button onClick={() => navigate('/home')}>
            <FaArrowLeft /> Go Back
          </button>
        </div>
        
        {/* Notifications Header */}
        <div className="notifications-header">
          <h1>Notifications</h1>
        </div>
        
        {/* Notifications List */}
        <div className="notifications-list">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.status}`}
            >
              <div className="notification-icon">
                {notification.icon}
              </div>
              <div className="notification-content">
                <div className="notification-title">
                  {getStatusIcon(notification.status)}
                  {notification.title}
                </div>
                <div className="notification-description">
                  {notification.description}
                </div>
              </div>
              <div className="notification-time">
                {notification.time}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default Notifications;
