import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import GoogleScholarPopup from './GoogleScholarPopup';
import { FaSearch, FaArrowLeft, FaPlus, FaGraduationCap } from 'react-icons/fa';
import './ResearchActivities.css';
import './FixedPagination.css';
import './CommonLayout.css';

// Import custom SVG icons
import editIcon from '../../assets/images/icon-edit.svg';
import shareIcon from '../../assets/images/icon-share.svg';
import myRequestsIcon from '../../assets/images/icon-my requests.svg';
import linkIcon from '../../assets/images/icon-link.svg';

const ResearchActivities = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [showScholarPopup, setShowScholarPopup] = useState(false);
  const [scholarUrl, setScholarUrl] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSaveScholar = (url) => {
    setScholarUrl(url);
    console.log('Google Scholar URL saved:', url);
    // In a real app, you would save this to the user's profile
  };

  // Sample publication data
  const publications = [
    { id: 1, title: 'Title', authors: 'Author/s', date: 'Date Published', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
    { id: 2, title: 'Title', authors: 'Author/s', date: 'Date Published', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
    { id: 3, title: 'Title', authors: 'Author/s', date: 'Date Published', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
    { id: 4, title: 'Title', authors: 'Author/s', date: 'Date Published', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
    { id: 5, title: 'Title', authors: 'Author/s', date: 'Date Published', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
    { id: 6, title: 'Title', authors: 'Author/s', date: 'Date Published', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' }
  ];

  // Navigation tabs
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'publications', label: 'Publications' },
    { id: 'otherPublications', label: 'Other Publications' },
    { id: 'projects', label: 'Projects' },
    { id: 'conferencePresentations', label: 'Conference Presentations' },
    { id: 'departmentPresentations', label: 'Department/College/University Presentations' },
    { id: 'intellectualProperty', label: 'Intellectual Property Claims' }
  ];

  return (
    <div className="research-activities-root">
      {showScholarPopup && (
        <GoogleScholarPopup 
          isOpen={true} 
          onClose={() => setShowScholarPopup(false)} 
          onSave={handleSaveScholar}
        />
      )}
      <Sidebar onLogout={onLogout} />
      <main className="research-main">
        {/* Go Back Button */}
        <div className="go-back-button">
          <button onClick={() => navigate('/home')}>
            <FaArrowLeft /> Go Back
          </button>
        </div>
        
        {/* Research Activities Header */}
        <div className="research-header">
          <h1>Research Activities</h1>
        </div>
        
        {/* Tab Navigation */}
        <div className="research-tabs">
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
        <div className="research-actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search" className="search-input" />
          </div>
          <div className="action-buttons">
            <button 
              className="action-btn single"
              onClick={() => navigate('/add-entry?category=research')}
            >
              <FaPlus /> Single
            </button>
            <button 
              className="action-btn multiple"
              onClick={() => navigate('/add-multiple-entries?category=research')}
            >
              <FaPlus /> Multiple
            </button>
            <button 
              className="action-btn scholar" 
              onClick={() => navigate('/research/google-scholar')}
            >
              <img src={linkIcon} alt="Link" className="button-icon" /> Google Scholar
            </button>
          </div>
        </div>
        
        {/* Publications Table */}
        <table className="publications-table">
          <thead>
            <tr className="table-header">
              <th className="header-cell details-cell">Details</th>
              <th className="header-cell">DOI</th>
              <th className="header-cell">Publication Type</th>
              <th className="header-cell">SDG</th>
              <th className="header-cell">Target/s</th>
              <th className="header-cell actions-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Table Rows */}
            {publications.map((pub, index) => (
              <tr key={pub.id} className="table-row">
                <td className="table-cell details-cell">
                  <div className="publication-title">{pub.title}</div>
                  <div className="publication-authors">{pub.authors}</div>
                  <div className="publication-date">{pub.date}</div>
                </td>
                <td className="table-cell">{pub.doi}</td>
                <td className="table-cell">{pub.type}</td>
                <td className="table-cell">{pub.sdg}</td>
                <td className="table-cell">{pub.target}</td>
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

export default ResearchActivities;
