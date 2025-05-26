import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditBiography.css';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';

// Import custom SVG icons
import editIcon from '../../assets/images/icon-edit.svg';
import editBiographyIcon from '../../assets/images/icon-Edit Biography.svg';

const EditBiography = ({ onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Kristine Joy Arellano',
    email: 'kbarellano3@up.edu.ph',
    pronouns: 'She/Her',
    scholarLink: 'https://scholar.google.com/citations?user=example',
    researchInterest: 'Machine Learning, Artificial Intelligence, Data Science',
    educationalBackground: [
      { id: 1, degree: 'BS Computer Science', school: 'University of the Philippines', yearGraduated: '2018', degreeType: 'Bachelor\'s' }
    ],
    researchExperience: [
      { id: 1, location: 'UP Diliman', dateRange: '2019-2021', details: 'Research on AI applications in healthcare', affiliations: 'UP AI Lab' }
    ]
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

  // Handle changes to array fields like educational background and research experience
  const handleArrayItemChange = (arrayName, index, field, value) => {
    setFormData(prev => {
      const newArray = [...prev[arrayName]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  // Add a new item to an array field
  const handleAddItem = (arrayName) => {
    setFormData(prev => {
      const newId = prev[arrayName].length > 0 
        ? Math.max(...prev[arrayName].map(item => item.id)) + 1 
        : 1;
      
      let newItem;
      if (arrayName === 'educationalBackground') {
        newItem = { id: newId, degree: '', school: '', yearGraduated: '', degreeType: 'Bachelor\'s' };
      } else if (arrayName === 'researchExperience') {
        newItem = { id: newId, location: '', dateRange: '', details: '', affiliations: '' };
      }
      
      return { ...prev, [arrayName]: [...prev[arrayName], newItem] };
    });
  };

  // Remove an item from an array field
  const handleRemoveItem = (arrayName, id) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter(item => item.id !== id)
    }));
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

            <div className="form-group">
              <label htmlFor="researchInterest">Research Interest</label>
              <input
                type="text"
                id="researchInterest"
                name="researchInterest"
                value={formData.researchInterest}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="e.g., Machine Learning, Data Science"
              />
            </div>

            {/* Educational Background Section */}
            <div className="form-section">
              <h3>Educational Background</h3>
              {formData.educationalBackground.map((edu, index) => (
                <div key={edu.id} className="array-item-container">
                  <div className="form-group">
                    <label htmlFor={`degree-${index}`}>Degree</label>
                    <input
                      type="text"
                      id={`degree-${index}`}
                      value={edu.degree}
                      onChange={(e) => handleArrayItemChange('educationalBackground', index, 'degree', e.target.value)}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`school-${index}`}>School/University</label>
                    <input
                      type="text"
                      id={`school-${index}`}
                      value={edu.school}
                      onChange={(e) => handleArrayItemChange('educationalBackground', index, 'school', e.target.value)}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`yearGraduated-${index}`}>Year Graduated</label>
                    <input
                      type="text"
                      id={`yearGraduated-${index}`}
                      value={edu.yearGraduated}
                      onChange={(e) => handleArrayItemChange('educationalBackground', index, 'yearGraduated', e.target.value)}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`degreeType-${index}`}>Degree Type</label>
                    <select
                      id={`degreeType-${index}`}
                      value={edu.degreeType}
                      onChange={(e) => handleArrayItemChange('educationalBackground', index, 'degreeType', e.target.value)}
                      disabled={!isEditing}
                      required
                    >
                      <option value="Bachelor's">Bachelor's</option>
                      <option value="Master's">Master's</option>
                      <option value="Doctoral">Doctoral</option>
                    </select>
                  </div>
                  
                  {isEditing && (
                    <button 
                      type="button" 
                      className="remove-item-btn"
                      onClick={() => handleRemoveItem('educationalBackground', edu.id)}
                    >
                      <FaTrash /> Remove
                    </button>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <button 
                  type="button" 
                  className="add-item-btn"
                  onClick={() => handleAddItem('educationalBackground')}
                >
                  <FaPlus /> Add Educational Background
                </button>
              )}
            </div>

            {/* Research Experience Section */}
            <div className="form-section">
              <h3>Research Experience</h3>
              {formData.researchExperience.map((exp, index) => (
                <div key={exp.id} className="array-item-container">
                  <div className="form-group">
                    <label htmlFor={`location-${index}`}>Location</label>
                    <input
                      type="text"
                      id={`location-${index}`}
                      value={exp.location}
                      onChange={(e) => handleArrayItemChange('researchExperience', index, 'location', e.target.value)}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`dateRange-${index}`}>Start - End Date</label>
                    <input
                      type="text"
                      id={`dateRange-${index}`}
                      value={exp.dateRange}
                      onChange={(e) => handleArrayItemChange('researchExperience', index, 'dateRange', e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., 2019-2021"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`details-${index}`}>Research Experience Details</label>
                    <textarea
                      id={`details-${index}`}
                      value={exp.details}
                      onChange={(e) => handleArrayItemChange('researchExperience', index, 'details', e.target.value)}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`affiliations-${index}`}>Affiliations</label>
                    <input
                      type="text"
                      id={`affiliations-${index}`}
                      value={exp.affiliations}
                      onChange={(e) => handleArrayItemChange('researchExperience', index, 'affiliations', e.target.value)}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  
                  {isEditing && (
                    <button 
                      type="button" 
                      className="remove-item-btn"
                      onClick={() => handleRemoveItem('researchExperience', exp.id)}
                    >
                      <FaTrash /> Remove
                    </button>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <button 
                  type="button" 
                  className="add-item-btn"
                  onClick={() => handleAddItem('researchExperience')}
                >
                  <FaPlus /> Add Research Experience
                </button>
              )}
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
