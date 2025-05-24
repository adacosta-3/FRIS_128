import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import GoogleScholarPopup from './GoogleScholarPopup';
import { FaSearch, FaArrowLeft, FaPlus } from 'react-icons/fa';
import './ResearchActivities.css';
import './CommonLayout.css';

const ResearchActivities = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [showScholarPopup, setShowScholarPopup] = useState(false);
  const [scholarUrl, setScholarUrl] = useState('');

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
    <div className="home-root">
      <Sidebar onLogout={onLogout} />
      <GoogleScholarPopup 
        isOpen={showScholarPopup} 
        onClose={() => setShowScholarPopup(false)} 
        onSave={handleSaveScholar}
      />
      
      {/* Main Content */}
      <main className="home-main research-main">
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
            <button className="action-button"><FaPlus /> Single</button>
            <button className="action-button"><FaPlus /> Multiple</button>
            <button 
              className="action-button google-scholar-btn"
              onClick={() => setShowScholarPopup(true)}
            >
              Google Scholar
            </button>
          </div>
        </div>
        
        {/* Publications Table */}
        <div className="publications-table">
          {/* Table Header */}
          <div className="table-header">
            <div className="header-cell details-cell">Details</div>
            <div className="header-cell">DOI</div>
            <div className="header-cell">Publication Type</div>
            <div className="header-cell">SDG</div>
            <div className="header-cell">Target/s</div>
          </div>
          
          {/* Table Body */}
          <div className="table-body">
            {publications.map(pub => (
              <div key={pub.id} className="table-row">
                <div className="table-cell details-cell">
                  <div className="publication-title">{pub.title}</div>
                  <div className="publication-authors">{pub.authors}</div>
                  <div className="publication-date">{pub.date}</div>
                </div>
                <div className="table-cell">{pub.doi}</div>
                <div className="table-cell">{pub.type}</div>
                <div className="table-cell">{pub.sdg}</div>
                <div className="table-cell">
                  <div className="cell-with-action">
                    {pub.target}
                    <button className="share-button">↗</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
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
