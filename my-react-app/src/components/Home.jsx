import React, { useState } from 'react';
import './Home.css';
import Sidebar from './Sidebar';
import Footer from './Footer';
import GoogleScholarPopup from './GoogleScholarPopup';
import oblation from '../../images/oblation.png';
import frisLogo from '../../images/FRIS Logo.png';

// Import custom SVG icons
import coursesIcon from '../../assets/images/icon-courses this semester.svg';
import projectsIcon from '../../assets/images/icon-total projects.svg';
import publicationsIcon from '../../assets/images/icon-total publications.svg';
import pendingRequestsIcon from '../../assets/images/icon-pending requests.svg';

const Home = ({ onLogout }) => {
  const [showScholarPopup, setShowScholarPopup] = useState(false);
  const [scholarUrl, setScholarUrl] = useState('');
  
  // Make the showScholarPopup state available globally
  window.showGoogleScholarPopup = () => {
    setShowScholarPopup(true);
  };
  
  window.closeGoogleScholarPopup = () => {
    setShowScholarPopup(false);
  };

  const handleSaveScholar = (url) => {
    setScholarUrl(url);
    console.log('Google Scholar URL saved:', url);
    // In a real app, you would save this to the user's profile
  };

  const stats = [
    { id: 1, label: 'Total Publications', value: '12', icon: <img src={publicationsIcon} alt="Publications" className="stat-icon-img" /> },
    { id: 2, label: 'Total Projects', value: '2', icon: <img src={projectsIcon} alt="Projects" className="stat-icon-img" /> },
    { id: 3, label: 'Courses This Semester', value: '3', icon: <img src={coursesIcon} alt="Courses" className="stat-icon-img" /> },
    { id: 4, label: 'Pending Requests', value: '5', icon: <img src={pendingRequestsIcon} alt="Pending Requests" className="stat-icon-img" />, highlight: true }
  ];



  return (
    <div className="home-root">
      <Sidebar onLogout={onLogout} />
      <GoogleScholarPopup 
        isOpen={showScholarPopup} 
        onClose={() => setShowScholarPopup(false)} 
        onSave={handleSaveScholar}
      />

      {/* Main Content */}
      <main className="home-main">
        {/* Hero Section with Background */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-logo">
              <img 
                src={frisLogo} 
                alt="FRIS Logo" 
                className="fris-logo"
                style={{ 
                  transform: 'scale(2)',
                  width: '100%', // Increased from 100% to 200%
                  maxWidth: '1500px', // Optionally increase maxWidth as well
                  objectFit: 'contain',
                  marginTop: '7rem',
                  marginLeft: '-20px',
                  alignSelf: 'flex-start',
                  marginBottom: '1rem',
                  position: 'relative',
                  zIndex: 2
                }}

              />
              <h1 style={{
                width: '100%',
                fontSize: '4rem', /* Reduced from 11.25rem */
                color: 'white',
                marginLeft: '400px !important',
                fontWeight: 700,
                lineHeight: 1.5,
                textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5), 6px 6px 15px rgba(0, 0, 0, 1), 3px 3px 10px rgba(0, 0, 0, 0.9), 0px 0px 20px rgba(0, 0, 0, 0.7)',
                margin: 0,
                position: 'relative',
                zIndex: 2
              }}>
                Faculty and REPS<br />Information System
              </h1>
            </div>
            <div className="welcome-message">
              <span>Welcome back,</span>
              <span 
                className="welcome-name"
                style={{
                  color: '#F49928', /* Updated from yellow to #F49928 */
                  fontWeight: 700,
                  textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5)'
                }}
              >
                Kristine Joy!
              </span>
            </div>
          </div>
        </section>

        {/* At a Glance */}
        <section className="at-a-glance-section">
          <h2>At a Glance</h2>
          <div className="stats-cards-row">
            {stats.map(stat => (
              <div className="stat-card" key={stat.id}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <div className="stat-label">{stat.label}</div>
                  <div 
                    className="stat-value"
                    style={stat.highlight ? { color: '#F49928', fontWeight: 700 } : {}}
                  >
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>



        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default Home;

