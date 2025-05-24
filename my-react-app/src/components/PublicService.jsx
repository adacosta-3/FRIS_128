import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaSearch, FaArrowLeft, FaFileAlt } from 'react-icons/fa';
import './PublicService.css';

const PublicService = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample service data
  const services = [
    { id: 1, position: 'Position', office: 'Office', startDate: 'Start Date', endDate: 'End Date', type: 'Service Type', document: 'Supporting Document' },
    { id: 2, position: 'Position', office: 'Office', startDate: 'Start Date', endDate: 'End Date', type: 'Service Type', document: 'Supporting Document' },
    { id: 3, position: 'Position', office: 'Office', startDate: 'Start Date', endDate: 'End Date', type: 'Service Type', document: 'Supporting Document' },
    { id: 4, position: 'Position', office: 'Office', startDate: 'Start Date', endDate: 'End Date', type: 'Service Type', document: 'Supporting Document' },
    { id: 5, position: 'Position', office: 'Office', startDate: 'Start Date', endDate: 'End Date', type: 'Service Type', document: 'Supporting Document' },
    { id: 6, position: 'Position', office: 'Office', startDate: 'Start Date', endDate: 'End Date', type: 'Service Type', document: 'Supporting Document' }
  ];
  
  // Navigation tabs
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'serviceToUP', label: 'Service to UP' },
    { id: 'otherServiceToUP', label: 'Other Service to UP' },
    { id: 'serviceToProfession', label: 'Service to Profession' },
    { id: 'serviceToScience', label: 'Service to Science Education' },
    { id: 'serviceToNation', label: 'Service to Nation' }
  ];

  return (
    <div className="home-root">
      <Sidebar onLogout={onLogout} />
      
      {/* Main Content */}
      <main className="home-main public-service-main">
        {/* Go Back Button */}
        <div className="go-back-button">
          <button onClick={() => navigate('/home')}>
            <FaArrowLeft /> Go Back
          </button>
        </div>
        
        {/* Public Service Header */}
        <div className="public-service-header">
          <h1>Public Service</h1>
        </div>
        
        {/* Tab Navigation */}
        <div className="public-service-tabs">
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
        <div className="public-service-actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search" className="search-input" />
          </div>
          
          <div className="action-buttons">
            <button className="action-button">Single</button>
            <button className="action-button">Multiple</button>
          </div>
        </div>
        
        {/* Services Table */}
        <div className="services-table">
          {/* Table Header */}
          <div className="table-header">
            <div className="header-cell details-cell">Details</div>
            <div className="header-cell">Start Date</div>
            <div className="header-cell">End Date</div>
            <div className="header-cell">Service Type</div>
            <div className="header-cell">Supporting Document</div>
          </div>
          
          {/* Table Body */}
          <div className="table-body">
            {services.map(service => (
              <div key={service.id} className="table-row">
                <div className="table-cell details-cell">
                  <div className="service-position">{service.position}</div>
                  <div className="service-office">{service.office}</div>
                </div>
                <div className="table-cell">{service.startDate}</div>
                <div className="table-cell">{service.endDate}</div>
                <div className="table-cell">{service.type}</div>
                <div className="table-cell">
                  <div className="cell-with-action">
                    <span className="document-icon"><FaFileAlt /></span>
                    {service.document}
                    <button className="edit-button">✏️</button>
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

export default PublicService;
