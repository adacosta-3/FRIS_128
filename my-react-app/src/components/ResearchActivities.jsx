import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaSearch, FaArrowLeft, FaPlus } from 'react-icons/fa';
import './ResearchActivities.css';
import './FixedPagination.css';
import './CommonLayout.css';

import editIcon from '../../assets/images/icon-edit.svg';
import shareIcon from '../../assets/images/icon-share.svg';
import linkIcon from '../../assets/images/icon-link.svg';

const ResearchActivities = ({ onLogout }) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  // We no longer need the popup state
  const [scholarUrl, setScholarUrl] = useState('');
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'all', label: 'All', typeName: 'all' },
    { id: 'publications', label: 'Publications', typeName: 'publication' },
    { id: 'otherPublications', label: 'Other Publications', typeName: 'other' },
    { id: 'projects', label: 'Projects', typeName: 'project' },
    { id: 'conferencePresentations', label: 'Conference Presentations', typeName: 'conference' },
    { id: 'departmentPresentations', label: 'Department/College/University Presentations', typeName: 'department' },
    { id: 'intellectualProperty', label: 'Intellectual Property Claims', typeName: 'intellectual_property' }
  ];

  useEffect(() => {
    console.log('Active tab changed:', activeTab);
    const fetchPublications = async (typeName) => {
      setLoading(true);
      setError(null);
      console.log('Fetching publications with type:', typeName);

      try {
        const token = localStorage.getItem('token');
        console.log('Using token:', token);

        const url = typeName === 'all'
            ? 'http://localhost:8080/api/publications/approved'
            : `http://localhost:8080/api/publications/approved/filter?typeName=${typeName}`;
        console.log('Fetch URL:', url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Fetch response status:', response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch publications: ${response.status}`);
        }

        const data = await response.json();
        console.log('Publications fetched:', data);
        setPublications(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const currentTab = tabs.find(tab => tab.id === activeTab);
    if (currentTab) {
      fetchPublications(currentTab.typeName);
    }
  }, [activeTab]);

  // We no longer need the handleSaveScholar function as we're redirecting directly to the linking page

  return (
      <div className="research-activities-root">

        <Sidebar onLogout={onLogout} />

        <main className="research-main">
          <div className="go-back-button">
            <button onClick={() => navigate('/home')}>
              <FaArrowLeft /> Go Back
            </button>
          </div>

          <div className="research-header">
            <h1>Research Activities</h1>
          </div>

          <div className="research-tabs">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => {
                      console.log('Tab clicked:', tab.id);
                      setActiveTab(tab.id);
                    }}
                >
                  {tab.label}
                </button>
            ))}
          </div>

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
                  onClick={() => {
                    // Check if user already has a linked account
                    const hasLinkedAccount = localStorage.getItem('googleScholarLinked') === 'true';
                    if (hasLinkedAccount) {
                      // If already linked, redirect to the publications page
                      navigate('/research/google-scholar/publications');
                    } else {
                      // If not linked, redirect to the Google Scholar linking page
                      navigate('/research/google-scholar');
                    }
                  }}
              >
                <img src={linkIcon} alt="Link" className="button-icon" /> Google Scholar
              </button>
            </div>
          </div>

          {/* Display scholarUrl hidden for ESLint */}
          <div style={{ display: 'none' }}>{scholarUrl}</div>

          {loading && <div>Loading publications...</div>}
          {error && <div className="error-message">{error}</div>}

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
            {publications.length === 0 && !loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No publications found
                  </td>
                </tr>
            ) : (
                publications.map((pub, index) => (
                    <tr key={pub.id} className="table-row">
                      <td className="table-cell details-cell">
                        <div className="publication-title">{pub.title}</div>
                        <div className="publication-authors">{pub.authors}</div>
                        <div className="publication-date">{pub.datePublished}</div>
                      </td>
                      <td className="table-cell">{pub.doi}</td>
                      <td className="table-cell">{pub.publicationType}</td>
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
                ))
            )}
            </tbody>
          </table>

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

          <Footer />
        </main>
      </div>
  );
};

export default ResearchActivities;
