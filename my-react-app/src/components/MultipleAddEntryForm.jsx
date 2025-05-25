import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft } from 'react-icons/fa';
import './AddEntryForm.css';
import './FormStyles.css';

const AddSingleEntryToMultipleForm = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [formFields, setFormFields] = useState({});
  const [showForm, setShowForm] = useState(false);
  
  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const subCategoryParam = params.get('subcategory');
    
    if (categoryParam) {
      setCategory(categoryParam);
      
      // If subcategory is provided, set it and initialize form fields
      if (subCategoryParam) {
        setSubCategory(subCategoryParam);
        setFormFields(getInitialFormFields(categoryParam, subCategoryParam));
        setShowForm(true);
      }
    }
  }, [location]);
  
  // Handle category change
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setSubCategory(''); // Reset sub-category when main category changes
    setShowForm(false); // Hide form until sub-category is selected
  };
  
  // Handle sub-category change
  const handleSubCategoryChange = (e) => {
    const newSubCategory = e.target.value;
    setSubCategory(newSubCategory);
    if (newSubCategory) {
      setFormFields(getInitialFormFields(category, newSubCategory));
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };
  
  // Get initial form fields based on category and sub-category
  const getInitialFormFields = (cat, subCat = '') => {
    const baseFields = {
      displayName: ''
    };
    
    switch (cat) {
      case 'research':
        return {
          ...baseFields,
          title: '',
          authors: '',
          datePublished: '',
          doi: '',
          publicationType: subCat || '',
          sdg: '',
          target: ''
        };
      case 'teaching':
        return {
          ...baseFields,
          courseNumber: '',
          section: '',
          description: '',
          academicYear: '',
          term: '',
          courseType: subCat || '',
          teachingPoints: '',
          supportingDocument: ''
        };
      case 'service':
        return {
          ...baseFields,
          position: '',
          office: '',
          startDate: '',
          endDate: '',
          serviceType: subCat || '',
          supportingDocument: ''
        };
      case 'request':
        return {
          ...baseFields,
          title: '',
          description: '',
          requestType: subCat || '',
          priority: 'Medium',
          dueDate: '',
          supportingDocument: ''
        };
      default:
        return {};
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission - ALWAYS return to multiple add form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted for multiple add:', formFields);
    
    // Add timestamp to the form data for unique identification
    const submittedData = {
      ...formFields,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      category,
      subCategory
    };
    
    // Always encode the entry data to pass it back to the multiple form
    const encodedData = encodeURIComponent(JSON.stringify(submittedData));
    
    console.log('Redirecting to multiple-add form with entry data');
    // Force a hard redirect to ensure we go back to the multiple add form
    window.location.href = `/multiple-add?entryData=${encodedData}`;
  };
  
  // Get sub-categories based on main category
  const getSubCategories = (cat) => {
    switch (cat) {
      case 'research':
        return [
          { id: 'publication', label: 'Publication' },
          { id: 'otherPublication', label: 'Other Publication' },
          { id: 'project', label: 'Project' },
          { id: 'conferencePresentation', label: 'Conference Presentation' },
          { id: 'departmentPresentation', label: 'Department/College/University Presentation' },
          { id: 'intellectualProperty', label: 'Intellectual Property Claim' }
        ];
      case 'teaching':
        return [
          { id: 'course', label: 'Course' },
          { id: 'authorship', label: 'Authorship' }
        ];
      case 'service':
        return [
          { id: 'serviceToUP', label: 'Service to UP' },
          { id: 'otherServiceToUP', label: 'Other Service to UP' },
          { id: 'serviceToProfession', label: 'Service to Profession' },
          { id: 'serviceToScience', label: 'Service to Science Education' },
          { id: 'serviceToNation', label: 'Service to Nation' }
        ];
      case 'request':
        return [
          { id: 'approval', label: 'Approval Request' },
          { id: 'correction', label: 'Correction Request' },
          { id: 'deletion', label: 'Deletion Request' },
          { id: 'other', label: 'Other Request' }
        ];
      default:
        return [];
    }
  };
  
  // Render form fields based on category
  const renderFormFields = () => {
    if (!showForm) return null;
    
    switch (category) {
      case 'research':
        return (
          <>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formFields.title || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="authors">Authors</label>
              <input
                type="text"
                id="authors"
                name="authors"
                value={formFields.authors || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="datePublished">Date Published</label>
              <input
                type="date"
                id="datePublished"
                name="datePublished"
                value={formFields.datePublished || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="doi">DOI</label>
              <input
                type="text"
                id="doi"
                name="doi"
                value={formFields.doi || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sdg">SDG</label>
              <input
                type="text"
                id="sdg"
                name="sdg"
                value={formFields.sdg || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="target">Target</label>
              <input
                type="text"
                id="target"
                name="target"
                value={formFields.target || ''}
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      case 'teaching':
        return (
          <>
            <div className="form-group">
              <label htmlFor="courseNumber">Course Number</label>
              <input
                type="text"
                id="courseNumber"
                name="courseNumber"
                value={formFields.courseNumber || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="section">Section</label>
              <input
                type="text"
                id="section"
                name="section"
                value={formFields.section || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formFields.description || ''}
                onChange={handleInputChange}
                required
                rows="4"
              />
            </div>
            <div className="form-group">
              <label htmlFor="academicYear">Academic Year</label>
              <input
                type="text"
                id="academicYear"
                name="academicYear"
                value={formFields.academicYear || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="term">Term</label>
              <select
                id="term"
                name="term"
                value={formFields.term || ''}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Term</option>
                <option value="First Semester">First Semester</option>
                <option value="Second Semester">Second Semester</option>
                <option value="Midyear">Midyear</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="teachingPoints">Teaching Points</label>
              <input
                type="number"
                id="teachingPoints"
                name="teachingPoints"
                value={formFields.teachingPoints || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="supportingDocument">Supporting Document</label>
              <input
                type="file"
                id="supportingDocument"
                name="supportingDocument"
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      case 'service':
        return (
          <>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formFields.position || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="office">Office</label>
              <input
                type="text"
                id="office"
                name="office"
                value={formFields.office || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formFields.startDate || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date (Leave blank if ongoing)</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formFields.endDate || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="supportingDocument">Supporting Document</label>
              <input
                type="file"
                id="supportingDocument"
                name="supportingDocument"
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      case 'request':
        return (
          <>
            <div className="form-group">
              <label htmlFor="displayName">Your Name</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formFields.displayName || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Request Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formFields.title || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formFields.description || ''}
                onChange={handleInputChange}
                required
                rows="4"
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formFields.priority || 'Medium'}
                onChange={handleInputChange}
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">Due Date (Optional)</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formFields.dueDate || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="supportingDocument">Supporting Document</label>
              <input
                type="file"
                id="supportingDocument"
                name="supportingDocument"
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      default:
        return <p>Please select a valid category and sub-category</p>;
    }
  };
  
  return (
    <div className="add-entry-root">
      <Sidebar onLogout={onLogout} />
      
      <main className="add-entry-main">
        <div className="add-entry-header">
          <button 
            className="back-button"
            onClick={() => navigate('/multiple-add')}
          >
            <FaArrowLeft /> Back to Multiple Requests
          </button>
          <h1>
            Add Single Entry to Multiple Requests
          </h1>
        </div>
        
        <div className="add-entry-form-container">
          <form onSubmit={handleSubmit} className="add-entry-form">
            {/* Classification Dropdowns */}
            <div className="form-group classification-group">
              <label htmlFor="submissionType">Submission Type</label>
              <select
                id="submissionType"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select Submission Type</option>
                <option value="research">Research Activity</option>
                <option value="teaching">Teaching Activity</option>
                <option value="service">Public Service</option>
                <option value="request">Request</option>
              </select>
            </div>
            
            {category && (
              <div className="form-group classification-group">
                <label htmlFor="subClassification">Sub-Classification</label>
                <select
                  id="subClassification"
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                  required
                >
                  <option value="">Select Sub-Classification</option>
                  {getSubCategories(category).map(subCat => (
                    <option key={subCat.id} value={subCat.id}>
                      {subCat.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Form Fields */}
            {renderFormFields()}
            
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
                disabled={!showForm}
              >
                Add to Multiple Requests
              </button>
            </div>
          </form>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default AddSingleEntryToMultipleForm;
