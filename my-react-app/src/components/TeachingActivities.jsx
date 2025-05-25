import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaSearch, FaArrowLeft, FaPlus } from 'react-icons/fa';
import './TeachingActivities.css';
import './FixedPagination.css';
import './CommonLayout.css';

// Import custom SVG icons
import editIcon from '../../assets/images/icon-edit.svg';
import shareIcon from '../../assets/images/icon-share.svg';
import myRequestsIcon from '../../assets/images/icon-my requests.svg';

const TeachingActivities = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');
  
  // Sample course data
  const courses = [
    { id: 1, number: 'Course Number', section: 'Section', description: 'Course Description', year: 'Academic Year, Term', type: 'Course Type, Teaching Points', document: 'Supporting Document' },
    { id: 2, number: 'Course Number', section: 'Section', description: 'Course Description', year: 'Academic Year, Term', type: 'Course Type, Teaching Points', document: 'Supporting Document' },
    { id: 3, number: 'Course Number', section: 'Section', description: 'Course Description', year: 'Academic Year, Term', type: 'Course Type, Teaching Points', document: 'Supporting Document' },
    { id: 4, number: 'Course Number', section: 'Section', description: 'Course Description', year: 'Academic Year, Term', type: 'Course Type, Teaching Points', document: 'Supporting Document' },
    { id: 5, number: 'Course Number', section: 'Section', description: 'Course Description', year: 'Academic Year, Term', type: 'Course Type, Teaching Points', document: 'Supporting Document' },
    { id: 6, number: 'Course Number', section: 'Section', description: 'Course Description', year: 'Academic Year, Term', type: 'Course Type, Teaching Points', document: 'Supporting Document' }
  ];
  
  // Navigation tabs
  const tabs = [
    { id: 'courses', label: 'Courses and SETs' },
    { id: 'authorships', label: 'Authorships' }
  ];

  return (
    <div className="home-root">
      <Sidebar onLogout={onLogout} />
      
      {/* Main Content */}
      <main className="home-main teaching-main">
        {/* Go Back Button */}
        <div className="go-back-button">
          <button onClick={() => navigate('/home')}>
            <FaArrowLeft /> Go Back
          </button>
        </div>
        
        {/* Teaching Activities Header */}
        <div className="teaching-header">
          <h1>Teaching Activities</h1>
        </div>
        
        {/* Tab Navigation */}
        <div className="teaching-tabs">
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Search Bar and Action Buttons */}
        <div className="teaching-actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search" className="search-input" />
          </div>
          
          <div className="action-buttons">
            <button 
              className="action-button"
              onClick={() => navigate('/add-entry?category=teaching')}
            >
              <FaPlus /> Single
            </button>
            <button 
              className="action-button"
              onClick={() => navigate('/add-multiple-entries?category=teaching')}
            >
              <FaPlus /> Multiple
            </button>
          </div>
        </div>
        
        {/* Courses Table */}
        <table className="courses-table">
          <thead>
            <tr className="table-header">
              <th className="header-cell details-cell">Details</th>
              <th className="header-cell">Academic Year, Term</th>
              <th className="header-cell">Course Type, Teaching Points</th>
              <th className="header-cell">Supporting Document</th>
              <th className="header-cell actions-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Table Rows */}
            {courses.map((course, index) => (
              <tr key={course.id} className="table-row">
                <td className="table-cell details-cell">
                  <div className="course-number">{course.number}</div>
                  <div className="course-section">{course.section}</div>
                  <div className="course-description">{course.description}</div>
                </td>
                <td className="table-cell">{course.year}</td>
                <td className="table-cell">{course.type}</td>
                <td className="table-cell">
                  <div className="cell-with-action">
                    <span className="document-icon">
                      <img src={myRequestsIcon} alt="Document" className="document-icon" />
                    </span>
                    {course.document}
                  </div>
                </td>
                <td className="table-cell actions-cell">
                  <button className="edit-button">
                    {index === 0 ? (
                      <img src={shareIcon} alt="Share" className="action-icon" />
                    ) : (
                      <img src={editIcon} alt="Edit" className="action-icon" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-button">Prev</button>
          <div className="pagination-numbers">
            <button className="pagination-number active">1</button>
            <button className="pagination-number">2</button>
            <button className="pagination-number">3</button>
            <button className="pagination-number">4</button>
          </div>
          <button className="pagination-button">Next</button>
        </div>
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default TeachingActivities;
