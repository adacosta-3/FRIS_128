import React, { useState, useEffect, useRef } from 'react';
import './GoogleScholarPopup.css';

const GoogleScholarPopup = ({ isOpen, onClose, onSave }) => {
  const [url, setUrl] = useState('');
  const inputRef = useRef(null);
  const popupRef = useRef(null);
  
  // Function to properly close the popup
  const handleClose = () => {
    if (popupRef.current) {
      popupRef.current.style.display = 'none';
      popupRef.current.style.zIndex = '-1';
      popupRef.current.style.opacity = '0';
      popupRef.current.style.visibility = 'hidden';
    }
    document.body.style.overflow = '';
    
    // Call the global close function if available
    if (window.closeGoogleScholarPopup) {
      window.closeGoogleScholarPopup();
    }
    
    // Also call the local onClose prop
    onClose();
  };
  
  // Ensure popup is visible when isOpen is true
  useEffect(() => {
    if (isOpen) {
      console.log('Google Scholar popup is now open');
      // Force the popup to be visible and on top
      document.body.style.overflow = 'hidden'; // Prevent scrolling behind popup
      
      // Ensure the popup is visible by adding it to the DOM
      if (popupRef.current) {
        popupRef.current.style.display = 'flex';
        popupRef.current.style.zIndex = '3000';
        popupRef.current.style.opacity = '1';
        popupRef.current.style.visibility = 'visible';
      }
      
      // Focus the input field when popup opens
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } else {
      // Reset body overflow when popup is closed
      document.body.style.overflow = '';
      
      // Hide the popup when closed
      if (popupRef.current) {
        popupRef.current.style.display = 'none';
        popupRef.current.style.zIndex = '-1';
        popupRef.current.style.opacity = '0';
        popupRef.current.style.visibility = 'hidden';
      }
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(url);
    handleClose();
  };

  if (!isOpen) {
    // If not open, ensure the popup is hidden
    if (popupRef.current) {
      popupRef.current.style.display = 'none';
      popupRef.current.style.visibility = 'hidden';
    }
    return null;
  }
  
  return (
    <div ref={popupRef} className="google-scholar-overlay" onClick={handleClose}>
      <div className="google-scholar-popup" onClick={(e) => e.stopPropagation()}>
        <div className="google-scholar-header">
          <h3>Link Google Scholar</h3>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="scholarUrl">Google Scholar URL</label>
            <input 
              type="url" 
              id="scholarUrl" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://scholar.google.com/citations?user=..."
              required
              ref={inputRef}
            />
          </div>
          <div className="popup-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoogleScholarPopup;
