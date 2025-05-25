import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import GoogleScholarPopup from './GoogleScholarPopup';
import { FaSearch, FaArrowLeft, FaPlus, FaGraduationCap, FaPencilAlt } from 'react-icons/fa';
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
    <div className="my-requests-root">
      {showScholarPopup && (
        <GoogleScholarPopup 
          isOpen={true} 
          onClose={() => setShowScholarPopup(false)} 
          onSave={handleSaveScholar}
        />
      )}
      <Sidebar onLogout={onLogout} />
      
      {/* Main Content */}
      <main className="my-requests-main">
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
            <button 
              className="action-btn single"
              onClick={() => navigate('/add-entry?category=request')}
            >
              <FaPlus /> Single
            </button>
            <button 
              className="action-btn multiple"
              onClick={() => navigate('/add-multiple-entries?category=request')}
            >
              <FaPlus /> Multiple
            </button>
            <button 
              className="action-btn scholar" 
              onClick={() => setShowScholarPopup(true)}
            >
              <FaGraduationCap /> Google Scholar
            </button>
          </div>
        </div>
        
        {/* Requests Table */}
        <div className="requests-table">
          {/* Table Header */}
          <div className="table-header">
            <div className="header-cell details-cell">Title</div>
            <div className="header-cell">Author/s</div>
            <div className="header-cell">Publication Type</div>
            <div className="header-cell actions-cell">Actions</div>
          </div>
          
          {/* Table Body */}
          <div className="table-body">
            {requests.map(request => (
              <div key={request.id} className="table-row">
                <div className="table-cell details-cell">
                  <div className="request-title">{request.title}</div>
                </div>
                <div className="table-cell">
                  <div className="request-authors">{request.authors}</div>
                </div>
                <div className="table-cell">{request.type}</div>
                <div className="table-cell actions-cell">
                  <button 
                    className="edit-button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Edit functionality would go here
                      console.log('Edit request:', request.id);
                    }}
                  >
                    <FaPencilAlt />
                  </button>
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
