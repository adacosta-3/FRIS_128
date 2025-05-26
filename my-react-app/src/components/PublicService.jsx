// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Footer from './Footer';
// import { FaSearch, FaArrowLeft, FaPlus } from 'react-icons/fa';
// import './PublicService.css';
// import './FixedPagination.css';
//
// // Import custom SVG icons
// import editIcon from '../../assets/images/icon-edit.svg';
// import shareIcon from '../../assets/images/icon-share.svg';
// import myRequestsIcon from '../../assets/images/icon-my requests.svg';
//
// const PublicService = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('all');
//
//   // Sample service data
//   const services = [
//     { id: 1, position: 'Position', office: 'Office', startDate: 'Start Date', endDate: 'End Date', type: 'Service Type', document: 'Supporting Document' },
//     { id: 2, position: 'Position', office: 'Office', startDate: 'Start Date', endDate: 'End Date', type: 'Service Type', document: 'Supporting Document' },
//     { id: 3, position: 'Position', office: 'Office', startDate: 'Start Date', endDate: 'End Date', type: 'Service Type', document: 'Supporting Document' },
//     { id: 4, position: 'Position', office: 'Office', startDate: 'Start Date', endDate: 'End Date', type: 'Service Type', document: 'Supporting Document' },
//     { id: 5, position: 'Position', office: 'Office', startDate: 'Start Date', endDate: 'End Date', type: 'Service Type', document: 'Supporting Document' },
//     { id: 6, position: 'Position', office: 'Office', startDate: 'Start Date', endDate: 'End Date', type: 'Service Type', document: 'Supporting Document' }
//   ];
//
//   // Navigation tabs
//   const tabs = [
//     { id: 'all', label: 'All' },
//     { id: 'serviceToUP', label: 'Service to UP' },
//     { id: 'otherServiceToUP', label: 'Other Service to UP' },
//     { id: 'serviceToProfession', label: 'Service to Profession' },
//     { id: 'serviceToScience', label: 'Service to Science Education' },
//     { id: 'serviceToNation', label: 'Service to Nation' }
//   ];
//
//   return (
//     <div className="home-root">
//       <Sidebar onLogout={onLogout} />
//
//       {/* Main Content */}
//       <main className="home-main public-service-main">
//         {/* Go Back Button */}
//         <div className="go-back-button">
//           <button onClick={() => navigate('/home')}>
//             <FaArrowLeft /> Go Back
//           </button>
//         </div>
//
//         {/* Public Service Header */}
//         <div className="public-service-header">
//           <h1>Public Service</h1>
//         </div>
//
//         {/* Tab Navigation */}
//         <div className="public-service-tabs">
//           {tabs.map(tab => (
//             <button
//               key={tab.id}
//               className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//
//         {/* Search Bar and Action Buttons */}
//         <div className="public-service-actions">
//           <div className="search-container">
//             <FaSearch className="search-icon" />
//             <input type="text" placeholder="Search" className="search-input" />
//           </div>
//
//           <div className="action-buttons">
//             <button
//               className="action-button"
//               onClick={() => navigate('/add-entry?category=service')}
//             >
//               <FaPlus /> Single
//             </button>
//             <button
//               className="action-button"
//               onClick={() => navigate('/add-multiple-entries?category=service')}
//             >
//               <FaPlus /> Multiple
//             </button>
//           </div>
//         </div>
//
//         {/* Services Table */}
//         <table className="services-table">
//           <thead>
//             <tr className="table-header">
//               <th className="header-cell details-cell">Details</th>
//               <th className="header-cell">Start Date</th>
//               <th className="header-cell">End Date</th>
//               <th className="header-cell">Service Type</th>
//               <th className="header-cell">Supporting Document</th>
//               <th className="header-cell actions-cell">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Table Rows */}
//             {services.map((service, index) => (
//               <tr key={service.id} className="table-row">
//                 <td className="table-cell details-cell">
//                   <div className="service-position">{service.position}</div>
//                   <div className="service-office">{service.office}</div>
//                 </td>
//                 <td className="table-cell">{service.startDate}</td>
//                 <td className="table-cell">{service.endDate}</td>
//                 <td className="table-cell">{service.type}</td>
//                 <td className="table-cell">
//                   <div className="cell-with-action">
//                     <span className="document-icon">
//                       <img src={myRequestsIcon} alt="Document" className="document-icon" />
//                     </span>
//                     <span className="document-text">{service.document}</span>
//                   </div>
//                 </td>
//                 <td className="table-cell actions-cell">
//                   <button className="edit-button">
//                     {index === 0 ? (
//                       <img src={shareIcon} alt="Share" className="action-icon" />
//                     ) : (
//                       <img src={editIcon} alt="Edit" className="action-icon" />
//                     )}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//
//         {/* Pagination */}
//         <div className="pagination">
//           <button className="pagination-button">Prev</button>
//           <div className="pagination-numbers">
//             <button className="pagination-number active">1</button>
//             <button className="pagination-number">2</button>
//             <button className="pagination-number">3</button>
//             <button className="pagination-number">4</button>
//           </div>
//           <button className="pagination-button">Next</button>
//         </div>
//
//         {/* Footer */}
//         <Footer />
//       </main>
//     </div>
//   );
// };
//
// export default PublicService;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaSearch, FaArrowLeft, FaPlus } from 'react-icons/fa';
import './PublicService.css';
import './FixedPagination.css';

