import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaSearch, FaArrowLeft, FaPlus } from 'react-icons/fa';
import './TeachingActivities.css';
import './FixedPagination.css';
import './CommonLayout.css';

import editIcon from '../../assets/images/icon-edit.svg';
import shareIcon from '../../assets/images/icon-share.svg';
import myRequestsIcon from '../../assets/images/icon-my requests.svg';

const TeachingActivities = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'courses', label: 'Courses and SETs', type: 'Course' },
    { id: 'authorships', label: 'Authorships', type: 'Authorship' }
  ];

  useEffect(() => {
    const fetchActivities = async (type) => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        const url = `http://localhost:8080/api/teaching-activities/approved/filter?type=${type}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch activities: ${response.status}`);
        }

        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const currentTab = tabs.find(tab => tab.id === activeTab);
    if (currentTab) {
      fetchActivities(currentTab.type);
    }
  }, [activeTab]);

  return (
      <div className="home-root">
        <Sidebar onLogout={onLogout} />

        <main className="home-main teaching-main">
          <div className="go-back-button">
            <button onClick={() => navigate('/home')}>
              <FaArrowLeft /> Go Back
            </button>
          </div>

          <div className="teaching-header">
            <h1>Teaching Activities</h1>
          </div>

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

          {loading && <div>Loading teaching activities...</div>}
          {error && <div className="error-message">{error}</div>}

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
            {activities.length === 0 && !loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No activities found</td>
                </tr>
            ) : (
                activities.map((activity, index) => (
                    <tr key={activity.teachingId} className="table-row">
                      <td className="table-cell details-cell">
                        <div className="course-description">{activity.description}</div>
                      </td>
                      <td className="table-cell">{activity.academicYear}</td>
                      <td className="table-cell">{activity.subtypeDetails}</td>
                      <td className="table-cell">
                        <div className="cell-with-action">
                      <span className="document-icon">
                        <img src={myRequestsIcon} alt="Document" className="document-icon" />
                      </span>
                          {activity.supportingDocument}
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

export default TeachingActivities;
