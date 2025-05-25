import React from 'react';
import './LogoutConfirmation.css';

const LogoutConfirmation = ({ onCancel, onConfirm }) => {
  return (
    <div className="logout-overlay">
      <div className="logout-modal">
        <p>Are you sure you want to exit?</p>
        <div className="logout-buttons">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
