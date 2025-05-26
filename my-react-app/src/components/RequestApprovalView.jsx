import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft, FaCheck, FaTimes, FaFilePdf } from 'react-icons/fa';
import './FormStyles.css';
import './RequestApprovalView.css';

const RequestApprovalView = ({ onLogout }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    // In a real app, this would fetch the request details from an API
    // For demo purposes, we'll use mock data
    const mockRequest = {
      id: parseInt(id),
      title: 'Machine Learning Applications in Healthcare',
      authors: 'K. J. Arellano, J. Smith',
      publicationType: 'Journal Article',
      journal: 'Journal of Medical Informatics',
      datePublished: '2025-04-15',
      abstract: 'This paper explores the applications of machine learning in healthcare, focusing on diagnosis and treatment planning. We present a novel approach that combines deep learning with traditional statistical methods to improve accuracy and interpretability.',
      keywords: 'machine learning, healthcare, deep learning, diagnosis',
      doi: '10.1234/jmi.2025.12345',
      submittedBy: 'Kristine Joy Arellano',
      submittedDate: '2025-05-20',
      status: 'pending',
      supportingDocument: 'ml_healthcare_paper.pdf',
      sdg: ['SDG 3: Good Health and Well-being', 'SDG 9: Industry, Innovation and Infrastructure']
    };

    // Simulate API call
    setTimeout(() => {
      setRequest(mockRequest);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleApprove = () => {
    // In a real app, this would send an API request to approve the request
    console.log('Approving request:', id);
    
    // Show success message
    alert('Request approved successfully!');
    
    // Navigate back to the approval tasks page
    navigate('/approval-tasks');
  };

  const handleReject = () => {
    setShowRejectForm(true);
  };

  const submitRejection = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }

    // In a real app, this would send an API request to reject the request
    console.log('Rejecting request:', id);
    console.log('Rejection reason:', rejectionReason);
    
    // Show success message
    alert('Request rejected successfully!');
    
    // Navigate back to the approval tasks page
    navigate('/approval-tasks');
  };

  const cancelRejection = () => {
    setShowRejectForm(false);
    setRejectionReason('');
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

  return (
    <div className="approval-view-root">
      <Sidebar onLogout={onLogout} />
      
      <main className="approval-view-main">
        <div className="approval-view-header">
          <button 
            className="back-button"
            onClick={() => navigate('/approval-tasks')}
          >
            <FaArrowLeft /> Back to Approval Tasks
          </button>
          <h1>Request Details</h1>
        </div>
        
        <div className="approval-view-container">
          <div className="request-details">
            <div className="request-header">
              <h2>{request.title}</h2>
              <div className="request-meta">
                <span className="status-badge pending">Pending Approval</span>
                <span className="submission-info">
                  Submitted by {request.submittedBy} on {new Date(request.submittedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="details-section">
              <div className="form-like-field">
                <label htmlFor="authors">Authors</label>
                <div id="authors" className="field-value">{request.authors}</div>
              </div>
              
              <div className="form-like-field">
                <label htmlFor="publicationType">Publication Type</label>
                <div id="publicationType" className="field-value">{request.publicationType}</div>
              </div>
              
              <div className="form-like-field">
                <label htmlFor="journal">Journal</label>
                <div id="journal" className="field-value">{request.journal}</div>
              </div>
              
              <div className="form-like-field">
                <label htmlFor="datePublished">Date Published</label>
                <div id="datePublished" className="field-value">{new Date(request.datePublished).toLocaleDateString()}</div>
              </div>
              
              <div className="form-like-field">
                <label htmlFor="abstract">Abstract</label>
                <div id="abstract" className="field-value multi-line">{request.abstract}</div>
              </div>
              
              <div className="form-like-field">
                <label htmlFor="keywords">Keywords</label>
                <div id="keywords" className="field-value">{request.keywords}</div>
              </div>
              
              <div className="form-like-field">
                <label htmlFor="doi">DOI</label>
                <div id="doi" className="field-value">{request.doi}</div>
              </div>
              
              <div className="form-like-field">
                <label htmlFor="supportingDocument">Supporting Document</label>
                <div id="supportingDocument" className="field-value">
                  <a href="#" className="document-link">
                    <FaFilePdf style={{ marginRight: '8px' }} />
                    {request.supportingDocument}
                  </a>
                </div>
              </div>
              
              <div className="form-like-field">
                <label htmlFor="sdg">SDG</label>
                <div id="sdg" className="field-value">
                  <ul className="sdg-list">
                    {request.sdg.map((sdg, index) => (
                      <li key={index}>{sdg}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {!showRejectForm ? (
              <div className="approval-actions">
                <button 
                  className="approve-button"
                  onClick={handleApprove}
                >
                  <FaCheck /> Approve Request
                </button>
                <button 
                  className="reject-button"
                  onClick={handleReject}
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
                  required
                />
                <div className="rejection-buttons">
                  <button 
                    className="cancel-button"
                    onClick={cancelRejection}
                  >
                    Cancel
                  </button>
                  <button 
                    className="confirm-rejection-button"
                    onClick={submitRejection}
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
