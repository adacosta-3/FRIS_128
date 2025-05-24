import React, { useState } from 'react';
import './EditBiography.css';
import Sidebar from './Sidebar';
import Footer from './Footer';

const EditBiography = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    name: 'Kristine Joy Arellano',
    email: 'kbarellano3@up.edu.ph',
    pronouns: 'She/Her'
  });

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
  };

  return (
    <div className="edit-biography-root">
      <Sidebar onLogout={onLogout} />
      
      <main className="edit-biography-main">
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
              />
            </div>
            
            <div className="form-actions">
              <button type="button" className="cancel-btn">Cancel</button>
              <button type="submit" className="save-btn">Save Changes</button>
            </div>
          </form>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default EditBiography;
