import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditBiography.css';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft } from 'react-icons/fa';

// Import custom SVG icons
import editIcon from '../../assets/images/icon-edit.svg';
import editBiographyIcon from '../../assets/images/icon-Edit Biography.svg';

const EditBiography = ({ onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Kristine Joy Arellano',
    displayName: 'K. J. Arellano',
    email: 'kbarellano3@up.edu.ph',
    pronouns: 'She/Her',
    scholarLink: 'https://scholar.google.com/citations?user=example'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({});
  
  // Ensure the component is properly mounted with sidebar and footer
  useEffect(() => {
    document.title = 'FRIS - Edit Biography';
    
    // Prevent navigation away from this page
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Fix the issue with the sidebar and footer not showing
    setTimeout(() => {
      // Force sidebar to be visible
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.style.display = 'flex';
        sidebar.style.visibility = 'visible';
        sidebar.style.opacity = '1';
        sidebar.style.zIndex = '1000';
        sidebar.style.position = 'fixed';
      }
      
      // Force footer to be visible
      const footer = document.querySelector('.footer');
      if (footer) {
        footer.style.display = 'flex';
        footer.style.visibility = 'visible';
        footer.style.opacity = '1';
        footer.style.zIndex = '1000';
        footer.style.position = 'relative';
      }
    }, 100);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  const handleEdit = () => {
    setOriginalData({...formData}); // Save original data for cancel
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setFormData({...originalData}); // Restore original data
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    setIsEditing(false); // Exit edit mode after saving
  };

  return (
    <div className="edit-biography-root">
      <Sidebar onLogout={onLogout} />
      
      <main className="edit-biography-main">
        {/* Go Back Button */}
        <div className="go-back-button">
          <button onClick={() => navigate('/home')}>
            <FaArrowLeft /> Go Back
          </button>
        </div>
        
        <div className="edit-biography-header">
          <h1>Edit Biography</h1>
        </div>
        
        <div className="edit-biography-content">
          <form onSubmit={handleSubmit} className="biography-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="How your name will appear in publications and submissions"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="pronouns">Pronouns</label>
              <input
                type="text"
                id="pronouns"
                name="pronouns"
                value={formData.pronouns}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="scholarLink">Google Scholar Link</label>
              <input
                type="url"
                id="scholarLink"
                name="scholarLink"
                value={formData.scholarLink}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="https://scholar.google.com/citations?user=example"
              />
            </div>
            
            <div className="form-actions">
              {isEditing ? (
                <>
                  <button type="button" className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    <img src={editIcon} alt="Save" className="button-icon" /> Save Changes
                  </button>
                </>
              ) : (
                <button type="button" className="edit-btn" onClick={handleEdit}>
                  <img src={editBiographyIcon} alt="Edit" className="button-icon" /> Edit
                </button>
              )}
            </div>
          </form>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default EditBiography;
