// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Footer from './Footer';
// import { FaArrowLeft, FaCheck, FaTimes, FaFilePdf } from 'react-icons/fa';
// import './FormStyles.css';
// import './RequestApprovalView.css';
//
// const RequestApprovalView = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [request, setRequest] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showRejectForm, setShowRejectForm] = useState(false);
//   const [rejectionReason, setRejectionReason] = useState('');
//
//   useEffect(() => {
//     // In a real app, this would fetch the request details from an API
//     // For demo purposes, we'll use mock data
//     const mockRequest = {
//       id: parseInt(id),
//       title: 'Machine Learning Applications in Healthcare',
//       authors: 'K. J. Arellano, J. Smith',
//       publicationType: 'Journal Article',
//       journal: 'Journal of Medical Informatics',
//       datePublished: '2025-04-15',
//       abstract: 'This paper explores the applications of machine learning in healthcare, focusing on diagnosis and treatment planning. We present a novel approach that combines deep learning with traditional statistical methods to improve accuracy and interpretability.',
//       keywords: 'machine learning, healthcare, deep learning, diagnosis',
//       doi: '10.1234/jmi.2025.12345',
//       submittedBy: 'Kristine Joy Arellano',
//       submittedDate: '2025-05-20',
//       status: 'pending',
//       supportingDocument: 'ml_healthcare_paper.pdf',
//       sdg: ['SDG 3: Good Health and Well-being', 'SDG 9: Industry, Innovation and Infrastructure']
//     };
//
//     // Simulate API call
//     setTimeout(() => {
//       setRequest(mockRequest);
//       setLoading(false);
//     }, 500);
//   }, [id]);
//
//   const handleApprove = () => {
//     // In a real app, this would send an API request to approve the request
//     console.log('Approving request:', id);
//
//     // Show success message
//     alert('Request approved successfully!');
//
//     // Navigate back to the approval tasks page
//     navigate('/approval-tasks');
//   };
//
//   const handleReject = () => {
//     setShowRejectForm(true);
//   };
//
//   const submitRejection = () => {
//     if (!rejectionReason.trim()) {
//       alert('Please provide a reason for rejection.');
//       return;
//     }
//
//     // In a real app, this would send an API request to reject the request
//     console.log('Rejecting request:', id);
//     console.log('Rejection reason:', rejectionReason);
//
//     // Show success message
//     alert('Request rejected successfully!');
//
//     // Navigate back to the approval tasks page
//     navigate('/approval-tasks');
//   };
//
//   const cancelRejection = () => {
//     setShowRejectForm(false);
//     setRejectionReason('');
//   };
//
//   if (loading) {
//     return (
//       <div className="approval-view-root">
//         <Sidebar onLogout={onLogout} />
//         <main className="approval-view-main">
//           <div className="loading">Loading request details...</div>
//         </main>
//       </div>
//     );
//   }
//
//   return (
//     <div className="approval-view-root">
//       <Sidebar onLogout={onLogout} />
//
//       <main className="approval-view-main">
//         <div className="approval-view-header">
//           <button
//             className="back-button"
//             onClick={() => navigate('/approval-tasks')}
//           >
//             <FaArrowLeft /> Back to Approval Tasks
//           </button>
//           <h1>Request Details</h1>
//         </div>
//
//         <div className="approval-view-container">
//           <div className="request-details">
//             <div className="request-header">
//               <h2>{request.title}</h2>
//               <div className="request-meta">
//                 <span className="status-badge pending">Pending Approval</span>
//                 <span className="submission-info">
//                   Submitted by {request.submittedBy} on {new Date(request.submittedDate).toLocaleDateString()}
//                 </span>
//               </div>
//             </div>
//
//             <div className="details-section">
//               <div className="form-like-field">
//                 <label htmlFor="authors">Authors</label>
//                 <div id="authors" className="field-value">{request.authors}</div>
//               </div>
//
//               <div className="form-like-field">
//                 <label htmlFor="publicationType">Publication Type</label>
//                 <div id="publicationType" className="field-value">{request.publicationType}</div>
//               </div>
//
//               <div className="form-like-field">
//                 <label htmlFor="journal">Journal</label>
//                 <div id="journal" className="field-value">{request.journal}</div>
//               </div>
//
//               <div className="form-like-field">
//                 <label htmlFor="datePublished">Date Published</label>
//                 <div id="datePublished" className="field-value">{new Date(request.datePublished).toLocaleDateString()}</div>
//               </div>
//
//               <div className="form-like-field">
//                 <label htmlFor="abstract">Abstract</label>
//                 <div id="abstract" className="field-value multi-line">{request.abstract}</div>
//               </div>
//
//               <div className="form-like-field">
//                 <label htmlFor="keywords">Keywords</label>
//                 <div id="keywords" className="field-value">{request.keywords}</div>
//               </div>
//
//               <div className="form-like-field">
//                 <label htmlFor="doi">DOI</label>
//                 <div id="doi" className="field-value">{request.doi}</div>
//               </div>
//
//               <div className="form-like-field">
//                 <label htmlFor="supportingDocument">Supporting Document</label>
//                 <div id="supportingDocument" className="field-value">
//                   <a href="#" className="document-link">
//                     <FaFilePdf style={{ marginRight: '8px' }} />
//                     {request.supportingDocument}
//                   </a>
//                 </div>
//               </div>
//
//               <div className="form-like-field">
//                 <label htmlFor="sdg">SDG</label>
//                 <div id="sdg" className="field-value">
//                   <ul className="sdg-list">
//                     {request.sdg.map((sdg, index) => (
//                       <li key={index}>{sdg}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//
//             {!showRejectForm ? (
//               <div className="approval-actions">
//                 <button
//                   className="approve-button"
//                   onClick={handleApprove}
//                 >
//                   <FaCheck /> Approve Request
//                 </button>
//                 <button
//                   className="reject-button"
//                   onClick={handleReject}
//                 >
//                   <FaTimes /> Reject Request
//                 </button>
//               </div>
//             ) : (
//               <div className="rejection-form">
//                 <h3>Rejection Reason</h3>
//                 <p className="rejection-info">
//                   Please provide a reason for rejecting this request. This will be sent to the submitter.
//                 </p>
//                 <textarea
//                   className="rejection-reason"
//                   placeholder="Enter reason for rejection..."
//                   value={rejectionReason}
//                   onChange={(e) => setRejectionReason(e.target.value)}
//                   rows={6}
//                   required
//                 />
//                 <div className="rejection-buttons">
//                   <button
//                     className="cancel-button"
//                     onClick={cancelRejection}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="confirm-rejection-button"
//                     onClick={submitRejection}
//                   >
//                     Confirm Rejection
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//
//         <Footer />
//       </main>
//     </div>
//   );
// };
//
// export default RequestApprovalView;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft, FaCheck, FaTimes, FaFilePdf, FaEdit, FaSave } from 'react-icons/fa';
import './FormStyles.css';
import './RequestApprovalView.css';

