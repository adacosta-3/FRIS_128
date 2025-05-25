import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountPopup.css';
import GoogleScholarPopup from './GoogleScholarPopup';

// Import custom SVG icons
import editBiographyIcon from '../../assets/images/icon-Edit Biography.svg';
import linkIcon from '../../assets/images/icon-link.svg';

const AccountPopup = ({ isOpen, onClose, isSidebarExpanded }) => {
  const navigate = useNavigate();
  const [showScholarPopup, setShowScholarPopup] = useState(false);
  const [scholarUrl, setScholarUrl] = useState('');
  
  // Reference to track if component is mounted
  const isMounted = useRef(true);
  
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // Reset the Google Scholar popup state when the account popup is closed
  useEffect(() => {
    if (!isOpen) {
      setShowScholarPopup(false);
    }
  }, [isOpen]);
  
  // Add global event listener to handle Google Scholar popup
  useEffect(() => {
    const handleGoogleScholarPopup = () => {
      if (showScholarPopup) {
        const popup = document.querySelector('.google-scholar-overlay');
        if (popup) {
          popup.style.display = 'flex';
          popup.style.zIndex = '3000';
          popup.style.opacity = '1';
          popup.style.visibility = 'visible';
        }
      }
    };
    
    handleGoogleScholarPopup();
    
    // Add event listener for when the DOM updates
    window.addEventListener('DOMContentLoaded', handleGoogleScholarPopup);
    
    return () => {
      window.removeEventListener('DOMContentLoaded', handleGoogleScholarPopup);
    };
  }, [showScholarPopup]);

  const handleSaveScholar = (url) => {
    setScholarUrl(url);
    console.log('Google Scholar URL saved:', url);
    // In a real app, you would save this to the user's profile
  };

  if (!isOpen) return null;

  return (
    <>
      <GoogleScholarPopup 
        isOpen={showScholarPopup} 
        onClose={() => setShowScholarPopup(false)} 
        onSave={handleSaveScholar}
      />
      <div className="account-popup-overlay" onClick={onClose}>
        <div 
          className={`account-popup ${isSidebarExpanded ? 'sidebar-expanded' : ''}`} 
          onClick={e => e.stopPropagation()}
        >
          <div className="account-header">
            <div className="account-profile">
              <img src="/profile-placeholder.jpg" alt="Profile" className="account-avatar" />
              <div className="account-info">
                <div className="account-badge">kbarellano3 [Faculty]</div>
                <div className="account-name">Kristine Joy Arellano</div>
              </div>
            </div>
          </div>
          
          <div className="account-options">
            <div 
              className="account-option"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose(); // Close the account popup
                // Use React Router navigate instead of changing window.location
                navigate('/edit-biography');
              }}
            >
              <img src={editBiographyIcon} alt="Edit" className="option-icon" />
              <span className="option-text">Edit Biography</span>
              <span className="option-arrow">›</span>
            </div>
            <div 
              className="account-option"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                e.preventDefault();
                
                // First close the account popup
                onClose();
                
                // Then trigger the Google Scholar popup using the global function
                if (window.showGoogleScholarPopup) {
                  window.showGoogleScholarPopup();
                  console.log('Called global showGoogleScholarPopup function');
                } else {
                  console.error('Global showGoogleScholarPopup function not found');
                }
              }}
            >
              <img src={linkIcon} alt="Link" className="option-icon" />
              <span className="option-text">Link Google Scholar</span>
              <span className="option-arrow">›</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPopup;
