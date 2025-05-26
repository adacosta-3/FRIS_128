import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft } from 'react-icons/fa';
import './AddEntryForm.css';
import './FormStyles.css';

const AddEntryForm = ({ onLogout }) => {
  const navigate = useNavigate();
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  // Handle main category change
  const handleMainCategoryChange = (e) => {
    const value = e.target.value;
    setMainCategory(value);
    setSubCategory('');
    setFormData({});
    setShowForm(false);
  };

  // Handle subcategory change
  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setSubCategory(value);
    
    // Initialize form fields based on selected subcategory
    if (value) {
      setFormData(getInitialFormFields(mainCategory, value));
      setShowForm(true);
    } else {
      setFormData({});
      setShowForm(false);
    }
  };

  // State for service type (third level dropdown for Public Service)
  const [serviceType, setServiceType] = useState('');
  // State for research type (third level dropdown for Research Activities)
  const [researchType, setResearchType] = useState('');

  // Handle service type change
  const handleServiceTypeChange = (e) => {
    const value = e.target.value;
    setServiceType(value);
    
    // Update form fields based on the selected service type
    if (value) {
      setFormData({
        ...formData,
        serviceType: value,
        position: '',
        office: '',
        startDate: '',
        endDate: ''
      });
    }
  };

  // Handle research type change
  const handleResearchTypeChange = (e) => {
    const value = e.target.value;
    setResearchType(value);
    
    // Initialize form fields based on selected research type
    if (value) {
      if (subCategory === 'publications' || subCategory === 'other_publications') {
        setFormData({
          ...formData,
          researchType: value,
          researchInterest: '',
          researchExperience: '',
          title: '',
          authors: '',
          datePublished: '',
          startDate: '',
          endDate: '',
          journal: '',
          citedAs: '',
          doi: '',
          publicationType: '',
          sdg: '',
          targetStart: '',
          targetEnd: ''
        });
      } else if (subCategory === 'projects') {
        setFormData({
          ...formData,
          researchType: value,
          title: '',
          startDate: '',
          endDate: '',
          fundingAmount: '',
          fundingAgency: ''
        });
      } else if (subCategory === 'conference_presentations' || 
                 subCategory === 'department_presentations') {
        setFormData({
          ...formData,
          researchType: value,
          title: '',
          venue: '',
          presentationDate: '',
          presentationType: ''
        });
      } else if (subCategory === 'intellectual_property') {
        setFormData({
          ...formData,
          researchType: value,
          title: '',
          inventors: '',
          dateAwarded: '',
          registrationNumber: ''
        });
      }
    }
  };

  // Get initial form fields based on category and subcategory
  const getInitialFormFields = (category, subCat) => {
    const baseFields = {
      displayName: ''
    };
    
    if (category === 'teaching') {
      if (subCat === 'courses') {
        return {
          ...baseFields,
          academicYear: '',
          term: '',
          courseNumber: '',
          section: '',
          courseDescription: '',
          courseType: '',
          teachingPoints: '',
          supportingDocument: null
        };
      } else if (subCat === 'authorship') {
        return {
          ...baseFields,
          title: '',
          authors: '',
          date: '',
          upCourse: '',
          recommendingUnit: '',
          publisher: '',
          authorshipType: '',
          numberOfAuthors: '',
          supportingDocument: null
        };
      }
    } else if (category === 'service') {
      // For Public Service, we'll set the base fields and add more based on the service type selection
      return {
        ...baseFields,
        serviceType: '',
        position: '',
        office: '',
        startDate: '',
        endDate: '',
        supportingDocument: null
      };
    }
    
    // Default return empty object
    return baseFields;
  };

  // Get service types based on subcategory
  const getServiceTypes = (subCat) => {
    switch (subCat) {
      case 'service_to_up':
        return [
          { id: 'I.1.a', label: 'I.1.a. Dean/UP official with ALC of 9 u or more' },
          { id: 'I.1.b', label: 'I.1.b. Director/College Secretary/ UP official with ALC of 6 u' },
          { id: 'I.1.c', label: 'I.1.c. Associate Dean with ALC of 6 units' },
          { id: 'I.1.d', label: 'I.1.d. Program Coordinator/Assistant Secretary/Deputy Directors with ALC of 3 units' },
          { id: 'I.1.e', label: 'I.1.e. Academic Leader/Lab. Head with ALC of 1 unit' },
          { id: 'I.1.f', label: 'I.1.f. Chair in the unit\'s standing Committees/Course Coordinators' },
          { id: 'I.2', label: 'I.2. Membership in a standing committee of the Institute/Department/College/ University' }
        ];
      case 'other_service_to_up':
        return [
          { id: 'I.4.b', label: 'I.4.b. Candidacy Exams' },
          { id: 'I.4.c', label: 'I.4.c. Comprehensive Exams' },
          { id: 'I.4.d', label: 'I.4.d. Qualifying Exams' },
          { id: 'I.4.e', label: 'I.4.e. Placement Exams' },
          { id: 'I.4.f', label: 'I.4.f. Program Advising' }
        ];
      case 'service_to_profession':
        return [
          { id: 'II.1.a', label: 'II.1.a. Position of responsibility in a international/regional scientific organization' },
          { id: 'II.1.b', label: 'II.1.b. Position of responsibility in a national scientific organization' },
          { id: 'II.2.a.1', label: 'II.2.a.1 Editorial board member (main or topical) of SCIE – listed journal' },
          { id: 'II.2.a.2', label: 'II.2.a.2. Editorial board member (main or topical) of non-SCIE – listed journal' },
          { id: 'II.2.b.1', label: 'II.2.b.1 Editorial board member (main or topical) of SCIE – listed journal' },
          { id: 'II.2.b.2', label: 'II.2.b.2. Editorial board member (main or topical) of non SCIE – listed/national journal' },
          { id: 'II.3.a', label: 'II.3.a. Referee in SCIE journal (5 points per Review)' },
          { id: 'II.3.b', label: 'II.3.b. Referee in non-SCIE journal' },
          { id: 'II.4', label: 'II.4. Other service to the Science community (please specify)' }
        ];
      case 'service_to_science':
        return [
          { id: 'III.1.a', label: 'III.1.a. Chair, international/regional Workshop/Training/Conference' },
          { id: 'III.1.b', label: 'III.1.b. Member, international/regional Workshop/Training/Conference' },
          { id: 'III.1.c', label: 'III.1.c. Chair, national Workshop/Training/Conference' },
          { id: 'III.1.d', label: 'III.1.d. Member, national Workshop/Training/Conference' },
          { id: 'III.2', label: 'III.2. Authorship of a scientific reference book/text book/manual (must submit ISBN)' },
          { id: 'III.3.a', label: 'III.3.a. Author of popularized scientific article in international organization/media' },
          { id: 'III.3.b', label: 'III.3.b. Author of popularized scientific article in national organization/media' },
          { id: 'III.4', label: 'III.4. Resource person in print or broadcast media presentations' },
          { id: 'III.5', label: 'III.5. Trainor within area of specialization (international/national)' },
          { id: 'III.6', label: 'III.6. Resource person in symposia related to science education' }
        ];
      case 'service_to_nation':
        return [
          { id: 'IV.1.a', label: 'IV.1.a. Member in international/regional scientific/technical committee' },
          { id: 'IV.1.b', label: 'IV.1.b. Member in national/university scientific/technical committee' },
          { id: 'IV.2.a', label: 'IV.2.a. Advisorship to international/regional scientific organization' },
          { id: 'IV.2.b', label: 'IV.2.b. Advisorship to national/university scientific organization' },
          { id: 'IV.3.a', label: 'IV.3.a. Active participation in international/regional outreach program' },
          { id: 'IV.3.b', label: 'IV.3.b. Active participation in national/university outreach program' },
          { id: 'IV.4.a', label: 'IV.4.a. Resource person in international/regional non-scientific meetings/symposium/extension activities' },
          { id: 'IV.4.b', label: 'IV.4.b. Resource person in national/university non-scientific meetings/symposium/extension activities' }
        ];
      default:
        return [];
    }
  };
  
  // Get research types based on subcategory
  const getResearchTypes = (subCat) => {
    switch (subCat) {
      case 'publications':
        return [
          { id: '1.a', label: '1.a. International publication journal with impact factor' },
          { id: '1.b', label: '1.b. International publication without impact factor [3]' }
        ];
      case 'other_publications':
        return [
          { id: '1.c', label: '1.c. monographs (reputable international publisher)' },
          { id: '1.d', label: '1.d. book/e-book; chapter in book/e-book (reputable international publisher)' },
          { id: '1.e', label: '1.e. book/e-book; chapter in book/e-book (reputable national publisher)' },
          { id: '1.f', label: '1.f. international conference proceedings [7]' },
          { id: '1.g', label: '1.g. national conference proceedings' },
          { id: '2.a', label: '2.a. book/e-book; chapter in book/e-book (international publisher) [4]' },
          { id: '2.b', label: '2.b. article in national scientific journal' },
          { id: '2.c', label: '2.c. book/chapter in book (national publisher) [4]' },
          { id: '2.d', label: '2.d. international conference proceedings' },
          { id: '2.e', label: '2.e. national conference proceedings' }
        ];
      case 'projects':
        return [
          { id: '3.a', label: '3.a. Php 100,000 - 500,000' },
          { id: '3.b', label: '3.b. Php 500,001 - 1,000,000' },
          { id: '3.c', label: '3.c. Php 1,000,001 - 10,000,000' },
          { id: '3.d', label: '3.d. Php > 10,000,000' }
        ];
      case 'conference_presentations':
        return [
          { id: '4.a', label: '4.a. plenary talk/kenote presentation [8]' },
          { id: '4.b.1', label: '4.b.1. invited talk (Scientific conference) [9]' },
          { id: '4.b.2', label: '4.b.2. invited talk (Academic Administrator\'s Conference) [9]' },
          { id: '4.c', label: '4.c. contributed paper (oral/poster)' },
          { id: '5.a', label: '5.a. plenary talk/keynote presentation [8]' },
          { id: '5.b.1', label: '5.b.1. invited talk (Scientific conference) [9]' },
          { id: '5.b.2', label: '5.b.2. invited talk (Academic Administrator\'s Conference) [9]' },
          { id: '5.c', label: '5.c. contributed paper (oral/poster)' }
        ];
      case 'department_presentations':
        return [
          { id: '6.a', label: '6.a. foreign university' },
          { id: '6.b', label: '6.b. local university' },
          { id: '6.c', label: '6.c. college/department' }
        ];
      case 'intellectual_property':
        return [
          { id: '7.a', label: '7.a. Awarded patent/utility Models with multinational jurisdiction' },
          { id: '7.b', label: '7.b. Awarded Philippine/single country patent/Utility Models' },
          { id: '7.c', label: '7.c. Formally lodged multinational copyright [10]' },
          { id: '7.d', label: '7.d. Philippine/Single country lodged copyright [10]' },
          { id: '7.e', label: '7.e. Patented trademark (international/national)' }
        ];
      default:
        return [];
    }
  };

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
    console.log('Form submitted:', formData);
    
    // Add category and subcategory to the form data
    const submittedData = {
      ...formData,
      mainCategory,
      subCategory,
      timestamp: new Date().toISOString()
    };
    
    console.log('Submitted data:', submittedData);
    
    // Here you would typically send the data to your backend
    
    // Navigate back based on category
    if (mainCategory === 'teaching') {
      navigate('/teaching');
    } else if (mainCategory === 'research') {
      navigate('/research');
    } else if (mainCategory === 'service') {
      navigate('/public');
    } else {
      navigate('/home');
    }
  };

  // Get subcategories based on main category
  const getSubCategories = (category) => {
    switch (category) {
      case 'teaching':
        return [
          { id: 'courses', label: 'Courses and SETs' },
          { id: 'authorship', label: 'Authorship of Books, Modules, etc.' }
        ];
      case 'research':
        return [
          { id: 'publications', label: 'Publications' },
          { id: 'other_publications', label: 'Other Publications' },
          { id: 'projects', label: 'Projects' },
          { id: 'conference_presentations', label: 'Conference Presentations' },
          { id: 'department_presentations', label: 'Department/University Presentations' },
          { id: 'intellectual_property', label: 'Intellectual Property Claims' }
        ];
      case 'service':
        return [
          { id: 'service_to_up', label: 'Service to UP' },
          { id: 'other_service_to_up', label: 'Other Service to UP' },
          { id: 'service_to_profession', label: 'Service to Profession' },
          { id: 'service_to_science', label: 'Service to Science Education' },
          { id: 'service_to_nation', label: 'Service to Nation' }
        ];
      default:
        return [];
    }
  };

  // Render form fields based on selected category and subcategory
  const renderFormFields = () => {
    if (!showForm) return null;

    if (mainCategory === 'research') {
      // Common name field for all research subcategories
      const displayNameField = (
        <div className="form-group">
          <label htmlFor="displayName">Name</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName || ''}
            onChange={handleInputChange}
            placeholder="How you want your name to appear on this submission"
            required
          />
        </div>
      );

      // Third level dropdown for research type
      const researchTypeDropdown = (
        <div className="form-group classification-group">
          <label htmlFor="researchType">Type</label>
          <select
            id="researchType"
            name="researchType"
            value={researchType}
            onChange={handleResearchTypeChange}
            required
          >
            <option value="">Select Research Type</option>
            {getResearchTypes(subCategory).map(type => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      );

      if ((subCategory === 'publications' || subCategory === 'other_publications') && researchType) {
        return (
          <>
            {displayNameField}
            {researchTypeDropdown}
            <div className="form-group">
              <label htmlFor="researchInterest">Research Interest</label>
              <textarea
                id="researchInterest"
                name="researchInterest"
                value={formData.researchInterest || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="researchExperience">Research Experience</label>
              <textarea
                id="researchExperience"
                name="researchExperience"
                value={formData.researchExperience || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
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
                value={formData.authors || ''}
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
                value={formData.datePublished || ''}
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
                value={formData.startDate || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="journal">Journal</label>
              <input
                type="text"
                id="journal"
                name="journal"
                value={formData.journal || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="citedAs">Cited As</label>
              <input
                type="text"
                id="citedAs"
                name="citedAs"
                value={formData.citedAs || ''}
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
                value={formData.doi || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="publicationType">Publication Type</label>
              <input
                type="text"
                id="publicationType"
                name="publicationType"
                value={formData.publicationType || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="sdg">SDG</label>
              <select
                id="sdg"
                name="sdg"
                value={formData.sdg || ''}
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
            <div className="form-group">
              <label>Target Range</label>
              <div className="target-group">
                <div className="target-inputs">
                  <input
                    type="text"
                    id="targetStart"
                    name="targetStart"
                    value={formData.targetStart || ''}
                    onChange={handleInputChange}
                    placeholder="Start (e.g. 4.1)"
                    required
                  />
                  <span className="target-separator">-</span>
                  <input
                    type="text"
                    id="targetEnd"
                    name="targetEnd"
                    value={formData.targetEnd || ''}
                    onChange={handleInputChange}
                    placeholder="End (e.g. 4.5)"
                    required
                  />
                </div>
              </div>
            </div>
          </>
        );
      } else if (subCategory === 'projects' && researchType) {
        return (
          <>
            {displayNameField}
            {researchTypeDropdown}
            <div className="form-group">
              <label htmlFor="title">Project Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
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
                value={formData.startDate || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fundingAmount">Funding Amount</label>
              <input
                type="number"
                id="fundingAmount"
                name="fundingAmount"
                value={formData.fundingAmount || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fundingAgency">Funding Agency</label>
              <input
                type="text"
                id="fundingAgency"
                name="fundingAgency"
                value={formData.fundingAgency || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        );
      } else if ((subCategory === 'conference_presentations' || subCategory === 'department_presentations') && researchType) {
        return (
          <>
            {displayNameField}
            {researchTypeDropdown}
            <div className="form-group">
              <label htmlFor="title">Presentation Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="venue">Venue</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="presentationDate">Presentation Date</label>
              <input
                type="date"
                id="presentationDate"
                name="presentationDate"
                value={formData.presentationDate || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="presentationType">Presentation Type</label>
              <select
                id="presentationType"
                name="presentationType"
                value={formData.presentationType || ''}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Presentation Type</option>
                <option value="Oral">Oral</option>
                <option value="Poster">Poster</option>
                <option value="Keynote">Keynote</option>
                <option value="Plenary">Plenary</option>
              </select>
            </div>
          </>
        );
      } else if (subCategory === 'intellectual_property' && researchType) {
        return (
          <>
            {displayNameField}
            {researchTypeDropdown}
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inventors">Inventor/s</label>
              <input
                type="text"
                id="inventors"
                name="inventors"
                value={formData.inventors || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateAwarded">Date Awarded</label>
              <input
                type="date"
                id="dateAwarded"
                name="dateAwarded"
                value={formData.dateAwarded || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="registrationNumber">Registration Number</label>
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        );
      } else {
        // If no research type is selected yet
        return (
          <>
            {displayNameField}
            {researchTypeDropdown}
            <div className="form-placeholder">
              <p>Please select a Research Type to view the form fields.</p>
            </div>
          </>
        );
      }
    } else if (mainCategory === 'teaching') {
      if (subCategory === 'courses') {
        return (
          <>
            <div className="form-group">
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName || ''}
                onChange={handleInputChange}
                placeholder="How you want your name to appear on this submission"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="academicYear">Academic Year</label>
              <input
                type="text"
                id="academicYear"
                name="academicYear"
                value={formData.academicYear || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="term">Term</label>
              <select
                id="term"
                name="term"
                value={formData.term || ''}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Term</option>
                <option value="1st Sem">1st Sem</option>
                <option value="2nd Sem">2nd Sem</option>
                <option value="Midyear">Midyear</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="courseNumber">Course Number</label>
              <input
                type="text"
                id="courseNumber"
                name="courseNumber"
                value={formData.courseNumber || ''}
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
                value={formData.section || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={formData.courseDescription || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseType">Course Type</label>
              <select
                id="courseType"
                name="courseType"
                value={formData.courseType || ''}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Course Type</option>
                <option value="Lecture">Lecture</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Lecture and Laboratory">Lecture and Laboratory</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="teachingPoints">Teaching Points</label>
              <input
                type="number"
                id="teachingPoints"
                name="teachingPoints"
                value={formData.teachingPoints || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        );
      } else if (subCategory === 'authorship') {
        return (
          <>
            <div className="form-group">
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName || ''}
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
                value={formData.title || ''}
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
                value={formData.authors || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="upCourse">UP Course</label>
              <input
                type="text"
                id="upCourse"
                name="upCourse"
                value={formData.upCourse || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="recommendingUnit">Recommending Unit</label>
              <input
                type="text"
                id="recommendingUnit"
                name="recommendingUnit"
                value={formData.recommendingUnit || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                value={formData.publisher || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="authorshipType">Authorship Type</label>
              <input
                type="text"
                id="authorshipType"
                name="authorshipType"
                value={formData.authorshipType || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberOfAuthors">Number of Authors</label>
              <input
                type="number"
                id="numberOfAuthors"
                name="numberOfAuthors"
                value={formData.numberOfAuthors || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        );
      }
    } else if (mainCategory === 'service') {
      // For Public Service, show the third dropdown for service type
      return (
        <>
          <div className="form-group">
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName || ''}
              onChange={handleInputChange}
              placeholder="How you want your name to appear on this submission"
              required
            />
          </div>
          
          {/* Third level dropdown - Service Type */}
          <div className="form-group classification-group">
            <label htmlFor="serviceType">Type</label>
            <select
              id="serviceType"
              name="serviceType"
              value={serviceType}
              onChange={handleServiceTypeChange}
              required
            >
              <option value="">Select Service Type</option>
              {getServiceTypes(subCategory).map(type => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Only show these fields if a service type is selected */}
          {serviceType && (
            <>
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position || ''}
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
                  value={formData.office || ''}
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
                  value={formData.startDate || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}
        </>
      );
    }
    
    // Default placeholder for other categories
    return (
      <div className="form-placeholder">
        <p>Please select a valid category and subcategory to view the form fields.</p>
      </div>
    );
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
            {mainCategory === 'teaching' ? 'Add Teaching Activity' : 
             mainCategory === 'research' ? 'Add Research Activity' : 
             mainCategory === 'service' ? 'Add Public Service' : 'Add Entry'}
          </h1>
        </div>
        
        <div className="add-entry-form-container">
          <form onSubmit={handleSubmit} className="add-entry-form">
            {/* Main Category Dropdown */}
            <div className="form-group classification-group">
              <label htmlFor="mainCategory">Main Category</label>
              <select
                id="mainCategory"
                name="mainCategory"
                value={mainCategory}
                onChange={handleMainCategoryChange}
                required
              >
                <option value="">Select Main Category</option>
                <option value="research">Research Activity</option>
                <option value="teaching">Teaching Activity</option>
                <option value="service">Public Service</option>
              </select>
            </div>
            
            {/* Sub-Category Dropdown (shown only when main category is selected) */}
            {mainCategory && (
              <div className="form-group classification-group">
                <label htmlFor="subCategory">Sub-Category</label>
                <select
                  id="subCategory"
                  name="subCategory"
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                  required
                >
                  <option value="">Select Sub-Category</option>
                  {getSubCategories(mainCategory).map(subCat => (
                    <option key={subCat.id} value={subCat.id}>
                      {subCat.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Dynamic form fields based on selected category and subcategory */}
            {renderFormFields()}
            
            {/* Supporting Document field (shown for all forms) */}
            {showForm && (
              <div className="form-group">
                <label htmlFor="supportingDocument">Supporting Document</label>
                <input
                  type="file"
                  id="supportingDocument"
                  name="supportingDocument"
                  onChange={handleInputChange}
                />
              </div>
            )}
            
            {/* Empty space to ensure form always shows full length */}
            {!showForm && (
              <div className="form-placeholder full-height">
                <p>Please select a Main Category and Sub-Category to view the form fields.</p>
              </div>
            )}
            
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
                disabled={!showForm}
              >
                Submit
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