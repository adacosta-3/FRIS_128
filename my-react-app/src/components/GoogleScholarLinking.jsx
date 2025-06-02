import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft, FaPlus, FaSearch, FaLink, FaExternalLinkAlt } from 'react-icons/fa';
import './GoogleScholarLinking.css';
import './FormStyles.css';

const GoogleScholarLinking = ({ onLogout }) => {
  const navigate = useNavigate();
  const [scholarId, setScholarId] = useState('');
  const [scholarPublications, setScholarPublications] = useState([]);
  const [systemPublications, setSystemPublications] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [formData, setFormData] = useState({
    citedAs: '',
    doi: '',
    publicationType: '',
    supportingDocument: null,
    sdg: ''
  });

  // SDG options based on the 17 Sustainable Development Goals
  const sdgOptions = [
    { value: 'SDG 1', label: 'SDG 1: No Poverty' },
    { value: 'SDG 2', label: 'SDG 2: Zero Hunger' },
    { value: 'SDG 3', label: 'SDG 3: Good Health and Well-being' },
    { value: 'SDG 4', label: 'SDG 4: Quality Education' },
    { value: 'SDG 5', label: 'SDG 5: Gender Equality' },
    { value: 'SDG 6', label: 'SDG 6: Clean Water and Sanitation' },
    { value: 'SDG 7', label: 'SDG 7: Affordable and Clean Energy' },
    { value: 'SDG 8', label: 'SDG 8: Decent Work and Economic Growth' },
    { value: 'SDG 9', label: 'SDG 9: Industry, Innovation and Infrastructure' },
    { value: 'SDG 10', label: 'SDG 10: Reduced Inequality' },
    { value: 'SDG 11', label: 'SDG 11: Sustainable Cities and Communities' },
    { value: 'SDG 12', label: 'SDG 12: Responsible Consumption and Production' },
    { value: 'SDG 13', label: 'SDG 13: Climate Action' },
    { value: 'SDG 14', label: 'SDG 14: Life Below Water' },
    { value: 'SDG 15', label: 'SDG 15: Life on Land' },
    { value: 'SDG 16', label: 'SDG 16: Peace, Justice and Strong Institutions' },
    { value: 'SDG 17', label: 'SDG 17: Partnerships for the Goals' }
  ];

  // Publication types
  const publicationTypes = [
    "Journal Article",
    "Conference Paper",
    "Book Chapter",
    "Book",
    "Thesis",
    "Patent",
    "Technical Report",
    "Preprint",
    "Other"
  ];

  // Check if user has linked their Google Scholar account
  useEffect(() => {
    const hasLinkedAccount = localStorage.getItem('googleScholarLinked') === 'true';
    if (!hasLinkedAccount) {
      // If not linked, redirect to the link page
      navigate('/research/google-scholar');
      return;
    }

    // Get the scholar URL
    const storedScholarUrl = localStorage.getItem('googleScholarUrl');
    if (storedScholarUrl) {
      setScholarId(storedScholarUrl);
    }

    // Fetch publications
    fetchPublications();
  }, [navigate]);

  const fetchPublications = () => {
    // In a real app, this would be an API call to fetch publications from Google Scholar
    // For this example, we'll use mock data
    const mockPublications = [
      {
        id: 1,
        title: "Machine Learning Applications in Healthcare",
        authors: "John Doe, Jane Smith, Robert Johnson",
        year: "2024",
        journal: "Journal of Medical Informatics",
        citations: 45,
        isInSystem: false
      },
      {
        id: 2,
        title: "Deep Learning for Natural Language Processing",
        authors: "Jane Smith, John Doe",
        year: "2023",
        journal: "Computational Linguistics Journal",
        citations: 32,
        isInSystem: false
      },
      {
        id: 3,
        title: "Artificial Intelligence in Education",
        authors: "Robert Johnson, John Doe",
        year: "2023",
        journal: "Educational Technology Research",
        citations: 18,
        isInSystem: true
      },
      {
        id: 4,
        title: "Blockchain Technology for Secure Healthcare Data",
        authors: "John Doe, Maria Garcia",
        year: "2022",
        journal: "Journal of Cybersecurity",
        citations: 27,
        isInSystem: false
      },
      {
        id: 5,
        title: "Neural Networks for Image Recognition",
        authors: "Jane Smith, John Doe, Robert Johnson",
        year: "2022",
        journal: "Computer Vision Journal",
        citations: 56,
        isInSystem: true
      }
    ];

    // Separate publications that are already in the system
    const inSystem = mockPublications.filter(pub => pub.isInSystem);
    const notInSystem = mockPublications.filter(pub => !pub.isInSystem);

    setScholarPublications(notInSystem);
    setSystemPublications(inSystem);
  };

  // Handle unlinking Google Scholar account
  const handleUnlinkScholar = () => {
    if (window.confirm('Are you sure you want to unlink your Google Scholar account?')) {
      // Remove the linked status from localStorage
      localStorage.removeItem('googleScholarLinked');
      localStorage.removeItem('googleScholarUrl');

      // Redirect to the link page
      navigate('/research/google-scholar');
    }
  };

  // Handle selecting a publication to add
  const handleSelectPublication = (publication) => {
    setSelectedPublication(publication);
    setShowAddModal(true);

    // Reset form data for the new publication
    setFormData({
      citedAs: '',
      doi: '',
      publicationType: '',
      supportingDocument: null,
      sdg: ''
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle adding the publication to the system
  const handleAddPublication = (e) => {
    e.preventDefault();

    if (!selectedPublication) return;

    // Combine publication data with form data
    const newPublication = {
      ...selectedPublication,
      citedAs: formData.citedAs,
      doi: formData.doi,
      publicationType: formData.publicationType,
      supportingDocument: formData.supportingDocument ? true : false,
      sdg: formData.sdg,
      dateAdded: new Date().toISOString()
    };

    console.log('Adding publication to system:', newPublication);

    // In a real app, this would send the data to your backend

    // Update the lists
    const updatedScholarPublications = scholarPublications.filter(
      pub => pub.id !== selectedPublication.id
    );

    setScholarPublications(updatedScholarPublications);
    setSystemPublications([...systemPublications, {...newPublication, isInSystem: true}]);

    // Close the modal
    setShowAddModal(false);
    setSelectedPublication(null);

    // Show success message
    alert('Publication added successfully!');
  };

  return (
    <div className="scholar-linking-root">
      <Sidebar onLogout={onLogout} />

      <main className="scholar-linking-main" style={{ paddingBottom: '120px' }}>
        <div className="scholar-linking-header">
          <button
            className="back-button"
            onClick={() => navigate('/research')}
          >
            <FaArrowLeft /> Back to Research Activities
          </button>
          <h1>Google Scholar Publications</h1>
        </div>

        <div className="scholar-linking-container">
          <div className="scholar-publications-section">
            <div className="scholar-header">
              <h2>Your Google Scholar Publications</h2>
              <div className="scholar-actions">
                <button
                  className="refresh-button"
                  onClick={() => {
                    // In a real app, this would refresh the publications from Google Scholar
                    alert('Publications refreshed from Google Scholar');
                  }}
                >
                  <FaSearch /> Refresh Publications
                </button>
                <button
                  className="unlink-button"
                  onClick={handleUnlinkScholar}
                >
                  Unlink Account
                </button>
              </div>
            </div>

            <div className="publications-container">
              <div className="available-publications">
                <h3>Available Research ({scholarPublications.length})</h3>
                {scholarPublications.length > 0 ? (
                  <div className="publications-list">
                    {scholarPublications.map(publication => (
                      <div key={publication.id} className="publication-item">
                        <div className="publication-details">
                          <h4>{publication.title}</h4>
                          <p className="authors">{publication.authors}</p>
                          <p className="journal">
                            <span className="journal-name">{publication.journal}</span>
                            <span className="publication-year">{publication.year}</span>
                          </p>
                          <p className="citations">Citations: {publication.citations}</p>
                        </div>
                        <button
                          className="add-publication-button"
                          onClick={() => handleSelectPublication(publication)}
                        >
                          <FaPlus /> Add
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-publications">
                    No available publications found. All your Google Scholar publications have been added to the system.
                  </p>
                )}
              </div>

              <div className="system-publications">
                <h3>Already Added ({systemPublications.length})</h3>
                {systemPublications.length > 0 ? (
                  <div className="publications-list">
                    {systemPublications.map(publication => (
                      <div key={publication.id} className="publication-item system-item">
                        <div className="publication-details">
                          <h4>{publication.title}</h4>
                          <p className="authors">{publication.authors}</p>
                          <p className="journal">
                            <span className="journal-name">{publication.journal}</span>
                            <span className="publication-year">{publication.year}</span>
                          </p>
                        </div>
                        <button
                          className="view-publication-button"
                          onClick={() => {
                            // In a real app, this would navigate to the publication details page
                            alert(`Viewing details for: ${publication.title}`);
                          }}
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="publications-list empty-state">
                    <p className="no-publications">
                      No publications have been added to the system yet.
                    </p>
                    <p className="instructions">
                      Use the "Add" button next to available publications to add them to your profile.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="scholar-info">
              <h3>How to Add Publications</h3>
              <ol className="instructions-list">
                <li>Click the <strong>[+] Add</strong> button beside the research title you want to add.</li>
                <li>Review the pre-filled information in the modal that appears:
                  <ul className="sub-instructions">
                    <li>Title</li>
                    <li>Author/s</li>
                    <li>Date Published</li>
                    <li>Journal</li>
                  </ul>
                </li>
                <li>Fill in additional fields (optional):
                  <ul className="sub-instructions">
                    <li>Cited As</li>
                    <li>DOI</li>
                    <li>Publication Type</li>
                    <li>Supporting Document</li>
                    <li>SDG</li>
                  </ul>
                </li>
                <li>Click <strong>Add Publication</strong> to save it to the system.</li>
              </ol>
              <p className="note">
                Research titles that are already in the system will appear in the "Already Added" section.
              </p>
            </div>
          </div>
        </div>

        {/* Add Publication Modal */}
        {showAddModal && selectedPublication && (
          <div className="modal-overlay">
            <div className="add-publication-modal">
              <div className="modal-header">
                <h2>Add Publication from Google Scholar</h2>
                <button
                  className="close-modal-button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedPublication(null);
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddPublication} className="add-publication-form">
                <div className="prefilled-section">
                  <h3>Publication Details (from Google Scholar)</h3>

                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={selectedPublication.title}
                      className="form-control"
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label>Authors</label>
                    <input
                      type="text"
                      value={selectedPublication.authors}
                      className="form-control"
                      disabled
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group half">
                      <label>Date Published</label>
                      <input
                        type="text"
                        value={selectedPublication.year}
                        className="form-control"
                        disabled
                      />
                    </div>

                    <div className="form-group half">
                      <label>Journal</label>
                      <input
                        type="text"
                        value={selectedPublication.journal}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="additional-section">
                  <h3>Additional Information (Optional)</h3>

                  <div className="form-group">
                    <label htmlFor="citedAs">Cited As</label>
                    <input
                      type="text"
                      id="citedAs"
                      name="citedAs"
                      value={formData.citedAs}
                      onChange={handleInputChange}
                      placeholder="e.g., Doe, J., Smith, J. (2023). Title. Journal, 10(2), 123-145."
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="doi">DOI</label>
                    <input
                      type="text"
                      id="doi"
                      name="doi"
                      value={formData.doi}
                      onChange={handleInputChange}
                      placeholder="e.g., 10.1234/journal.123456"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="publicationType">Publication Type</label>
                    <select
                      id="publicationType"
                      name="publicationType"
                      value={formData.publicationType}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="">-- Select Publication Type --</option>
                      {publicationTypes.map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="supportingDocument">Supporting Document</label>
                    <input
                      type="file"
                      id="supportingDocument"
                      name="supportingDocument"
                      onChange={handleInputChange}
                      className="form-control file-input"
                    />
                    <small className="form-text">
                      Upload a PDF or document that supports this publication (max 10MB)
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="sdg">Sustainable Development Goal (SDG)</label>
                    <select
                      id="sdg"
                      name="sdg"
                      value={formData.sdg}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="">-- Select SDG --</option>
                      {sdgOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedPublication(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                  >
                    Add Publication
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
};

export default GoogleScholarLinking;