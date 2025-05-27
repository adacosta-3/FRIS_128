import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft, FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './EditBiography.css';

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
    setOriginalData({...formData}); // Initialize original data
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Get token from localStorage for authentication
    const token = localStorage.getItem('token');
    
    try {
      // Convert formData to UserUpdateDto format expected by the backend
      const userUpdateDto = {
        name: formData.name,
        email: formData.email,
        pronouns: formData.pronouns,
        scholarLink: formData.scholarLink,
        researchInterests: formData.researchInterest,
        educationalBackground: formData.educationalBackground,
        researchExperience: formData.researchExperience
      };
      
      // Send the data to the backend API using the correct endpoint
      const response = await fetch('http://localhost:8080/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userUpdateDto)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update biography');
      }
      
      // Show success message
      alert('Biography updated successfully!');
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error updating biography:', error);
      alert('Failed to update biography. Please try again.');
    }
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
          {!isEditing ? (
            <button className="edit-button" onClick={handleEdit}>
              <FaEdit /> Edit
            </button>
          ) : (
            <div className="edit-actions">
              <button className="cancel-button" onClick={handleCancel}>
                <FaTimes /> Cancel
              </button>
              <button className="save-button" onClick={handleSubmit}>
                <FaSave /> Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="edit-biography-content">
          <form onSubmit={handleSubmit} className="biography-form">
            <div className="form-section">
              <h2>Personal Information</h2>
              <div className="form-row">
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
                    className={isEditing ? 'editable' : ''}
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
                    className={isEditing ? 'editable' : ''}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pronouns">Pronouns</label>
                  <input
                    type="text"
                    id="pronouns"
                    name="pronouns"
                    value={formData.pronouns}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={isEditing ? 'editable' : ''}
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
                    className={isEditing ? 'editable' : ''}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Research Interests</h2>
              <div className="form-group">
                <label htmlFor="researchInterest">Research Interests</label>
                <textarea
                  id="researchInterest"
                  name="researchInterest"
                  value={formData.researchInterest}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  className={isEditing ? 'editable' : ''}
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Educational Background</h2>
              {formData.educationalBackground.map((edu, index) => (
                <div key={edu.id} className="education-item">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleArrayItemChange('educationalBackground', index, 'degree', e.target.value)}
                        disabled={!isEditing}
                        required
                        className={isEditing ? 'editable' : ''}
                      />
                    </div>
                    <div className="form-group">
                      <label>School</label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => handleArrayItemChange('educationalBackground', index, 'school', e.target.value)}
                        disabled={!isEditing}
                        required
                        className={isEditing ? 'editable' : ''}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Year Graduated</label>
                      <input
                        type="text"
                        value={edu.yearGraduated}
                        onChange={(e) => handleArrayItemChange('educationalBackground', index, 'yearGraduated', e.target.value)}
                        disabled={!isEditing}
                        required
                        className={isEditing ? 'editable' : ''}
                      />
                    </div>
                    <div className="form-group">
                      <label>Degree Type</label>
                      <select
                        value={edu.degreeType}
                        onChange={(e) => handleArrayItemChange('educationalBackground', index, 'degreeType', e.target.value)}
                        disabled={!isEditing}
                        required
                        className={isEditing ? 'editable' : ''}
                      >
                        <option value="Bachelor's">Bachelor's</option>
                        <option value="Master's">Master's</option>
                        <option value="Doctorate">Doctorate</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    {isEditing && (
                      <div className="form-group action-buttons">
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => handleRemoveItem('educationalBackground', edu.id)}
                          disabled={formData.educationalBackground.length <= 1}
                        >
                          <FaTrash /> Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isEditing && (
                <button
                  type="button"
                  className="add-button"
                  onClick={() => handleAddItem('educationalBackground')}
                >
                  <FaPlus /> Add Education
                </button>
              )}
            </div>

            <div className="form-section">
              <h2>Research Experience</h2>
              {formData.researchExperience.map((exp, index) => (
                <div key={exp.id} className="experience-item">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleArrayItemChange('researchExperience', index, 'location', e.target.value)}
                        disabled={!isEditing}
                        required
                        className={isEditing ? 'editable' : ''}
                      />
                    </div>
                    <div className="form-group">
                      <label>Date Range</label>
                      <input
                        type="text"
                        value={exp.dateRange}
                        onChange={(e) => handleArrayItemChange('researchExperience', index, 'dateRange', e.target.value)}
                        disabled={!isEditing}
                        required
                        className={isEditing ? 'editable' : ''}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Affiliations</label>
                      <input
                        type="text"
                        value={exp.affiliations}
                        onChange={(e) => handleArrayItemChange('researchExperience', index, 'affiliations', e.target.value)}
                        disabled={!isEditing}
                        className={isEditing ? 'editable' : ''}
                      />
                    </div>
                    {isEditing && (
                      <div className="form-group action-buttons">
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => handleRemoveItem('researchExperience', exp.id)}
                          disabled={formData.researchExperience.length <= 1}
                        >
                          <FaTrash /> Remove
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="form-row">
                    <div className="form-group full-width">
                      <label>Details</label>
                      <textarea
                        value={exp.details}
                        onChange={(e) => handleArrayItemChange('researchExperience', index, 'details', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        className={isEditing ? 'editable' : ''}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {isEditing && (
                <button
                  type="button"
                  className="add-button"
                  onClick={() => handleAddItem('researchExperience')}
                >
                  <FaPlus /> Add Research Experience
                </button>
              )}
            </div>

            {isEditing && (
              <div className="form-actions-bottom">
                <button type="button" className="cancel-button" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="save-button">
                  <FaSave /> Save Changes
                </button>
              </div>
            )}
          </form>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default EditBiography;
