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
  const [type, setType] = useState('');
  const [isMultiple, setIsMultiple] = useState(false);
  const [formFields, setFormFields] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [types, setTypes] = useState([]);
  
  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const subCategoryParam = params.get('subcategory');
    const typeParam = params.get('type');
    const multipleParam = params.get('multiple') === 'true';
    
    // Always set isMultiple based on the multiple parameter
    setIsMultiple(multipleParam);
    
    if (categoryParam) {
      setCategory(categoryParam);
      
      // If subcategory is provided, set it and update types
      if (subCategoryParam) {
        setSubCategory(subCategoryParam);
        
        // Update types based on subcategory
        if (categoryParam === 'research') {
          setTypes(getTypes(subCategoryParam));
          
          // If type is provided, set it and initialize form fields
          if (typeParam) {
            setType(typeParam);
            setFormFields(getInitialFormFields(categoryParam, subCategoryParam, typeParam));
            setShowForm(true);
          }
        } else {
          // For non-research categories, no type is needed
          setFormFields(getInitialFormFields(categoryParam, subCategoryParam));
          setShowForm(true);
        }
      }
    }
  }, [location]);
  
  // Handle category change
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setSubCategory(''); // Reset sub-category when main category changes
    setType(''); // Reset type when main category changes
    setTypes([]); // Clear types when main category changes
    setShowForm(false); // Hide form until sub-category is selected
  };
  
  // Handle sub-category change
  const handleSubCategoryChange = (e) => {
    const newSubCategory = e.target.value;
    setSubCategory(newSubCategory);
    setType(''); // Reset type when sub-category changes
    
    if (newSubCategory) {
      if (category === 'research') {
        // For research, we need to select a type before showing the form
        const newTypes = getTypes(newSubCategory);
        setTypes(newTypes);
        setShowForm(false); // Don't show form until type is selected for research
      } else {
        // For other categories, show form immediately
        setFormFields(getInitialFormFields(category, newSubCategory));
        setShowForm(true);
      }
    } else {
      setShowForm(false);
      setTypes([]);
    }
  };
  
  // Handle type change
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    
    if (newType) {
      setFormFields(getInitialFormFields(category, subCategory, newType));
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };
  
  // Get types based on subcategory
  const getTypes = (subCat) => {
    // Group subcategories into main types
    if (subCat.startsWith('1.') || subCat.startsWith('2.')) {
      if (subCat.startsWith('1.a') || subCat.startsWith('1.b')) {
        return [
          { id: 'journal-article', label: 'Journal Article' },
          { id: 'review-article', label: 'Review Article' },
          { id: 'research-note', label: 'Research Note' }
        ];
      } else if (subCat.startsWith('1.c')) { // Monographs
        return [
          { id: 'monograph', label: 'Monograph' }
        ];
      } else if (subCat.startsWith('1.d') || subCat.startsWith('1.e') || 
                subCat.startsWith('2.a') || subCat.startsWith('2.c')) { // Books/e-books
        return [
          { id: 'book', label: 'Book' },
          { id: 'e-book', label: 'E-Book' },
          { id: 'book-chapter', label: 'Book Chapter' },
          { id: 'e-book-chapter', label: 'E-Book Chapter' }
        ];
      } else if (subCat.startsWith('1.f') || subCat.startsWith('1.g') || 
                subCat.startsWith('2.d') || subCat.startsWith('2.e')) { // Conference proceedings
        return [
          { id: 'full-paper', label: 'Full Paper' },
          { id: 'extended-abstract', label: 'Extended Abstract' },
          { id: 'abstract', label: 'Abstract' }
        ];
      } else if (subCat.startsWith('2.b')) { // National scientific journal
        return [
          { id: 'journal-article', label: 'Journal Article' },
          { id: 'review-article', label: 'Review Article' },
          { id: 'research-note', label: 'Research Note' }
        ];
      }
    } else if (subCat.startsWith('3.')) { // Projects
      return [
        { id: 'research-project', label: 'Research Project' },
        { id: 'development-project', label: 'Development Project' },
        { id: 'extension-project', label: 'Extension Project' },
        { id: 'creative-work', label: 'Creative Work' }
      ];
    } else if (subCat.startsWith('4.') || subCat.startsWith('5.')) { // Conference presentations
      if (subCat.endsWith('a')) { // Plenary/keynote
        return [
          { id: 'plenary', label: 'Plenary Talk' },
          { id: 'keynote', label: 'Keynote Presentation' }
        ];
      } else if (subCat.includes('b')) { // Invited talks
        return [
          { id: 'invited-talk', label: 'Invited Talk' }
        ];
      } else if (subCat.endsWith('c')) { // Contributed papers
        return [
          { id: 'oral', label: 'Oral Presentation' },
          { id: 'poster', label: 'Poster Presentation' }
        ];
      }
    } else if (subCat.startsWith('6.')) { // Department/College/University presentations
      return [
        { id: 'seminar', label: 'Seminar' },
        { id: 'colloquium', label: 'Colloquium' },
        { id: 'lecture', label: 'Lecture' },
        { id: 'workshop', label: 'Workshop' }
      ];
    } else if (subCat.startsWith('7.')) { // Intellectual property claims
      if (subCat.includes('patent')) {
        return [
          { id: 'utility-patent', label: 'Utility Patent' },
          { id: 'design-patent', label: 'Design Patent' },
          { id: 'utility-model', label: 'Utility Model' }
        ];
      } else if (subCat.includes('copyright')) {
        return [
          { id: 'literary-work', label: 'Literary Work' },
          { id: 'software', label: 'Software' },
          { id: 'artistic-work', label: 'Artistic Work' }
        ];
      } else if (subCat.includes('trademark')) {
        return [
          { id: 'trademark', label: 'Trademark' },
          { id: 'service-mark', label: 'Service Mark' }
        ];
      }
    }
    
    // Default: return empty array if no types match
    return [];
  };
  
  // Get initial form fields based on category, sub-category, and type
  const getInitialFormFields = (cat, subCat = '', typeVal = '') => {
    const baseFields = {
      displayName: ''
    };
    
    switch (cat) {
      case 'research':
        // Common fields for all research activities
        const researchBaseFields = {
          ...baseFields,
          title: '',
          authors: '',
          datePublished: '',
          publicationType: subCat || '',
          type: typeVal || '',
          sdg: '', // Numerical and categorical
          targetFrom: '', // Numerical target field
          targetTo: '', // Numerical target field
          supportingDocument: ''
        };
        
        // Check if it's a publication type
        if (subCat.startsWith('1.') || subCat.startsWith('2.')) {
          return {
            ...researchBaseFields,
            doi: '',
            journal: '',
            volume: '',
            issue: '',
            pages: ''
          };
        } 
        // Check if it's a project
        else if (subCat.startsWith('3.')) {
          return {
            ...researchBaseFields,
            fundingAgency: '',
            fundingAmount: '',
            startDate: '',
            endDate: '',
            role: '',
            collaborators: ''
          };
        }
        // Check if it's a conference presentation
        else if (subCat.startsWith('4.') || subCat.startsWith('5.')) {
          return {
            ...researchBaseFields,
            conferenceName: '',
            conferenceDate: '',
            conferenceLocation: '',
            presentationType: ''
          };
        }
        // Check if it's a department/university presentation
        else if (subCat.startsWith('6.')) {
          return {
            ...researchBaseFields,
            institutionName: '',
            presentationDate: '',
            audience: ''
          };
        }
        // Check if it's an intellectual property claim
        else if (subCat.startsWith('7.')) {
          return {
            ...researchBaseFields,
            patentNumber: '',
            applicationDate: '',
            grantDate: '',
            jurisdiction: ''
          };
        }
        // Default research fields
        return researchBaseFields;
      
      case 'teaching':
        // Common fields for all teaching activities
        const teachingBaseFields = {
          ...baseFields,
          supportingDocument: ''
        };
        
        if (subCat === 'courses') {
          return {
            ...teachingBaseFields,
            academicYear: '',
            term: '',
            courseNumber: '',
            section: '',
            courseDescription: '',
            courseType: '',
            teachingPoints: ''
          };
        } else if (subCat === 'authorship') {
          return {
            ...teachingBaseFields,
            title: '',
            authors: '',
            date: '',
            upCourse: '',
            recommendingUnit: '',
            publisher: '',
            authorshipType: '',
            numberOfAuthors: ''
          };
        }
        return teachingBaseFields;
      
      case 'service':
        // Common fields for all service activities
        const serviceBaseFields = {
          ...baseFields,
          position: '',
          organization: '',
          startDate: '',
          endDate: '',
          serviceType: subCat || '',
          description: '',
          supportingDocument: ''
        };
        
        // Service to UP
        if (subCat.startsWith('I.')) {
          return {
            ...serviceBaseFields,
            office: '',
            committee: '',
            duties: ''
          };
        }
        // Service to Profession
        else if (subCat.startsWith('II.')) {
          return {
            ...serviceBaseFields,
            organizationType: '',
            role: ''
          };
        }
        // Service to Science Education
        else if (subCat.startsWith('III.')) {
          return {
            ...serviceBaseFields,
            venue: '',
            audience: '',
            impact: ''
          };
        }
        // Service to Nation
        else if (subCat.startsWith('IV.')) {
          return {
            ...serviceBaseFields,
            scope: '',
            impact: ''
          };
        }
        return serviceBaseFields;
      
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
      // Use navigate instead of window.location.href to ensure proper routing
      navigate(`/multiple-add?entryData=${encodedData}`);
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
        navigate('/public');
        break;
      case 'request':
        navigate('/requests');
        break;
      default:
        navigate('/home');
    }
  };
  
  // Get sub-categories based on main category
  const getSubCategories = (cat) => {
    switch (cat) {
      case 'research':
        return [
          // PUBLICATIONS
          { id: '1.a', label: '1.a. International publication journal with impact factor' },
          { id: '1.b', label: '1.b. International publication without impact factor' },
          // OTHER PUBLICATIONS
          { id: '1.c', label: '1.c. Monographs (reputable international publisher)' },
          { id: '1.d', label: '1.d. Book/e-book; chapter in book/e-book (reputable international publisher)' },
          { id: '1.e', label: '1.e. Book/e-book; chapter in book/e-book (reputable national publisher)' },
          { id: '1.f', label: '1.f. International conference proceedings' },
          { id: '1.g', label: '1.g. National conference proceedings' },
          { id: '2.a', label: '2.a. Book/e-book; chapter in book/e-book (international publisher)' },
          { id: '2.b', label: '2.b. Article in national scientific journal' },
          { id: '2.c', label: '2.c. Book/chapter in book (national publisher)' },
          { id: '2.d', label: '2.d. International conference proceedings' },
          { id: '2.e', label: '2.e. National conference proceedings' },
          // PROJECTS
          { id: '3.a', label: '3.a. Php 100,000 - 500,000' },
          { id: '3.b', label: '3.b. Php 500,001 - 1,000,000' },
          { id: '3.c', label: '3.c. Php 1,000,001 - 10,000,000' },
          { id: '3.d', label: '3.d. Php > 10,000,000' },
          // CONFERENCE PRESENTATIONS
          { id: '4.a', label: '4.a. Plenary talk/keynote presentation' },
          { id: '4.b.1', label: '4.b.1. Invited talk (Scientific conference)' },
          { id: '4.b.2', label: '4.b.2. Invited talk (Academic Administrator\'s Conference)' },
          { id: '4.c', label: '4.c. Contributed paper (oral/poster)' },
          { id: '5.a', label: '5.a. Plenary talk/keynote presentation' },
          { id: '5.b.1', label: '5.b.1. Invited talk (Scientific conference)' },
          { id: '5.b.2', label: '5.b.2. Invited talk (Academic Administrator\'s Conference)' },
          { id: '5.c', label: '5.c. Contributed paper (oral/poster)' },
          // DEPARTMENT/COLLEGE/UNIVERSITY PRESENTATIONS
          { id: '6.a', label: '6.a. Foreign university' },
          { id: '6.b', label: '6.b. Local university' },
          { id: '6.c', label: '6.c. College/department' },
          // INTELLECTUAL PROPERTY CLAIMS
          { id: '7.a', label: '7.a. Awarded patent/utility Models with multinational jurisdiction' },
          { id: '7.b', label: '7.b. Awarded Philippine/single country patent/Utility Models' },
          { id: '7.c', label: '7.c. Formally lodged multinational copyright' },
          { id: '7.d', label: '7.d. Philippine/Single country lodged copyright' },
          { id: '7.e', label: '7.e. Patented trademark (international/national)' }
        ];
      case 'teaching':
        return [
          { id: 'courses', label: 'Courses and SETs' },
          { id: 'authorship', label: 'Authorship of Books, Modules, etc.' }
        ];
      case 'service':
        return [
          // SERVICE TO UP
          { id: 'I.1.a', label: 'I.1.a. Dean/UP official with ALC of 9 u or more' },
          { id: 'I.1.b', label: 'I.1.b. Director/College Secretary/ UP official with ALC of 6 u' },
          { id: 'I.1.c', label: 'I.1.c. Associate Dean with ALC of 6 units' },
          { id: 'I.1.d', label: 'I.1.d. Program Coordinator/Assistant Secretary/Deputy Directors with ALC of 3 units' },
          { id: 'I.1.e', label: 'I.1.e. Academic Leader/Lab. Head with ALC of 1 unit' },
          { id: 'I.1.f', label: 'I.1.f. Chair in the unit\'s standing Committees/Course Coordinators' },
          { id: 'I.2', label: 'I.2. Membership in a standing committee of the Institute/Department/College/University' },
          // OTHER SERVICE TO UP
          { id: 'I.4.b', label: 'I.4.b. Candidacy Exams' },
          { id: 'I.4.c', label: 'I.4.c. Comprehensive Exams' },
          { id: 'I.4.d', label: 'I.4.d. Qualifying Exams' },
          { id: 'I.4.e', label: 'I.4.e. Placement Exams' },
          { id: 'I.4.f', label: 'I.4.f. Program Advising' },
          // SERVICE TO PROFESSION
          { id: 'II.1.a', label: 'II.1.a. Position of responsibility in an international/regional scientific organization' },
          { id: 'II.1.b', label: 'II.1.b. Position of responsibility in a national scientific organization' },
          { id: 'II.2.a.1', label: 'II.2.a.1 Editorial board member (main or topical) of SCIE – listed journal' },
          { id: 'II.2.a.2', label: 'II.2.a.2. Editorial board member (main or topical) of non-SCIE – listed journal' },
          { id: 'II.2.b.1', label: 'II.2.b.1 Editorial board member (main or topical) of SCIE – listed journal' },
          { id: 'II.2.b.2', label: 'II.2.b.2. Editorial board member (main or topical) of non SCIE – listed/national journal' },
          { id: 'II.3.a', label: 'II.3.a. Referee in SCIE journal (5 points per Review)' },
          { id: 'II.3.b', label: 'II.3.b. Referee in non-SCIE journal' },
          { id: 'II.4', label: 'II.4. Other service to the Science community' },
          // SERVICE TO SCIENCE EDUCATION
          { id: 'III.1.a', label: 'III.1.a. Chair, international/regional Workshop/Training/Conference' },
          { id: 'III.1.b', label: 'III.1.b. Member, international/regional Workshop/Training/Conference' },
          { id: 'III.1.c', label: 'III.1.c. Chair, national Workshop/Training/Conference' },
          { id: 'III.1.d', label: 'III.1.d. Member, national Workshop/Training/Conference' },
          { id: 'III.2', label: 'III.2. Authorship of a scientific reference book/text book/manual' },
          { id: 'III.3.a', label: 'III.3.a. Author of popularized scientific article in international organization/media' },
          { id: 'III.3.b', label: 'III.3.b. Author of popularized scientific article in national organization/media' },
          { id: 'III.4', label: 'III.4. Resource person in print or broadcast media presentations' },
          { id: 'III.5', label: 'III.5. Trainor within area of specialization (international/national)' },
          { id: 'III.6', label: 'III.6. Resource person in symposia related to science education' },
          // SERVICE TO NATION
          { id: 'IV.1.a', label: 'IV.1.a. Member in international/regional scientific/technical committee' },
          { id: 'IV.1.b', label: 'IV.1.b. Member in national/university scientific/technical committee' },
          { id: 'IV.2.a', label: 'IV.2.a. Advisorship to international/regional scientific organization' },
          { id: 'IV.2.b', label: 'IV.2.b. Advisorship to national/university scientific organization' },
          { id: 'IV.3.a', label: 'IV.3.a. Active participation in international/regional outreach program' },
          { id: 'IV.3.b', label: 'IV.3.b. Active participation in national/university outreach program' },
          { id: 'IV.4.a', label: 'IV.4.a. Resource person in international/regional non-scientific meetings/symposium/extension activities' },
          { id: 'IV.4.b', label: 'IV.4.b. Resource person in national/university non-scientific meetings/symposium/extension activities' }
        ];
      case 'request':
        return [
          { id: 'approval', label: 'Approval Request' },
          { id: 'resource', label: 'Resource Request' },
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
        // Common fields for all research activities
        const commonResearchFields = (
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
                <option value="SDG 6">SDG 6: Clean Water and Sanitation</option>
                <option value="SDG 7">SDG 7: Affordable and Clean Energy</option>
                <option value="SDG 8">SDG 8: Decent Work and Economic Growth</option>
                <option value="SDG 9">SDG 9: Industry, Innovation and Infrastructure</option>
                <option value="SDG 10">SDG 10: Reduced Inequalities</option>
                <option value="SDG 11">SDG 11: Sustainable Cities and Communities</option>
                <option value="SDG 12">SDG 12: Responsible Consumption and Production</option>
                <option value="SDG 13">SDG 13: Climate Action</option>
                <option value="SDG 14">SDG 14: Life Below Water</option>
                <option value="SDG 15">SDG 15: Life on Land</option>
                <option value="SDG 16">SDG 16: Peace, Justice and Strong Institutions</option>
                <option value="SDG 17">SDG 17: Partnerships for the Goals</option>
              </select>
            </div>
            <div className="form-group target-group">
              <label>Target Range</label>
              <div className="target-inputs">
                <input
                  type="text"
                  id="targetFrom"
                  name="targetFrom"
                  value={formFields.targetFrom || ''}
                  onChange={handleInputChange}
                  placeholder="From (e.g., 4.1)"
                />
                <span className="target-separator">-</span>
                <input
                  type="text"
                  id="targetTo"
                  name="targetTo"
                  value={formFields.targetTo || ''}
                  onChange={handleInputChange}
                  placeholder="To (e.g., 4.5)"
                />
              </div>
            </div>
          </>
        );
        
        // Additional fields based on subcategory
        let additionalFields = null;
        
        // Publications
        if (subCategory.startsWith('1.') || subCategory.startsWith('2.')) {
          additionalFields = (
            <>
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
                <label htmlFor="journal">Journal/Publication Name</label>
                <input
                  type="text"
                  id="journal"
                  name="journal"
                  value={formFields.journal || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="volume">Volume</label>
                <input
                  type="text"
                  id="volume"
                  name="volume"
                  value={formFields.volume || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="issue">Issue</label>
                <input
                  type="text"
                  id="issue"
                  name="issue"
                  value={formFields.issue || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pages">Pages</label>
                <input
                  type="text"
                  id="pages"
                  name="pages"
                  value={formFields.pages || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., 123-145"
                />
              </div>
            </>
          );
        }
        // Projects
        else if (subCategory.startsWith('3.')) {
          additionalFields = (
            <>
              <div className="form-group">
                <label htmlFor="fundingAgency">Funding Agency</label>
                <input
                  type="text"
                  id="fundingAgency"
                  name="fundingAgency"
                  value={formFields.fundingAgency || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="fundingAmount">Funding Amount (PHP)</label>
                <input
                  type="number"
                  id="fundingAmount"
                  name="fundingAmount"
                  value={formFields.fundingAmount || ''}
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
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formFields.endDate || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Your Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formFields.role || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="collaborators">Collaborators</label>
                <textarea
                  id="collaborators"
                  name="collaborators"
                  value={formFields.collaborators || ''}
                  onChange={handleInputChange}
                  placeholder="List all collaborators"
                />
              </div>
            </>
          );
        }
        // Conference Presentations
        else if (subCategory.startsWith('4.') || subCategory.startsWith('5.')) {
          additionalFields = (
            <>
              <div className="form-group">
                <label htmlFor="conferenceName">Conference Name</label>
                <input
                  type="text"
                  id="conferenceName"
                  name="conferenceName"
                  value={formFields.conferenceName || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="conferenceDate">Conference Date</label>
                <input
                  type="date"
                  id="conferenceDate"
                  name="conferenceDate"
                  value={formFields.conferenceDate || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="conferenceLocation">Conference Location</label>
                <input
                  type="text"
                  id="conferenceLocation"
                  name="conferenceLocation"
                  value={formFields.conferenceLocation || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="presentationType">Presentation Type</label>
                <select
                  id="presentationType"
                  name="presentationType"
                  value={formFields.presentationType || ''}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Presentation Type</option>
                  <option value="Oral">Oral Presentation</option>
                  <option value="Poster">Poster Presentation</option>
                  <option value="Keynote">Keynote/Plenary</option>
                  <option value="Invited">Invited Talk</option>
                </select>
              </div>
            </>
          );
        }
        // Department/University Presentations
        else if (subCategory.startsWith('6.')) {
          additionalFields = (
            <>
              <div className="form-group">
                <label htmlFor="institutionName">Institution Name</label>
                <input
                  type="text"
                  id="institutionName"
                  name="institutionName"
                  value={formFields.institutionName || ''}
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
                  value={formFields.presentationDate || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="audience">Audience</label>
                <input
                  type="text"
                  id="audience"
                  name="audience"
                  value={formFields.audience || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., Faculty, Students, Department members"
                  required
                />
              </div>
            </>
          );
        }
        // Intellectual Property Claims
        else if (subCategory.startsWith('7.')) {
          additionalFields = (
            <>
              <div className="form-group">
                <label htmlFor="patentNumber">Patent/Copyright Number</label>
                <input
                  type="text"
                  id="patentNumber"
                  name="patentNumber"
                  value={formFields.patentNumber || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="applicationDate">Application Date</label>
                <input
                  type="date"
                  id="applicationDate"
                  name="applicationDate"
                  value={formFields.applicationDate || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="grantDate">Grant Date</label>
                <input
                  type="date"
                  id="grantDate"
                  name="grantDate"
                  value={formFields.grantDate || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="jurisdiction">Jurisdiction</label>
                <input
                  type="text"
                  id="jurisdiction"
                  name="jurisdiction"
                  value={formFields.jurisdiction || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., Philippines, International, US"
                  required
                />
              </div>
            </>
          );
        }
        
        // Supporting Document field for all research activities
        const supportingDocumentField = (
          <div className="form-group">
            <label htmlFor="supportingDocument">Supporting Document</label>
            <input
              type="file"
              id="supportingDocument"
              name="supportingDocument"
              onChange={handleInputChange}
            />
          </div>
        );
        
        return (
          <>
            {commonResearchFields}
            {additionalFields}
            {supportingDocumentField}
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
              <label htmlFor="description">Course Description</label>
              <textarea
                id="description"
                name="description"
                value={formFields.description || ''}
                onChange={handleInputChange}
                required
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
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="Summer">Summer</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="courseType">Course Type</label>
              <select
                id="courseType"
                name="courseType"
                value={formFields.courseType || ''}
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
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formFields.endDate || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="serviceType">Service Type</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formFields.serviceType || ''}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Service Type</option>
                <option value="Service to UP">Service to UP</option>
                <option value="Other Service to UP">Other Service to UP</option>
                <option value="Service to Profession">Service to Profession</option>
                <option value="Service to Science Education">Service to Science Education</option>
                <option value="Service to Nation">Service to Nation</option>
              </select>
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
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formFields.displayName || ''}
                onChange={handleInputChange}
                placeholder="How you want your name to appear on this request"
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
            
            {/* Type Dropdown for Research Activities */}
            {category === 'research' && subCategory && types.length > 0 && (
              <div className="form-group classification-group">
                <label htmlFor="typeClassification">Type</label>
                <select
                  id="typeClassification"
                  value={type}
                  onChange={handleTypeChange}
                  required
                >
                  <option value="">Select Type</option>
                  {types.map(typeOption => (
                    <option key={typeOption.id} value={typeOption.id}>
                      {typeOption.label}
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
