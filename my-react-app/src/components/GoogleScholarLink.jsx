import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft, FaLink, FaExternalLinkAlt } from 'react-icons/fa';
import './GoogleScholarLinking.css';
import './FormStyles.css';

const GoogleScholarLink = ({ onLogout }) => {
  const navigate = useNavigate();
  const [scholarUrl, setScholarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user already has linked account
  useEffect(() => {
    // In a real app, this would check with the backend if the user has already linked their account
    const hasLinkedAccount = localStorage.getItem('googleScholarLinked') === 'true';
    if (hasLinkedAccount) {
      // If already linked, redirect to the publications page
      navigate('/research/google-scholar/publications');
    }
  }, [navigate]);

  // Handle linking Google Scholar account
  const handleLinkScholar = (e) => {
    e.preventDefault();
    
    if (!scholarUrl.trim()) {
      alert('Please enter your Google Scholar Profile URL');
      return;
    }
    
    // Basic validation for Google Scholar URL
    if (!scholarUrl.includes('scholar.google.com')) {
      alert('Please enter a valid Google Scholar URL (e.g., https://scholar.google.com/citations?user=XXXX)');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to verify and link the account
    setTimeout(() => {
      console.log('Linking Google Scholar URL:', scholarUrl);
      
      // Store the linked status in localStorage (in a real app, this would be in your backend)
      localStorage.setItem('googleScholarLinked', 'true');
      localStorage.setItem('googleScholarUrl', scholarUrl);
      
      setIsLoading(false);
      
      // Show success message
      alert('Google Scholar account linked successfully!');
      
      // Redirect to the publications page
      navigate('/research/google-scholar/publications');
    }, 1500);
  };

  return (
    <div className="scholar-linking-root">
      <Sidebar onLogout={onLogout} />
      
      <main className="scholar-linking-main">
        <div className="scholar-linking-header">
          <button 
            className="back-button"
            onClick={() => navigate('/research')}
          >
            <FaArrowLeft /> Back to Research Activities
          </button>
          <h1>Link Google Scholar Account</h1>
        </div>
        
        <div className="scholar-linking-container">
          <div className="scholar-link-section">
            <h2>Connect Your Google Scholar Account</h2>
            <p className="info-text" style={{ textAlign: 'justify' }}>
              Linking your Google Scholar account allows you to easily import your research publications 
              into the system. Your publications will be automatically fetched and you can select which 
              ones to add to your profile.
            </p>
            
            <form onSubmit={handleLinkScholar} className="scholar-link-form">
              <div className="form-group">
                <label htmlFor="scholarUrl">Google Scholar Profile URL</label>
                <input
                  type="text"
                  id="scholarUrl"
                  value={scholarUrl}
                  onChange={(e) => setScholarUrl(e.target.value)}
                  placeholder="https://scholar.google.com/citations?user=XXXX"
                  className="form-control"
                  required
                  disabled={isLoading}
                />
                <small className="form-text">
                  Enter the full URL of your Google Scholar profile page.
                </small>
              </div>
              
              <div className="form-actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', width: '100%', gap: '1rem' }}>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => navigate('/research')}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-button google-scholar-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Linking...' : (
                    <>
                      <FaLink /> Link Google Scholar Account
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <div className="info-sections-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <div className="scholar-benefits" style={{ flex: '1', marginRight: '1rem', textAlign: 'left' }}>
                <h3>Benefits of Linking Your Google Scholar Account</h3>
                <ul className="benefits-list" style={{ textAlign: 'left', paddingLeft: '1.5rem' }}>
                  <li>Automatically import your research publications</li>
                  <li>Keep your research profile up-to-date</li>
                  <li>Save time by avoiding manual entry of publication details</li>
                  <li>Ensure accuracy of publication information</li>
                </ul>
              </div>
              
              <div className="scholar-help" style={{ flex: '1', marginLeft: '1rem', textAlign: 'left' }}>
                <h3>How to Link Your Google Scholar Account</h3>
                <ol className="help-list" style={{textAlign: 'left', paddingLeft: '1.5rem'}}>
                  <li>Go to <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer">Google Scholar <FaExternalLinkAlt size={12} /></a></li>
                  <li>Sign in to your account</li>
                  <li>Click on "My Profile"</li>
                  <li>Copy the entire URL from your browser's address bar</li>
                  <li>Paste the complete URL in the form above</li>
                  <li>Click "Link Google Scholar Account" to connect</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default GoogleScholarLink;
