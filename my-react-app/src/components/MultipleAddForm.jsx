import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft, FaPlus, FaTimes, FaDownload, FaUpload } from 'react-icons/fa';
import './MultipleAddForm.css';
import './FormStyles.css';

const MultipleAddForm = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [entries, setEntries] = useState([]);
  const [showExcelUpload, setShowExcelUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  
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

  // This function is no longer needed as we're only using Excel upload
  // Kept as a placeholder in case we need to restore this functionality later
  const handleAddEntry = () => {
    alert('Please use the Excel upload functionality to add multiple entries.');
  };

  // Handle removing an entry
  const handleRemoveEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  // Handle CSV template download
  const handleDownloadCSV = () => {
    // In a real application, this would generate and download a CSV template
    console.log('Downloading CSV template for research publications');
    alert('CSV template for research publications would be downloaded here');
    
    // This would typically trigger a download of a pre-formatted CSV template
    // with columns for Title, Authors, Date Published, Journal, etc.
  };
  
  // Handle CSV file upload
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      console.log('CSV file uploaded:', file.name);
      
      // In a real application, this would parse the CSV file
      // and extract the publication data to create entries
      
      // For demo purposes, let's simulate adding entries from the CSV file
      const mockEntriesFromCSV = [
        {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          category: 'research',
          subCategory: 'publications',
          title: 'Publication from Excel 1',
          authors: 'Author A, Author B',
          datePublished: '2025-01-15',
          journal: 'Journal of Science',
          type: 'Journal Article'
        },
        {
          id: Date.now() + 1,
          timestamp: new Date().toISOString(),
          category: 'research',
          subCategory: 'publications',
          title: 'Publication from Excel 2',
          authors: 'Author C, Author D',
          datePublished: '2025-02-20',
          journal: 'Nature',
          type: 'Journal Article'
        }
      ];
      
      // Add the mock entries to the existing entries
      setEntries(prevEntries => {
        const newEntries = [...prevEntries, ...mockEntriesFromCSV];
        // Update sessionStorage with the new entries
        sessionStorage.setItem('multipleAddFormState', JSON.stringify({
          entries: newEntries
        }));
        return newEntries;
      });
      
      // Reset the file input
      e.target.value = null;
      setUploadedFile(null);
      
      // Show success message
      alert(`Successfully imported ${mockEntriesFromCSV.length} publications from CSV file.\n\nNote: SDG and Supporting Document fields are not included in the CSV import. You'll need to edit each publication individually to add these fields.`);
    }
  };
  
  // Toggle Excel upload section
  const toggleExcelUpload = () => {
    setShowExcelUpload(!showExcelUpload);
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
            {/* Top section with instructions and buttons */}
            <div className="top-section">
              {/* Instructions on the left */}
              <div className="instructions">
                <h2>Multiple Requests</h2>
                <p>Add multiple requests and submit them all at once. You can upload a CSV file with your entries or add them individually.</p>
                <p className="info-text">
                  The CSV upload method does not support adding SDG and Supporting Document fields. 
                  If you'd like to add these, you'll have to edit the corresponding entry 
                  individually by clicking the EDIT button after submission.
                </p>
              </div>
              
              {/* Action buttons on the right */}
              <div className="action-buttons">
                <button 
                  type="button" 
                  className="download-csv-btn" 
                  onClick={handleDownloadCSV}
                >
                  <FaDownload /> Download CSV Template
                </button>
                
                <div className="upload-container">
                  <label className="upload-label" htmlFor="csv-upload">
                    <FaUpload /> Upload CSV
                  </label>
                  <input
                    type="file"
                    id="csv-upload"
                    className="csv-upload"
                    accept=".csv"
                    onChange={handleCSVUpload}
                  />
                </div>
              </div>
            </div>
            
            {/* Table of entries */}
            <div className="entries-list">
              <div className="entries-table">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Submission Type</th>
                      <th>Edit</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.length > 0 ? (
                      entries.map((entry, index) => (
                        <tr key={index} className="entry-item">
                          <td>{entry.title || `Request ${index + 1}`}</td>
                          <td>{entry.datePublished || new Date().toLocaleDateString()}</td>
                          <td>{entry.requestType || entry.subCategory || 'Request'}</td>
                          <td>
                            <button
                              type="button"
                              className="edit-entry-button"
                              onClick={() => navigate(`/edit-excel-entry/${entry.id || index}`)}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="remove-entry-button"
                              onClick={() => handleRemoveEntry(index)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-entries-message">
                          No entries added yet. Upload an Excel file to add entries.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* The manual entry option has been removed */}
            
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
