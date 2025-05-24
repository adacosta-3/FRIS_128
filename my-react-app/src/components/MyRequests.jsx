import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import GoogleScholarPopup from './GoogleScholarPopup';
import { FaSearch, FaArrowLeft, FaPlus } from 'react-icons/fa';
import './MyRequests.css';

const MyRequests = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState('pending');
  const [showScholarPopup, setShowScholarPopup] = useState(false);
  const [scholarUrl, setScholarUrl] = useState('');

  const handleSaveScholar = (url) => {
    setScholarUrl(url);
    console.log('Google Scholar URL saved:', url);
    // In a real app, you would save this to the user's profile
  };
  
  // Sample requests data
  const requests = [
    { id: 1, title: 'Title', authors: 'Author/s', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
    { id: 2, title: 'Title', authors: 'Author/s', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
    { id: 3, title: 'Title', authors: 'Author/s', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
    { id: 4, title: 'Title', authors: 'Author/s', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
    { id: 5, title: 'Title', authors: 'Author/s', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
    { id: 6, title: 'Title', authors: 'Author/s', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' }
  ];
  
  // Status filters
  const statuses = [
    { id: 'pending', label: 'Pending' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'rejected', label: 'Rejected' }
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
      <main className="home-main my-requests-main">
        {/* Go Back Button */}
        <div className="go-back-button">
          <button onClick={() => navigate('/home')}>
            <FaArrowLeft /> Go Back
          </button>
        </div>
        
        {/* My Requests Header */}
        <div className="my-requests-header">
          <h1>My Requests</h1>
        </div>
        
        {/* Status Filters and Search */}
        <div className="requests-actions">
          <div className="status-filters">
            {statuses.map(status => (
              <button 
                key={status.id} 
                className={`status-button ${activeStatus === status.id ? 'active' : ''}`}
                onClick={() => setActiveStatus(status.id)}
              >
                {status.label}
              </button>
            ))}
          </div>
          
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
        
        {/* Requests Table */}
        <div className="requests-table">
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
            {requests.map(request => (
              <div key={request.id} className="table-row">
                <div className="table-cell details-cell">
                  <div className="request-title">{request.title}</div>
                  <div className="request-authors">{request.authors}</div>
                </div>
                <div className="table-cell">{request.doi}</div>
                <div className="table-cell">{request.type}</div>
                <div className="table-cell">{request.sdg}</div>
                <div className="table-cell">
                  <div className="cell-with-action">
                    {request.target}
                    <button 
                      className="share-button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowScholarPopup(true);
                      }}
                    >
                      ↗
                    </button>
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

export default MyRequests;
