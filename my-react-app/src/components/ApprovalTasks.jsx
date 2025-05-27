// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Footer from './Footer';
// import { FaSearch, FaEye, FaArrowLeft } from 'react-icons/fa';
// import './MyRequests.css'; // Reusing the same styles
//
// const ApprovalTasks = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [activeStatus, setActiveStatus] = useState('pending');
//   const [searchQuery, setSearchQuery] = useState('');
//
//   // Sample requests data for approval tasks
//   const requests = [
//     {
//       id: 1,
//       title: 'Machine Learning Applications in Healthcare',
//       authors: 'K. J. Arellano, J. Smith',
//       type: 'Journal Article',
//       submittedBy: 'Kristine Joy Arellano',
//       submittedDate: '2025-05-20'
//     },
//     {
//       id: 2,
//       title: 'Data Mining Techniques for Educational Data',
//       authors: 'K. J. Arellano, M. Johnson',
//       type: 'Conference Paper',
//       submittedBy: 'Kristine Joy Arellano',
//       submittedDate: '2025-05-18'
//     },
//     {
//       id: 3,
//       title: 'Artificial Intelligence in Agriculture',
//       authors: 'K. J. Arellano, R. Davis',
//       type: 'Book Chapter',
//       submittedBy: 'Kristine Joy Arellano',
//       submittedDate: '2025-05-15'
//     },
//     {
//       id: 4,
//       title: 'Neural Networks for Image Recognition',
//       authors: 'K. J. Arellano, T. Wilson',
//       type: 'Journal Article',
//       submittedBy: 'Kristine Joy Arellano',
//       submittedDate: '2025-05-10'
//     },
//     {
//       id: 5,
//       title: 'Blockchain Technology in Education',
//       authors: 'K. J. Arellano, L. Brown',
//       type: 'Conference Paper',
//       submittedBy: 'Kristine Joy Arellano',
//       submittedDate: '2025-05-05'
//     },
//     {
//       id: 6,
//       title: 'Deep Learning for Natural Language Processing',
//       authors: 'K. J. Arellano, P. Garcia',
//       type: 'Journal Article',
//       submittedBy: 'Kristine Joy Arellano',
//       submittedDate: '2025-05-01'
//     }
//   ];
//
//   // Status filters
//   const statuses = [
//     { id: 'pending', label: 'Pending' },
//     { id: 'approved', label: 'Approved' },
//     { id: 'rejected', label: 'Rejected' }
//   ];
//
//   // Handle viewing a request
//   const handleViewRequest = (requestId) => {
//     navigate(`/approval-tasks/view/${requestId}`);
//   };
//
//   return (
//     <div className="my-requests-root">
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
//         {/* Approval Tasks Header */}
//         <div className="my-requests-header">
//           <h1>Approval Tasks</h1>
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
//             <input
//               type="text"
//               placeholder="Search"
//               className="search-input"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
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
//                     className="view-button"
//                     onClick={() => handleViewRequest(request.id)}
//                   >
//                     <FaEye />
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
//         <Footer />
//       </main>
//     </div>
//   );
// };
//
// export default ApprovalTasks;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaSearch, FaEye, FaArrowLeft } from 'react-icons/fa';
import './MyRequests.css'; // Reusing styles

const ApprovalTasks = ({ onLogout }) => {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState([]);
  const [filteredApprovals, setFilteredApprovals] = useState([]);
  const [activeStatus, setActiveStatus] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/approvals/pending', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        setApprovals(data);
        setFilteredApprovals(data);
      } catch (error) {
        console.error('Failed to fetch pending approvals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovals();
  }, []);

  useEffect(() => {
    let filtered = approvals;

    if (activeStatus !== 'all') {
      filtered = approvals.filter(approval => approval.status?.toLowerCase() === activeStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(approval =>
          approval.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          approval.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredApprovals(filtered);
  }, [approvals, activeStatus, searchQuery]);

  const statuses = [
    { id: 'pending', label: 'Pending' },
    { id: 'approved', label: 'Approved' },
    { id: 'rejected', label: 'Rejected' },
    { id: 'all', label: 'All' }
  ];

  const handleViewRequest = (submissionId) => {
    navigate(`/approval-tasks/view/${submissionId}`);
  };

  if (loading) return <div>Loading approvals...</div>;

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
            <h1>Approval Tasks</h1>
          </div>

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
              <input
                  type="text"
                  placeholder="Search by title or submitter"
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="requests-table">
            <div className="table-header">
              <div className="header-cell details-cell">Title</div>
              <div className="header-cell">Type</div>
              <div className="header-cell">Submitted By</div>
              <div className="header-cell">Date Submitted</div>
              <div className="header-cell actions-cell">Actions</div>
            </div>

            <div className="table-body">
              {filteredApprovals.length > 0 ? (
                  filteredApprovals.map(approval => (
                      <div key={approval.submissionId} className="table-row">
                        <div className="table-cell details-cell">{approval.title}</div>
                        <div className="table-cell">{approval.activityType}</div>
                        <div className="table-cell">{approval.submittedBy}</div>
                        <div className="table-cell">{new Date(approval.submittedDate).toLocaleDateString()}</div>
                        <div className="table-cell actions-cell">
                          <button
                              className="view-button"
                              onClick={() => handleViewRequest(approval.submissionId)}
                          >
                            <FaEye />
                          </button>
                        </div>
                      </div>
                  ))
              ) : (
                  <div className="table-row">
                    <div className="table-cell" colSpan="5">No approvals found.</div>
                  </div>
              )}
            </div>
          </div>

          <Footer />
        </main>
      </div>
  );
};

export default ApprovalTasks;
