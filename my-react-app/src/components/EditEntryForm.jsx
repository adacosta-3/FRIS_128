import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft, FaCheck, FaFile, FaFileUpload } from 'react-icons/fa';
import './EditEntryForm.css';
import './FormStyles.css';

const EditEntryForm = ({ onLogout }) => {
  const navigate = useNavigate();
  const { entryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [entry, setEntry] = useState(null);
  const [formData, setFormData] = useState({
    sdg: '',
    targetRange: '',
    supportingDocument: null,
    supportingDocumentName: ''
  });

  // SDG options based on the 17 Sustainable Development Goals
  const sdgOptions = [
    { value: 'SDG 1', label: 'SDG 1: No Poverty' },
    { value: 'SDG 2', label: 'SDG 2: Zero Hunger' },
    { value: 'SDG 3', label: 'SDG 3: Good Health and Well-being' },
    { value: 'SDG 4', label: 'SDG 4: Quality Education' },
    { value: 'SDG 5', label: 'SDG 5: Gender Equality' },
    { value: 'SDG 6', label: 'SDG 6: Clean Water and Sanitation' },
    { value: 'SDG 7', label: 'SDG 7: Affordable and Clean Energy' },
    { value: 'SDG 8', label: 'SDG 8: Decent Work and Economic Growth' },
    { value: 'SDG 9', label: 'SDG 9: Industry, Innovation and Infrastructure' },
    { value: 'SDG 10', label: 'SDG 10: Reduced Inequality' },
    { value: 'SDG 11', label: 'SDG 11: Sustainable Cities and Communities' },
    { value: 'SDG 12', label: 'SDG 12: Responsible Consumption and Production' },
    { value: 'SDG 13', label: 'SDG 13: Climate Action' },
    { value: 'SDG 14', label: 'SDG 14: Life Below Water' },
    { value: 'SDG 15', label: 'SDG 15: Life on Land' },
    { value: 'SDG 16', label: 'SDG 16: Peace, Justice and Strong Institutions' },
    { value: 'SDG 17', label: 'SDG 17: Partnerships for the Goals' }
  ];

  // Fetch entry data from session storage or API
  useEffect(() => {
    // In a real application, you would fetch the entry data from an API
    // For demo purposes, we'll retrieve it from sessionStorage
    const savedState = JSON.parse(sessionStorage.getItem('multipleAddFormState') || '{}');
    
    if (savedState.entries && savedState.entries.length > 0) {
      // Find the entry with the matching ID
      const foundEntry = savedState.entries.find(
        (entry, index) => String(entry.id) === entryId || String(index) === entryId
      );
      
      if (foundEntry) {
        setEntry(foundEntry);
        // Pre-fill form data if the entry already has SDG or supporting document
        if (foundEntry.sdg || foundEntry.targetRange || foundEntry.supportingDocument) {
          setFormData({
            sdg: foundEntry.sdg || '',
            targetRange: foundEntry.targetRange || '',
            supportingDocument: null,
            supportingDocumentName: foundEntry.supportingDocumentName || ''
          });
        }
      }
    }
    
    setLoading(false);
  }, [entryId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        supportingDocument: file,
        supportingDocumentName: file.name
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!entry) {
      alert('Error: Entry not found');
      return;
    }
    
    // Update the entry with the new SDG and supporting document data
    const updatedEntry = {
      ...entry,
      sdg: formData.sdg,
      targetRange: formData.targetRange,
      supportingDocument: formData.supportingDocument ? true : entry.supportingDocument,
      supportingDocumentName: formData.supportingDocumentName || entry.supportingDocumentName
    };
    
    // In a real application, you would send the updated entry to your backend
    console.log('Updated entry:', updatedEntry);
    
    // Update the entry in sessionStorage
    const savedState = JSON.parse(sessionStorage.getItem('multipleAddFormState') || '{}');
    if (savedState.entries && savedState.entries.length > 0) {
      const updatedEntries = savedState.entries.map((e, index) => {
        if (String(e.id) === entryId || String(index) === entryId) {
          return updatedEntry;
        }
        return e;
      });
      
      sessionStorage.setItem('multipleAddFormState', JSON.stringify({
        ...savedState,
        entries: updatedEntries
      }));
    }
    
    alert('Entry updated successfully!');
    navigate('/multiple-add');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!entry) {
    return (
      <div className="edit-entry-root">
        <Sidebar onLogout={onLogout} />
        <main className="edit-entry-main">
          <div className="edit-entry-header">
            <button 
              className="back-button"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft /> Back
            </button>
            <h1>Edit Entry</h1>
          </div>
          <div className="edit-entry-container">
            <div className="error-message">
              <h2>Entry Not Found</h2>
              <p>The entry you are trying to edit could not be found.</p>
              <button 
                className="back-button"
                onClick={() => navigate('/multiple-add')}
              >
                Return to Multiple Add
              </button>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }

  return (
    <div className="edit-entry-root">
      <Sidebar onLogout={onLogout} />
      
      <main className="edit-entry-main">
        <div className="edit-entry-header">
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Back
          </button>
          <h1>Edit Entry</h1>
        </div>
        
        <div className="edit-entry-container">
          <form onSubmit={handleSubmit} className="edit-entry-form">
            {/* Entry Summary Section */}
            <div className="entry-summary">
              <h2>Entry Details</h2>
              <div className="summary-content">
                <div className="summary-item">
                  <span className="summary-label">Title:</span>
                  <span className="summary-value">{entry.title || 'Untitled'}</span>
                </div>
                
                {entry.authors && (
                  <div className="summary-item">
                    <span className="summary-label">Authors:</span>
                    <span className="summary-value">{entry.authors}</span>
                  </div>
                )}
                
                {entry.datePublished && (
                  <div className="summary-item">
                    <span className="summary-label">Date Published:</span>
                    <span className="summary-value">{entry.datePublished}</span>
                  </div>
                )}
                
                {entry.journal && (
                  <div className="summary-item">
                    <span className="summary-label">Journal:</span>
                    <span className="summary-value">{entry.journal}</span>
                  </div>
                )}
                
                {entry.type && (
                  <div className="summary-item">
                    <span className="summary-label">Type:</span>
                    <span className="summary-value">{entry.type}</span>
                  </div>
                )}
                
                {entry.category && (
                  <div className="summary-item">
                    <span className="summary-label">Category:</span>
                    <span className="summary-value">{entry.category}</span>
                  </div>
                )}
                
                {entry.subCategory && (
                  <div className="summary-item">
                    <span className="summary-label">Subcategory:</span>
                    <span className="summary-value">{entry.subCategory}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* SDG and Supporting Document Section */}
            <div className="edit-fields-section">
              <h2>Additional Information</h2>
              <p className="section-description">
                Add SDG and Supporting Document information to this entry.
              </p>
              
              <div className="form-group">
                <label htmlFor="sdg">Sustainable Development Goal (SDG)</label>
                <select
                  id="sdg"
                  name="sdg"
                  value={formData.sdg}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">-- Select SDG --</option>
                  {sdgOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="targetRange">Target Range</label>
                <input
                  type="text"
                  id="targetRange"
                  name="targetRange"
                  value={formData.targetRange}
                  onChange={handleChange}
                  placeholder="e.g., 1.1, 1.2, 1.3"
                  className="form-control"
                />
                <small className="form-text">
                  Enter the specific SDG targets separated by commas (e.g., 1.1, 1.2, 1.3)
                </small>
              </div>
              
              <div className="form-group">
                <label htmlFor="supportingDocument">Supporting Document</label>
                <div className="file-upload-container">
                  <div className="file-upload-button">
                    <label htmlFor="supportingDocument" className="file-upload-label">
                      <FaFileUpload /> Choose File
                    </label>
                    <input
                      type="file"
                      id="supportingDocument"
                      name="supportingDocument"
                      onChange={handleFileChange}
                      className="file-upload-input"
                    />
                  </div>
                  <div className="file-name-display">
                    {formData.supportingDocumentName ? (
                      <span className="file-selected">
                        <FaFile /> {formData.supportingDocumentName}
                      </span>
                    ) : (
                      <span className="no-file">No file chosen</span>
                    )}
                  </div>
                </div>
                <small className="form-text">
                  Upload a PDF or document that supports this entry (max 10MB)
                </small>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => navigate('/multiple-add')}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
              >
                <FaCheck /> Save Changes
              </button>
            </div>
          </form>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default EditEntryForm;