const RequestApprovalView = ({ onLogout }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // submissionId
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedRequest, setEditedRequest] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/approvals/pending/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        setRequest(data);
      } catch (err) {
        setError('Failed to load request details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id, token]);

  const submitDecision = async (decision) => {
    setError('');
    if (decision === 'Rejected' && !rejectionReason.trim()) {
      setError('Please provide a reason for rejection.');
      return;
    }

    try {
      const body = {
        submissionId: parseInt(id),
        decision: decision,
        remarks: rejectionReason.trim()
      };

      const response = await fetch('http://localhost:8080/api/approval-decisions/action', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }

      alert(`Request ${decision.toLowerCase()} successfully!`);
      navigate('/approval-tasks');
    } catch (err) {
      setError('Failed to submit decision: ' + err.message);
    }
  };

  if (loading) {
    return (
        <div className="approval-view-root">
          <Sidebar onLogout={onLogout} />
          <main className="approval-view-main">
            <div className="loading">Loading request details...</div>
          </main>
        </div>
    );
  }

  if (error) {
    return (
        <div className="approval-view-root">
          <Sidebar onLogout={onLogout} />
          <main className="approval-view-main">
            <div className="error-message">{error}</div>
            <button onClick={() => navigate('/approval-tasks')}>Back to Approval Tasks</button>
          </main>
        </div>
    );
  }

  if (!request) {
    return (
        <div className="approval-view-root">
          <Sidebar onLogout={onLogout} />
          <main className="approval-view-main">
            <div>No request found.</div>
            <button onClick={() => navigate('/approval-tasks')}>Back to Approval Tasks</button>
          </main>
        </div>
    );
  }

  return (
      <div className="approval-view-root">
        <Sidebar onLogout={onLogout} />

        <main className="approval-view-main">
          <div className="approval-view-header">
            <button className="back-button" onClick={() => navigate('/approval-tasks')}>
              <FaArrowLeft /> Back to Approval Tasks
            </button>
            <h1>Request Details</h1>
          </div>

          <div className="approval-view-container">
            <div className="request-details">
              <div className="request-header">
                <h2>{request.title}</h2>
                <div className="request-meta">
                <span className={`status-badge ${request.status.toLowerCase()}`}>
                  {request.status}
                </span>
                  <span className="submission-info">
                  Submitted by {request.submittedBy} on {new Date(request.submittedDate).toLocaleDateString()}
                </span>
                </div>
              </div>

              {/* Details Section */}
              <div className="details-section">
                <div className="form-like-field">
                  <label>Authors</label>
                  <div className="field-value">{request.authors}</div>
                </div>

                <div className="form-like-field">
                  <label>Publication Type</label>
                  <div className="field-value">{request.publicationType}</div>
                </div>

                <div className="form-like-field">
                  <label>Journal</label>
                  <div className="field-value">{request.journal || 'N/A'}</div>
                </div>

                <div className="form-like-field">
                  <label>Date Published</label>
                  <div className="field-value">
                    {request.datePublished ? new Date(request.datePublished).toLocaleDateString() : 'N/A'}
                  </div>
                </div>

                <div className="form-like-field">
                  <label>Abstract</label>
                  <div className="field-value multi-line">{request.abstract || 'N/A'}</div>
                </div>

                <div className="form-like-field">
                  <label>Keywords</label>
                  <div className="field-value">{request.keywords || 'N/A'}</div>
                </div>

                <div className="form-like-field">
                  <label>DOI</label>
                  <div className="field-value">{request.doi || 'N/A'}</div>
                </div>

                <div className="form-like-field">
                  <label>Supporting Document</label>
                  <div className="field-value">
                    {request.supportingDocument ? (
                        <a href={`/uploads/${request.supportingDocument}`} target="_blank" rel="noopener noreferrer" className="document-link">
                          <FaFilePdf style={{ marginRight: '8px' }} />
                          {request.supportingDocument}
                        </a>
                    ) : 'N/A'}
                  </div>
                </div>

                <div className="form-like-field">
                  <label>SDGs</label>
                  <div className="field-value">
                    {request.sdg && request.sdg.length > 0 ? (
                        <ul className="sdg-list">
                          {request.sdg.map((sdgItem, index) => (
                              <li key={index}>{sdgItem}</li>
                          ))}
                        </ul>
                    ) : (
                        'N/A'
                    )}
                  </div>
                </div>
              </div>

              {!showRejectForm ? (
                  <div className="approval-actions">
                    <button
                        className="approve-button"
                        onClick={() => submitDecision('Approved')}
                    >
                      <FaCheck /> Approve Request
                    </button>
                    <button
                        className="reject-button"
                        onClick={() => setShowRejectForm(true)}
                    >
                      <FaTimes /> Reject Request
                    </button>
                  </div>
              ) : (
                  <div className="rejection-form">
                    <h3>Rejection Reason</h3>
                    <p className="rejection-info">
                      Please provide a reason for rejecting this request. This will be sent to the submitter.
                    </p>
                    <textarea
                        className="rejection-reason"
                        placeholder="Enter reason for rejection..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        rows={6}
                    />
                    <div className="rejection-buttons">
                      <button
                          className="cancel-button"
                          onClick={() => {
                            setShowRejectForm(false);
                            setRejectionReason('');
                          }}
                      >
                        Cancel
                      </button>
                      <button
                          className="confirm-rejection-button"
                          onClick={() => submitDecision('Rejected')}
                      >
                        Confirm Rejection
                      </button>
                    </div>
                  </div>
              )}
            </div>
          </div>

          <Footer />
        </main>
      </div>
  );
};

export default RequestApprovalView;
