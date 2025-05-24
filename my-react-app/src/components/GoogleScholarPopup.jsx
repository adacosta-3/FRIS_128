import React, { useState } from 'react';
import './GoogleScholarPopup.css';

const GoogleScholarPopup = ({ isOpen, onClose, onSave }) => {
  const [scholarUrl, setScholarUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(scholarUrl);
    onClose();
  };

  return (
    <div className="scholar-popup-overlay" onClick={onClose}>
      <div className="scholar-popup" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Link Google Scholar</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="url" 
              placeholder="Enter your Google Scholar"
              value={scholarUrl}
              onChange={(e) => setScholarUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="save-button">Save</button>
        </form>
      </div>
    </div>
  );
};

export default GoogleScholarPopup;
