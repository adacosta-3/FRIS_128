import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft } from 'react-icons/fa';
import './AddEntryForm.css';
import './FormStyles.css';

const EditExcelEntry = ({ onLogout }) => {
  const navigate = useNavigate();
  const { entryId } = useParams(); // Get the entry ID from URL params
  
  const [formData, setFormData] = useState({
    sdg: '',
    targetStart: '',
    targetEnd: '',
    supportingDocument: null
  });
  
  const [entryDetails, setEntryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch entry details based on entryId
  useEffect(() => {
    // In a real app, this would be an API call to fetch the entry details
    // For this example, we'll simulate fetching data
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock data for demonstration
      const mockEntryDetails = {
        id: entryId,
        title: "Sample Publication from Excel",
        authors: "John Doe, Jane Smith",
        datePublished: "2025-01-15",
        journal: "Journal of Computer Science",
        category: "research",
        subCategory: "publications",
        type: "1.a"
      };
      
      setEntryDetails(mockEntryDetails);
      setLoading(false);
    }, 500);
  }, [entryId]);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine entry details with form data
    const updatedEntry = {
      ...entryDetails,
      ...formData,
      lastUpdated: new Date().toISOString()
    };
    
    console.log('Updated entry:', updatedEntry);
    
    // In a real app, you would send this data to your backend
    
    // Show success message
    alert("Entry updated successfully!");
    
    // Navigate back to the appropriate page based on category
    if (entryDetails.category === 'research') {
      navigate('/research');
    } else if (entryDetails.category === 'teaching') {
      navigate('/teaching');
    } else if (entryDetails.category === 'service') {
      navigate('/public');
    } else {
      navigate('/home');
    }
  };
  
  if (loading) {
    return (
      <div className="add-entry-root">
        <Sidebar onLogout={onLogout} />
        <main className="add-entry-main">
          <div className="loading-container">
            <p>Loading entry details...</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="add-entry-root">
      <Sidebar onLogout={onLogout} />
      
      <main className="add-entry-main">
        <div className="add-entry-header">
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Back
          </button>
          <h1>Edit Excel Entry</h1>
        </div>
        
        <div className="add-entry-form-container">
          {/* Entry Details Summary */}
          <div className="entry-details-summary">
            <h2>{entryDetails.title}</h2>
            <p><strong>Authors:</strong> {entryDetails.authors}</p>
            <p><strong>Date Published:</strong> {new Date(entryDetails.datePublished).toLocaleDateString()}</p>
            <p><strong>Journal:</strong> {entryDetails.journal}</p>
            <p><strong>Type:</strong> {entryDetails.type}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="add-entry-form">
            {/* SDG Dropdown */}
            <div className="form-group">
              <label htmlFor="sdg">SDG</label>
              <select
                id="sdg"
                name="sdg"
                value={formData.sdg}
                onChange={handleInputChange}
                required
              >
                <option value="">Select SDG</option>
                <option value="1">1. No Poverty</option>
                <option value="2">2. Zero Hunger</option>
                <option value="3">3. Good Health and Well-being</option>
                <option value="4">4. Quality Education</option>
                <option value="5">5. Gender Equality</option>
                <option value="6">6. Clean Water and Sanitation</option>
                <option value="7">7. Affordable and Clean Energy</option>
                <option value="8">8. Decent Work and Economic Growth</option>
                <option value="9">9. Industry, Innovation and Infrastructure</option>
                <option value="10">10. Reduced Inequalities</option>
                <option value="11">11. Sustainable Cities and Communities</option>
                <option value="12">12. Responsible Consumption and Production</option>
                <option value="13">13. Climate Action</option>
                <option value="14">14. Life Below Water</option>
                <option value="15">15. Life on Land</option>
                <option value="16">16. Peace, Justice and Strong Institutions</option>
                <option value="17">17. Partnerships for the Goals</option>
              </select>
            </div>
            
            {/* Target Range */}
            <div className="form-group">
              <label>Target Range</label>
              <div className="target-group">
                <div className="target-inputs">
                  <input
                    type="text"
                    id="targetStart"
                    name="targetStart"
                    value={formData.targetStart}
                    onChange={handleInputChange}
                    placeholder="Start (e.g. 4.1)"
                    required
                  />
                  <span className="target-separator">-</span>
                  <input
                    type="text"
                    id="targetEnd"
                    name="targetEnd"
                    value={formData.targetEnd}
                    onChange={handleInputChange}
                    placeholder="End (e.g. 4.5)"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Supporting Document */}
            <div className="form-group">
              <label htmlFor="supportingDocument">Supporting Document</label>
              <input
                type="file"
                id="supportingDocument"
                name="supportingDocument"
                onChange={handleInputChange}
                required
              />
            </div>
            
            {/* Form Actions */}
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
              >
                Update Entry
              </button>
            </div>
          </form>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default EditExcelEntry;
