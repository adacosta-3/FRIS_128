import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft, FaPlus, FaTimes } from 'react-icons/fa';
import './MultipleAddForm.css';
import './FormStyles.css';

const MultipleAddForm = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [entries, setEntries] = useState([]);
  
  // Parse query parameters and restore state if returning from add entry
  useEffect(() => {
    // First, try to load any saved entries from sessionStorage
    const savedState = JSON.parse(sessionStorage.getItem('multipleAddFormState') || '{}');
    if (savedState.entries && savedState.entries.length > 0) {
      console.log('Restoring saved entries from sessionStorage:', savedState.entries);
      setEntries(savedState.entries);
    }
    
    // Then check if we're returning from add entry form with new entry data
    const params = new URLSearchParams(location.search);
    const returnedEntry = params.get('entryData');
    
    if (returnedEntry) {
      try {
        console.log('Received new entry data from AddEntryForm');
        const entryData = JSON.parse(decodeURIComponent(returnedEntry));
        
        // Add the new entry to the existing entries
        setEntries(prevEntries => {
          const newEntries = [...prevEntries, entryData];
          // Update sessionStorage with the new entries
          sessionStorage.setItem('multipleAddFormState', JSON.stringify({
            entries: newEntries
          }));
          return newEntries;
        });
      } catch (error) {
        console.error('Error parsing returned entry data:', error);
      }
      
      // Clear URL parameters after processing to prevent duplicate entries on refresh
      navigate('/multiple-add', { replace: true });
    }
  }, [location, navigate]);

  // Handle adding a new entry - navigate to the dedicated multiple entry form
  const handleAddEntry = () => {
    // Store current entries in sessionStorage before navigating
    sessionStorage.setItem('multipleAddFormState', JSON.stringify({
      entries
    }));
    console.log('Navigating to Add Single Entry to Multiple form');
    // Navigate to the dedicated multiple entry form
    // This starts the flow: choose classification > sub-classification > enter details > submit
    // Use navigate() instead of window.location.href to ensure proper routing
    navigate('/multiple-add-entry');
  };

  // Handle removing an entry
  const handleRemoveEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  // Handle form submission - this is the final submission of all entries
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Multiple entries submitted:', entries);
    
    // Process all entries here (in a real app, you would send them to your backend)
    alert(`Submitting ${entries.length} entries to the server!`);
    
    // Clear session storage after submission
    sessionStorage.removeItem('multipleAddFormState');
    
    // Determine the appropriate destination based on the category of the first entry
    // This ensures we go back to the correct activity page
    if (entries.length > 0) {
      const category = entries[0].category;
      switch(category) {
        case 'research':
          navigate('/research');
          break;
        case 'teaching':
          navigate('/teaching');
          break;
        case 'service':
          navigate('/public');
          break;
        case 'request':
          navigate('/requests');
          break;
        default:
          // If we can't determine the category, go to home
          navigate('/home');
      }
    } else {
      // If there are no entries (shouldn't happen due to disabled submit button)
      navigate('/home');
    }
  };

  return (
    <div className="multiple-add-root">
      <Sidebar onLogout={onLogout} />
      
      <main className="multiple-add-main">
        <div className="multiple-add-header">
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Back
          </button>
          <h1>Add Multiple Requests</h1>
        </div>
        
        <div className="multiple-add-form-container">
          <form onSubmit={handleSubmit} className="multiple-add-form">
            <div className="multiple-requests-header">
              <h2>Multiple Requests</h2>
              <p>Add multiple requests and submit them all at once.</p>
            </div>
            
            {/* Display entries list (even when empty) */}
            {entries.length > 0 ? (
              <div className="entries-list">
                <h3>Added Entries ({entries.length})</h3>
                <div className="entries-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Entry Type</th>
                        <th>Details</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry, index) => (
                        <tr key={index} className="entry-item">
                          <td>{entry.requestType || 'Request'}</td>
                          <td>
                            <strong>{entry.title || `Request ${index + 1}`}</strong>
                            {entry.description && <p>{entry.description.substring(0, 100)}{entry.description.length > 100 ? '...' : ''}</p>}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="remove-entry-button"
                              onClick={() => handleRemoveEntry(index)}
                            >
                              <FaTimes /> Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="no-entries-message">
                <p>No entries added yet. Click "Add Entry" to start adding entries.</p>
              </div>
            )}
            
            {/* Always show Add Entry button and Submit buttons */}
            <div className="add-entry-actions">
              <button
                type="button"
                className="add-entry-button"
                onClick={handleAddEntry}
              >
                <FaPlus /> Add Entry
              </button>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={entries.length === 0}
              >
                Submit All Entries and Return
              </button>
            </div>
          </form>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default MultipleAddForm;
