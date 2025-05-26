// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Footer from './Footer';
// import GoogleScholarPopup from './GoogleScholarPopup';
// import { FaSearch, FaArrowLeft, FaPlus, FaGraduationCap, FaPencilAlt } from 'react-icons/fa';
// import './MyRequests.css';
//
// const MyRequests = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [activeStatus, setActiveStatus] = useState('pending');
//   const [showScholarPopup, setShowScholarPopup] = useState(false);
//   const [scholarUrl, setScholarUrl] = useState('');
//
//   const handleSaveScholar = (url) => {
//     setScholarUrl(url);
//     console.log('Google Scholar URL saved:', url);
//     // In a real app, you would save this to the user's profile
//   };
//
//   // Sample requests data
//   const requests = [
//     { id: 1, title: 'Title', authors: 'Author/s', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
//     { id: 2, title: 'Title', authors: 'Author/s', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
//     { id: 3, title: 'Title', authors: 'Author/s', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
//     { id: 4, title: 'Title', authors: 'Author/s', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
//     { id: 5, title: 'Title', authors: 'Author/s', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' },
//     { id: 6, title: 'Title', authors: 'Author/s', doi: 'DOI', type: 'Publication Type', sdg: 'SDG', target: 'Target/s' }
//   ];
//
//   // Status filters
//   const statuses = [
//     { id: 'pending', label: 'Pending' },
//     { id: 'approved', label: 'Approved' },
//     { id: 'rejected', label: 'Rejected' }
//   ];
//
//   return (
//     <div className="my-requests-root">
//       {showScholarPopup && (
//         <GoogleScholarPopup
//           isOpen={true}
//           onClose={() => setShowScholarPopup(false)}
//           onSave={handleSaveScholar}
//         />
//       )}
//       <Sidebar onLogout={onLogout} />
//
//       {/* Main Content */}
//       <main className="my-requests-main">
//         {/* Go Back Button */}
//         <div className="go-back-button">
//           <button onClick={() => navigate('/home')}>
//             <FaArrowLeft /> Go Back
//           </button>
//         </div>
//
//         {/* My Requests Header */}
//         <div className="my-requests-header">
//           <h1>My Requests</h1>
//         </div>
//
//         {/* Status Filters and Search */}
//         <div className="requests-actions">
//           <div className="status-filters">
//             {statuses.map(status => (
//               <button
//                 key={status.id}
//                 className={`status-button ${activeStatus === status.id ? 'active' : ''}`}
//                 onClick={() => setActiveStatus(status.id)}
//               >
//                 {status.label}
//               </button>
//             ))}
//           </div>
//
//           <div className="search-container">
//             <FaSearch className="search-icon" />
//             <input type="text" placeholder="Search" className="search-input" />
//           </div>
//
//           <div className="action-buttons">
//             <button
//               className="action-btn single"
//               onClick={() => navigate('/add-entry?category=request')}
//             >
//               <FaPlus /> Single
//             </button>
//             <button
//               className="action-btn multiple"
//               onClick={() => navigate('/add-multiple-entries?category=request')}
//             >
//               <FaPlus /> Multiple
//             </button>
//             <button
//               className="action-btn scholar"
//               onClick={() => navigate('/research/google-scholar')}
//             >
//               <FaGraduationCap /> Google Scholar
//             </button>
//           </div>
//         </div>
//
//         {/* Requests Table */}
//         <div className="requests-table">
//           {/* Table Header */}
//           <div className="table-header">
//             <div className="header-cell details-cell">Title</div>
//             <div className="header-cell">Author/s</div>
//             <div className="header-cell">Publication Type</div>
//             <div className="header-cell actions-cell">Actions</div>
//           </div>
//
//           {/* Table Body */}
//           <div className="table-body">
//             {requests.map(request => (
//               <div key={request.id} className="table-row">
//                 <div className="table-cell details-cell">
//                   <div className="request-title">{request.title}</div>
//                 </div>
//                 <div className="table-cell">
//                   <div className="request-authors">{request.authors}</div>
//                 </div>
//                 <div className="table-cell">{request.type}</div>
//                 <div className="table-cell actions-cell">
//                   <button
//                     className="edit-button"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       // Edit functionality would go here
//                       console.log('Edit request:', request.id);
//                     }}
//                   >
//                     <FaPencilAlt />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
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
// export default MyRequests;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaSearch, FaArrowLeft, FaPlus, FaGraduationCap, FaPencilAlt } from 'react-icons/fa';
import './MyRequests.css';

const MyRequests = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState('Pending');
  const [activeType, setActiveType] = useState('publication');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statuses = ['Pending', 'Rejected'];
  const activityTypes = ['publication', 'teaching', 'service'];

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        const url = `http://localhost:8080/api/submissions/me/filter?statuses=${activeStatus}&activityType=${activeType}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch requests: ${response.status}`);
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [activeStatus, activeType]);

  return (
      <div className="my-requests-root">
        <Sidebar onLogout={onLogout} />

        <main className="my-requests-main">
          <div className="go-back-button">
            <button onClick={() => navigate('/home')}>
              <FaArrowLeft /> Go Back
            </button>
          </div>

          <div className="my-requests-header">
            <h1>My Requests</h1>
          </div>

          {/* Status & Type Filters */}
          <div className="requests-actions">
            <div className="status-filters">
              {statuses.map(status => (
                  <button
                      key={status}
                      className={`status-button ${activeStatus === status ? 'active' : ''}`}
                      onClick={() => setActiveStatus(status)}
                  >
                    {status}
                  </button>
              ))}
            </div>

            <div className="type-filters">
              {activityTypes.map(type => (
                  <button
                      key={type}
                      className={`status-button ${activeType === type ? 'active' : ''}`}
                      onClick={() => setActiveType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
              ))}
            </div>

            <div className="search-container">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search" className="search-input" />
            </div>

            <div className="action-buttons">
              <button className="action-btn single" onClick={() => navigate('/add-entry?category=request')}>
                <FaPlus /> Single
              </button>
              <button className="action-btn multiple" onClick={() => navigate('/add-multiple-entries?category=request')}>
                <FaPlus /> Multiple
              </button>
              <button className="action-btn scholar" onClick={() => navigate('/research/google-scholar')}>
                <FaGraduationCap /> Google Scholar
              </button>
            </div>
          </div>

          {loading && <div>Loading submissions...</div>}
          {error && <div className="error-message">{error}</div>}

          <div className="requests-table">
            <div className="table-header">
              <div className="header-cell">Activity Type</div>
              <div className="header-cell">Title / Description</div>
              <div className="header-cell">Status</div>
              <div className="header-cell">Current Approver</div>
              <div className="header-cell">Last Updated</div>
              <div className="header-cell actions-cell">Actions</div>
            </div>

            <div className="table-body">
              {requests.length === 0 && !loading ? (
                  <div className="table-row" style={{ textAlign: 'center' }}>No submissions found</div>
              ) : (
                  requests.map((req) => (
                      <div key={req.submissionId} className="table-row">
                        <div className="table-cell">{req.activityType}</div>
                        <div className="table-cell">{req.activityTitleOrDescription}</div>
                        <div className="table-cell">{req.status}</div>
                        <div className="table-cell">{req.currentApproverRole} - {req.currentApproverName}</div>
                        <div className="table-cell">{req.lastUpdated}</div>
                        <div className="table-cell actions-cell">
                          <button className="edit-button" onClick={() => console.log('Edit:', req.submissionId)}>
                            <FaPencilAlt />
                          </button>
                        </div>
                      </div>
                  ))
              )}
            </div>
          </div>

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

export default MyRequests;