import editIcon from '../../assets/images/icon-edit.svg';
import shareIcon from '../../assets/images/icon-share.svg';
import myRequestsIcon from '../../assets/images/icon-my requests.svg';

const PublicService = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'all', label: 'All', typeName: null },
    { id: 'serviceToUP', label: 'Service to UP', typeName: 'Service to UP' },
    { id: 'otherServiceToUP', label: 'Other Service to UP', typeName: 'Other Service to UP' },
    { id: 'serviceToProfession', label: 'Service to Profession', typeName: 'Service to Profession' },
    { id: 'serviceToScience', label: 'Service to Science Education', typeName: 'Service to Science Education' },
    { id: 'serviceToNation', label: 'Service to Nation', typeName: 'Service to Nation' }
  ];

  useEffect(() => {
    const fetchServices = async (typeName) => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        const url = typeName
            ? `http://localhost:8080/api/public-service/approved/filter?typeName=${encodeURIComponent(typeName)}`
            : `http://localhost:8080/api/public-service/approved`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch public service: ${response.status}`);
        }

        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const currentTab = tabs.find(tab => tab.id === activeTab);
    fetchServices(currentTab?.typeName);
  }, [activeTab]);

  return (
      <div className="home-root">
        <Sidebar onLogout={onLogout} />

        <main className="home-main public-service-main">
          <div className="go-back-button">
            <button onClick={() => navigate('/home')}>
              <FaArrowLeft /> Go Back
            </button>
          </div>

          <div className="public-service-header">
            <h1>Public Service</h1>
          </div>

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

          <div className="public-service-actions">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search" className="search-input" />
            </div>

            <div className="action-buttons">
              <button
                  className="action-button"
                  onClick={() => navigate('/add-entry?category=service')}
              >
                <FaPlus /> Single
              </button>
              <button
                  className="action-button"
                  onClick={() => navigate('/add-multiple-entries?category=service')}
              >
                <FaPlus /> Multiple
              </button>
            </div>
          </div>

          {loading && <div>Loading public service activities...</div>}
          {error && <div className="error-message">{error}</div>}

          <table className="services-table">
            <thead>
            <tr className="table-header">
              <th className="header-cell details-cell">Details</th>
              <th className="header-cell">Start Date</th>
              <th className="header-cell">End Date</th>
              <th className="header-cell">Service Type</th>
              <th className="header-cell">Supporting Document</th>
              <th className="header-cell actions-cell">Actions</th>
            </tr>
            </thead>
            <tbody>
            {services.length === 0 && !loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No public service entries found</td>
                </tr>
            ) : (
                services.map((service, index) => (
                    <tr key={service.serviceId} className="table-row">
                      <td className="table-cell details-cell">
                        <div className="service-description">{service.description}</div>
                      </td>
                      <td className="table-cell">{service.startDate || 'N/A'}</td>
                      <td className="table-cell">{service.endDate || 'N/A'}</td>
                      <td className="table-cell">{`${service.typeName} - ${service.subtypeName}`}</td>
                      <td className="table-cell">
                        <div className="cell-with-action">
                      <span className="document-icon">
                        <img src={myRequestsIcon} alt="Document" className="document-icon" />
                      </span>
                          <span className="document-text">{service.supportingDocument || 'N/A'}</span>
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

export default PublicService;
