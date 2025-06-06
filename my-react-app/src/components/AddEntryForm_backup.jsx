import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft } from 'react-icons/fa';
import './AddEntryForm.css';
import './FormStyles.css';

const AddEntryForm = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [isMultiple, setIsMultiple] = useState(false);
  const [formFields, setFormFields] = useState({});
  const [showForm, setShowForm] = useState(false);
  
  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const subCategoryParam = params.get('subcategory');
    const multipleParam = params.get('multiple') === 'true';
    
    // Always set isMultiple based on the multiple parameter
    setIsMultiple(multipleParam);
    
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
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formFields);
    // In a real app, you would save this data to your backend
    
    // Add timestamp to the form data for unique identification
    const submittedData = {
      ...formFields,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      category,
      subCategory
    };
    
    // If this is part of a multiple entry form, go back to the multiple form with the entry data
    if (isMultiple) {
      // Always encode the entry data to pass it back to the multiple form
      const encodedData = encodeURIComponent(JSON.stringify(submittedData));
      
      // IMPORTANT: Always return to the multiple add form when isMultiple is true
      console.log('Redirecting to multiple-add form with entry data');
      // Force a hard redirect to ensure we go back to the multiple add form
      window.location.href = `/multiple-add?entryData=${encodedData}`;
      return; // Early return to ensure we don't execute the code below
    }
    
    // Only reach here if NOT part of multiple entries
    // Navigate back to the appropriate page based on category
    switch (category) {
        case 'research':
          navigate('/research');
          break;
        case 'teaching':
          navigate('/teaching');
          break;
        case 'service':
          navigate('/service');
          break;
        case 'request':
          navigate('/my-requests');
          break;
        default:
          navigate('/home');
      }
    }
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
    // If form shouldn't be shown yet, return nothing
    if (!showForm) return null;
    
    switch (category) {
      case 'research':
        return (
          <>
            <div className="form-group">
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formFields.displayName || ''}
                onChange={handleInputChange}
                placeholder="How you want your name to appear on this submission"
                required
              />
            </div>
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
              <label htmlFor="authors">Author/s</label>
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
              <label htmlFor="publicationType">Publication Type</label>
              <select
                id="publicationType"
                name="publicationType"
                value={formFields.publicationType || ''}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Publication Type</option>
                <option value="Journal Article">Journal Article</option>
                <option value="Conference Paper">Conference Paper</option>
                <option value="Book Chapter">Book Chapter</option>
                <option value="Book">Book</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="sdg">SDG</label>
              <select
                id="sdg"
                name="sdg"
                value={formFields.sdg || ''}
                onChange={handleInputChange}
              >
                <option value="">Select SDG</option>
                <option value="SDG 1">SDG 1: No Poverty</option>
                <option value="SDG 2">SDG 2: Zero Hunger</option>
                <option value="SDG 3">SDG 3: Good Health and Well-being</option>
                <option value="SDG 4">SDG 4: Quality Education</option>
                <option value="SDG 5">SDG 5: Gender Equality</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="target">Target/s</label>
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
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formFields.displayName || ''}
                onChange={handleInputChange}
                placeholder="How you want your name to appear on this submission"
                required
              />
            </div>
          </>
        );
      
      case 'service':
        return (
          <>
            <div className="form-group">
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formFields.displayName || ''}
                onChange={handleInputChange}
                placeholder="How you want your name to appear on this submission"
                required
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
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Back
          </button>
          <h1>
            {isMultiple ? 'Add Entry to Multiple ' : 'Add '}
            {category === 'research' ? 'Research Activities' : 
             category === 'teaching' ? 'Teaching Activities' : 
             category === 'service' ? 'Public Service' : ''}
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
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={!showForm}
              >
                {isMultiple ? 'Add to Multiple Requests' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default AddEntryForm;
