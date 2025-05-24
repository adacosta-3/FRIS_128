import React from 'react';
import { FaUserEdit, FaLink, FaChevronRight } from 'react-icons/fa';
import './AccountPopup.css';

const AccountPopup = ({ isOpen, onClose, isSidebarExpanded }) => {
  if (!isOpen) return null;

  return (
    <div className="account-popup-overlay" onClick={onClose}>
      <div className={`account-popup ${isSidebarExpanded ? 'sidebar-expanded' : ''}`} onClick={e => e.stopPropagation()}>
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
          <div className="account-option">
            <div className="option-icon">
              <FaUserEdit />
            </div>
            <div className="option-text">Edit Biography</div>
            <div className="option-arrow">
              <FaChevronRight />
            </div>
          </div>
          
          <div className="account-option">
            <div className="option-icon">
              <FaLink />
            </div>
            <div className="option-text">Google Scholar Link</div>
            <div className="option-arrow">
              <FaChevronRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPopup;
