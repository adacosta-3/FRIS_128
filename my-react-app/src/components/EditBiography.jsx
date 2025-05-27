// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './EditBiography.css';
// import Sidebar from './Sidebar';
// import Footer from './Footer';
// import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
//
// // Import custom SVG icons
// import editIcon from '../../assets/images/icon-edit.svg';
// import editBiographyIcon from '../../assets/images/icon-Edit Biography.svg';
//
// const EditBiography = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: 'Kristine Joy Arellano',
//     email: 'kbarellano3@up.edu.ph',
//     pronouns: 'She/Her',
//     scholarLink: 'https://scholar.google.com/citations?user=example',
//     researchInterest: 'Machine Learning, Artificial Intelligence, Data Science',
//     educationalBackground: [
//       { id: 1, degree: 'BS Computer Science', school: 'University of the Philippines', yearGraduated: '2018', degreeType: 'Bachelor\'s' }
//     ],
//     researchExperience: [
//       { id: 1, location: 'UP Diliman', dateRange: '2019-2021', details: 'Research on AI applications in healthcare', affiliations: 'UP AI Lab' }
//     ]
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [originalData, setOriginalData] = useState({});
//
//   // Ensure the component is properly mounted with sidebar and footer
//   useEffect(() => {
//     document.title = 'FRIS - Edit Biography';
//
//     // Prevent navigation away from this page
//     const handleBeforeUnload = (e) => {
//       e.preventDefault();
//       e.returnValue = '';
//     };
//
//     window.addEventListener('beforeunload', handleBeforeUnload);
//
//     // Fix the issue with the sidebar and footer not showing
//     setTimeout(() => {
//       // Force sidebar to be visible
//       const sidebar = document.querySelector('.sidebar');
//       if (sidebar) {
//         sidebar.style.display = 'flex';
//         sidebar.style.visibility = 'visible';
//         sidebar.style.opacity = '1';
//         sidebar.style.zIndex = '1000';
//         sidebar.style.position = 'fixed';
//       }
//
//       // Force footer to be visible
//       const footer = document.querySelector('.footer');
//       if (footer) {
//         footer.style.display = 'flex';
//         footer.style.visibility = 'visible';
//         footer.style.opacity = '1';
//         footer.style.zIndex = '1000';
//         footer.style.position = 'relative';
//       }
//     }, 100);
//
//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, []);
//
//   const handleEdit = () => {
//     setOriginalData({...formData}); // Save original data for cancel
//     setIsEditing(true);
//   };
//
//   const handleCancel = () => {
//     setFormData({...originalData}); // Restore original data
//     setIsEditing(false);
//   };
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
//
//   // Handle changes to array fields like educational background and research experience
//   const handleArrayItemChange = (arrayName, index, field, value) => {
//     setFormData(prev => {
//       const newArray = [...prev[arrayName]];
//       newArray[index] = { ...newArray[index], [field]: value };
//       return { ...prev, [arrayName]: newArray };
//     });
//   };
//
//   // Add a new item to an array field
//   const handleAddItem = (arrayName) => {
//     setFormData(prev => {
//       const newId = prev[arrayName].length > 0
//         ? Math.max(...prev[arrayName].map(item => item.id)) + 1
//         : 1;
//
//       let newItem;
//       if (arrayName === 'educationalBackground') {
//         newItem = { id: newId, degree: '', school: '', yearGraduated: '', degreeType: 'Bachelor\'s' };
//       } else if (arrayName === 'researchExperience') {
//         newItem = { id: newId, location: '', dateRange: '', details: '', affiliations: '' };
//       }
//
//       return { ...prev, [arrayName]: [...prev[arrayName], newItem] };
//     });
//   };
//
//   // Remove an item from an array field
//   const handleRemoveItem = (arrayName, id) => {
//     setFormData(prev => ({
//       ...prev,
//       [arrayName]: prev[arrayName].filter(item => item.id !== id)
//     }));
//   };
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     // Here you would typically send the data to your backend
//     setIsEditing(false); // Exit edit mode after saving
//   };
//
//   return (
//     <div className="edit-biography-root">
//       <Sidebar onLogout={onLogout} />
//
//       <main className="edit-biography-main">
//         {/* Go Back Button */}
//         <div className="go-back-button">
//           <button onClick={() => navigate('/home')}>
//             <FaArrowLeft /> Go Back
//           </button>
//         </div>
//
//         <div className="edit-biography-header">
//           <h1>Edit Biography</h1>
//         </div>
//
//         <div className="edit-biography-content">
//           <form onSubmit={handleSubmit} className="biography-form">
//             <div className="form-group">
//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 required
//               />
//             </div>
//
//
//
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 required
//               />
//             </div>
//
//             <div className="form-group">
//               <label htmlFor="pronouns">Pronouns</label>
//               <input
//                 type="text"
//                 id="pronouns"
//                 name="pronouns"
//                 value={formData.pronouns}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//               />
//             </div>
//
//             <div className="form-group">
//               <label htmlFor="scholarLink">Google Scholar Link</label>
//               <input
//                 type="url"
//                 id="scholarLink"
//                 name="scholarLink"
//                 value={formData.scholarLink}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 placeholder="https://scholar.google.com/citations?user=example"
//               />
//             </div>
//
//             <div className="form-group">
//               <label htmlFor="researchInterest">Research Interest</label>
//               <input
//                 type="text"
//                 id="researchInterest"
//                 name="researchInterest"
//                 value={formData.researchInterest}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 placeholder="e.g., Machine Learning, Data Science"
//               />
//             </div>
//
//             {/* Educational Background Section */}
//             <div className="form-section">
//               <h3>Educational Background</h3>
//               {formData.educationalBackground.map((edu, index) => (
//                 <div key={edu.id} className="array-item-container">
//                   <div className="form-group">
//                     <label htmlFor={`degree-${index}`}>Degree</label>
//                     <input
//                       type="text"
//                       id={`degree-${index}`}
//                       value={edu.degree}
//                       onChange={(e) => handleArrayItemChange('educationalBackground', index, 'degree', e.target.value)}
//                       disabled={!isEditing}
//                       required
//                     />
//                   </div>
//
//                   <div className="form-group">
//                     <label htmlFor={`school-${index}`}>School/University</label>
//                     <input
//                       type="text"
//                       id={`school-${index}`}
//                       value={edu.school}
//                       onChange={(e) => handleArrayItemChange('educationalBackground', index, 'school', e.target.value)}
//                       disabled={!isEditing}
//                       required
//                     />
//                   </div>
//
//                   <div className="form-group">
//                     <label htmlFor={`yearGraduated-${index}`}>Year Graduated</label>
//                     <input
//                       type="text"
//                       id={`yearGraduated-${index}`}
//                       value={edu.yearGraduated}
//                       onChange={(e) => handleArrayItemChange('educationalBackground', index, 'yearGraduated', e.target.value)}
//                       disabled={!isEditing}
//                       required
//                     />
//                   </div>
//
//                   <div className="form-group">
//                     <label htmlFor={`degreeType-${index}`}>Degree Type</label>
//                     <select
//                       id={`degreeType-${index}`}
//                       value={edu.degreeType}
//                       onChange={(e) => handleArrayItemChange('educationalBackground', index, 'degreeType', e.target.value)}
//                       disabled={!isEditing}
//                       required
//                     >
//                       <option value="Bachelor's">Bachelor's</option>
//                       <option value="Master's">Master's</option>
//                       <option value="Doctoral">Doctoral</option>
//                     </select>
//                   </div>
//
//                   {isEditing && (
//                     <button
//                       type="button"
//                       className="remove-item-btn"
//                       onClick={() => handleRemoveItem('educationalBackground', edu.id)}
//                     >
//                       <FaTrash /> Remove
//                     </button>
//                   )}
//                 </div>
//               ))}
//
//               {isEditing && (
//                 <button
//                   type="button"
//                   className="add-item-btn"
//                   onClick={() => handleAddItem('educationalBackground')}
//                 >
//                   <FaPlus /> Add Educational Background
//                 </button>
//               )}
//             </div>
//
//             {/* Research Experience Section */}
//             <div className="form-section">
//               <h3>Research Experience</h3>
//               {formData.researchExperience.map((exp, index) => (
//                 <div key={exp.id} className="array-item-container">
//                   <div className="form-group">
//                     <label htmlFor={`location-${index}`}>Location</label>
//                     <input
//                       type="text"
//                       id={`location-${index}`}
//                       value={exp.location}
//                       onChange={(e) => handleArrayItemChange('researchExperience', index, 'location', e.target.value)}
//                       disabled={!isEditing}
//                       required
//                     />
//                   </div>
//
//                   <div className="form-group">
//                     <label htmlFor={`dateRange-${index}`}>Start - End Date</label>
//                     <input
//                       type="text"
//                       id={`dateRange-${index}`}
//                       value={exp.dateRange}
//                       onChange={(e) => handleArrayItemChange('researchExperience', index, 'dateRange', e.target.value)}
//                       disabled={!isEditing}
//                       placeholder="e.g., 2019-2021"
//                       required
//                     />
//                   </div>
//
//                   <div className="form-group">
//                     <label htmlFor={`details-${index}`}>Research Experience Details</label>
//                     <textarea
//                       id={`details-${index}`}
//                       value={exp.details}
//                       onChange={(e) => handleArrayItemChange('researchExperience', index, 'details', e.target.value)}
//                       disabled={!isEditing}
//                       required
//                     />
//                   </div>
//
//                   <div className="form-group">
//                     <label htmlFor={`affiliations-${index}`}>Affiliations</label>
//                     <input
//                       type="text"
//                       id={`affiliations-${index}`}
//                       value={exp.affiliations}
//                       onChange={(e) => handleArrayItemChange('researchExperience', index, 'affiliations', e.target.value)}
//                       disabled={!isEditing}
//                       required
//                     />
//                   </div>
//
//                   {isEditing && (
//                     <button
//                       type="button"
//                       className="remove-item-btn"
//                       onClick={() => handleRemoveItem('researchExperience', exp.id)}
//                     >
//                       <FaTrash /> Remove
//                     </button>
//                   )}
//                 </div>
//               ))}
//
//               {isEditing && (
//                 <button
//                   type="button"
//                   className="add-item-btn"
//                   onClick={() => handleAddItem('researchExperience')}
//                 >
//                   <FaPlus /> Add Research Experience
//                 </button>
//               )}
//             </div>
//
//             <div className="form-actions">
//               {isEditing ? (
//                 <>
//                   <button type="button" className="cancel-btn" onClick={handleCancel}>
//                     Cancel
//                   </button>
//                   <button type="submit" className="save-btn">
//                     <img src={editIcon} alt="Save" className="button-icon" /> Save Changes
//                   </button>
//                 </>
//               ) : (
//                 <button type="button" className="edit-btn" onClick={handleEdit}>
//                   <img src={editBiographyIcon} alt="Edit" className="button-icon" /> Edit
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//
//         <Footer />
//       </main>
//     </div>
//   );
// };
//
// export default EditBiography;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './EditBiography.css';
// import Sidebar from './Sidebar';
// import Footer from './Footer';
// import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
//
// const EditBiography = ({ onLogout }) => {
//   const navigate = useNavigate();
//
//   const [profile, setProfile] = useState({ name: '', email: '', scholarLink: '' });
//   const [researchInterests, setResearchInterests] = useState([]);
//   const [educationalBackground, setEducationalBackground] = useState([]);
//   const [researchExperience, setResearchExperience] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//
//   const token = localStorage.getItem('token');
//
//   // Fetch all data on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const headers = { Authorization: `Bearer ${token}` };
//
//         const [profileRes, interestsRes, educationRes, experienceRes] = await Promise.all([
//           fetch('http://localhost:8080/api/profile/me', { headers }),
//           fetch('http://localhost:8080/api/research-interests', { headers }),
//           fetch('http://localhost:8080/api/educational-background', { headers }),
//           fetch('http://localhost:8080/api/research-experiences', { headers })
//         ]);
//
//         if (!profileRes.ok) throw new Error('Failed to fetch profile');
//         if (!interestsRes.ok) throw new Error('Failed to fetch research interests');
//         if (!educationRes.ok) throw new Error('Failed to fetch educational background');
//         if (!experienceRes.ok) throw new Error('Failed to fetch research experience');
//
//         setProfile(await profileRes.json());
//         setResearchInterests(await interestsRes.json());
//         setEducationalBackground(await educationRes.json());
//         setResearchExperience(await experienceRes.json());
//       } catch (error) {
//         console.error(error);
//         setMessage(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchData();
//   }, [token]);
//
//   // Handlers for Research Interests
//   const addInterest = async () => {
//     const newInterest = prompt('Enter a new research interest:');
//     if (!newInterest) return;
//
//     const response = await fetch('http://localhost:8080/api/research-interests', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//       body: JSON.stringify({ researchInterest: newInterest })
//     });
//
//     if (response.ok) {
//       setResearchInterests([...researchInterests, await response.json()]);
//     } else {
//       alert('Failed to add research interest');
//     }
//   };
//
//   const deleteInterest = async (id) => {
//     await fetch(`http://localhost:8080/api/research-interests/${id}`, {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setResearchInterests(researchInterests.filter(ri => ri.id !== id));
//   };
//
//   // Handlers for Educational Background
//   const addEducation = async () => {
//     const degree = prompt('Degree:');
//     const school = prompt('School/University:');
//     const year = prompt('Year Graduated:');
//     const degreeType = prompt("Degree Type ('Bachelor's', 'Master's', or 'Doctoral'):");
//
//     if (!degree || !school || !year || !degreeType) return;
//
//     const response = await fetch('http://localhost:8080/api/educational-background', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//       body: JSON.stringify({ degree, school, graduationYear: parseInt(year), degreeType })
//     });
//
//     if (response.ok) {
//       setEducationalBackground([...educationalBackground, await response.json()]);
//     } else {
//       alert('Failed to add educational background');
//     }
//   };
//
//   const deleteEducation = async (id) => {
//     await fetch(`http://localhost:8080/api/educational-background/${id}`, {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setEducationalBackground(educationalBackground.filter(eb => eb.eduId !== id));
//   };
//
//   // Handlers for Research Experience
//   const addExperience = async () => {
//     const location = prompt('Location:');
//     const startDate = prompt('Start Date (YYYY-MM-DD):');
//     const endDate = prompt('End Date (YYYY-MM-DD):');
//     const details = prompt('Details:');
//
//     if (!location || !startDate || !endDate || !details) return;
//
//     const response = await fetch('http://localhost:8080/api/research-experiences', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//       body: JSON.stringify({ location, startDate, endDate, experienceDetails: details })
//     });
//
//     if (response.ok) {
//       setResearchExperience([...researchExperience, await response.json()]);
//     } else {
//       alert('Failed to add research experience');
//     }
//   };
//
//   const deleteExperience = async (id) => {
//     await fetch(`http://localhost:8080/api/research-experiences/${id}`, {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setResearchExperience(researchExperience.filter(exp => exp.researchExperienceId !== id));
//   };
//
//   return (
//       <div className="edit-biography-root">
//         <Sidebar onLogout={onLogout} />
//
//         <main className="edit-biography-main">
//           <div className="go-back-button">
//             <button onClick={() => navigate('/home')}>
//               <FaArrowLeft /> Go Back
//             </button>
//           </div>
//
//           <h1>Edit Biography</h1>
//
//           {loading && <p>Loading...</p>}
//           {message && <p className="error">{message}</p>}
//
//           <div className="form-group">
//             <label>Name</label>
//             <input type="text" value={profile.name} disabled />
//           </div>
//
//           <div className="form-group">
//             <label>Email</label>
//             <input type="email" value={profile.email} disabled />
//           </div>
//
//           <div className="form-group">
//             <label>Google Scholar Link</label>
//             <input type="text" value={profile.scholarLink || ''} disabled />
//           </div>
//
//           <div className="form-section">
//             <h3>Research Interests</h3>
//             <ul>
//               {researchInterests.map(ri => (
//                   <li key={ri.researchInterestId}>
//                     {ri.researchInterest}
//                     <button onClick={() => deleteInterest(ri.researchInterestId)}><FaTrash /></button>
//                   </li>
//               ))}
//             </ul>
//             <button onClick={addInterest}><FaPlus /> Add Research Interest</button>
//           </div>
//
//           <div className="form-section">
//             <h3>Educational Background</h3>
//             <ul>
//               {educationalBackground.map(eb => (
//                   <li key={eb.eduId}>
//                     {eb.degree} - {eb.school} ({eb.graduationYear}) [{eb.degreeType}]
//                     <button onClick={() => deleteEducation(eb.eduId)}><FaTrash /></button>
//                   </li>
//               ))}
//             </ul>
//             <button onClick={addEducation}><FaPlus /> Add Educational Background</button>
//           </div>
//
//           <div className="form-section">
//             <h3>Research Experience</h3>
//             <ul>
//               {researchExperience.map(exp => (
//                   <li key={exp.researchExperienceId}>
//                     {exp.location} ({exp.startDate} to {exp.endDate}): {exp.experienceDetails}
//                     <button onClick={() => deleteExperience(exp.researchExperienceId)}><FaTrash /></button>
//                   </li>
//               ))}
//             </ul>
//             <button onClick={addExperience}><FaPlus /> Add Research Experience</button>
//           </div>
//
//           <Footer />
//         </main>
//       </div>
//   );
// };
//
// export default EditBiography;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import './EditBiography.css';

const EditBiography = ({ onLogout }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [educationalBackground, setEducationalBackground] = useState([]);
  const [researchExperience, setResearchExperience] = useState([]);
  const [researchInterests, setResearchInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profileRes, eduRes, expRes, interestRes] = await Promise.all([
        fetch('http://localhost:8080/api/profile/me', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:8080/api/educational-background', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:8080/api/research-experiences', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:8080/api/research-interests', { headers: { 'Authorization': `Bearer ${token}` } }),
      ]);

      setProfile(await profileRes.json());
      setEducationalBackground(await eduRes.json());
      setResearchExperience(await expRes.json());
      setResearchInterests(await interestRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = async (type) => {
    try {
      let endpoint = '', body = {};
      if (type === 'educationalBackground') {
        endpoint = 'educational-background';
        body = { degree: '', school: '', graduationYear: '', degreeType: 'Bachelor' };
      } else if (type === 'researchExperience') {
        endpoint = 'research-experiences';
        body = { location: '', startDate: '', endDate: '', experienceDetails: '' };
      } else if (type === 'researchInterest') {
        endpoint = 'research-interests';
        body = { researchInterest: '' };
      }

      const res = await fetch(`http://localhost:8080/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error(await res.text());

      fetchData();
    } catch (error) {
      console.error('Add item failed:', error);
    }
  };

  const handleUpdateItem = async (type, item) => {
    try {
      let endpoint = '';
      if (type === 'educationalBackground') endpoint = 'educational-background';
      else if (type === 'researchExperience') endpoint = 'research-experiences';
      else if (type === 'researchInterest') endpoint = 'research-interests';

      const res = await fetch(`http://localhost:8080/api/${endpoint}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });

      if (!res.ok) throw new Error(await res.text());

      fetchData();
    } catch (error) {
      console.error('Update item failed:', error);
    }
  };

  const handleDeleteItem = async (type, id) => {
    try {
      let endpoint = '';
      if (type === 'educationalBackground') endpoint = 'educational-background';
      else if (type === 'researchExperience') endpoint = 'research-experiences';
      else if (type === 'researchInterest') endpoint = 'research-interests';

      const res = await fetch(`http://localhost:8080/api/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error(await res.text());

      fetchData();
    } catch (error) {
      console.error('Delete item failed:', error);
    }
  };

  const handleInputChange = (list, setList, index, field, value) => {
    const updated = [...list];
    updated[index] = { ...updated[index], [field]: value };
    setList(updated);
  };

  if (loading) return <div>Loading...</div>;

  return (
      <div className="edit-biography-root">
        <Sidebar onLogout={onLogout} />

        <main className="edit-biography-main">
          <div className="go-back-button">
            <button onClick={() => navigate('/home')}>
              <FaArrowLeft /> Go Back
            </button>
          </div>

          <h1>Edit Biography</h1>

          <div className="biography-profile">
            <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phoneNumber || 'N/A'}</p>
            <p><strong>Google Scholar:</strong> {profile.googleScholarLink || 'N/A'}</p>
          </div>

          <section className="biography-section">
            <h2>Research Interests</h2>
            {researchInterests.map((interest, index) => (
                <div key={interest.researchInterestId} className="array-item-container">
                  <input
                      type="text"
                      value={interest.researchInterest}
                      onChange={(e) =>
                          handleInputChange(researchInterests, setResearchInterests, index, 'researchInterest', e.target.value)
                      }
                  />
                  <button onClick={() => handleUpdateItem('researchInterest', interest)}>Update</button>
                  <button onClick={() => handleDeleteItem('researchInterest', interest.researchInterestId)}>
                    <FaTrash /> Remove
                  </button>
                </div>
            ))}
            <button onClick={() => handleAddItem('researchInterest')}>
              <FaPlus /> Add Research Interest
            </button>
          </section>

          <section className="biography-section">
            <h2>Educational Background</h2>
            {educationalBackground.map((edu, index) => (
                <div key={edu.eduId} className="array-item-container">
                  <input
                      type="text"
                      value={edu.degree}
                      placeholder="Degree"
                      onChange={(e) => handleInputChange(educationalBackground, setEducationalBackground, index, 'degree', e.target.value)}
                  />
                  <input
                      type="text"
                      value={edu.school}
                      placeholder="School"
                      onChange={(e) => handleInputChange(educationalBackground, setEducationalBackground, index, 'school', e.target.value)}
                  />
                  <input
                      type="text"
                      value={edu.graduationYear}
                      placeholder="Year Graduated"
                      onChange={(e) => handleInputChange(educationalBackground, setEducationalBackground, index, 'graduationYear', e.target.value)}
                  />
                  <select
                      value={edu.degreeType}
                      onChange={(e) => handleInputChange(educationalBackground, setEducationalBackground, index, 'degreeType', e.target.value)}
                  >
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="Doctoral">Doctoral</option>
                  </select>
                  <button onClick={() => handleUpdateItem('educationalBackground', edu)}>Update</button>
                  <button onClick={() => handleDeleteItem('educationalBackground', edu.eduId)}>
                    <FaTrash /> Remove
                  </button>
                </div>
            ))}
            <button onClick={() => handleAddItem('educationalBackground')}>
              <FaPlus /> Add Educational Background
            </button>
          </section>

          <section className="biography-section">
            <h2>Research Experience</h2>
            {researchExperience.map((exp, index) => (
                <div key={exp.researchExperienceId} className="array-item-container">
                  <input
                      type="text"
                      value={exp.location}
                      placeholder="Location"
                      onChange={(e) => handleInputChange(researchExperience, setResearchExperience, index, 'location', e.target.value)}
                  />
                  <input
                      type="text"
                      value={exp.startDate}
                      placeholder="Start Date"
                      onChange={(e) => handleInputChange(researchExperience, setResearchExperience, index, 'startDate', e.target.value)}
                  />
                  <input
                      type="text"
                      value={exp.endDate}
                      placeholder="End Date"
                      onChange={(e) => handleInputChange(researchExperience, setResearchExperience, index, 'endDate', e.target.value)}
                  />
                  <textarea
                      value={exp.experienceDetails}
                      placeholder="Details"
                      onChange={(e) => handleInputChange(researchExperience, setResearchExperience, index, 'experienceDetails', e.target.value)}
                  />
                  <button onClick={() => handleUpdateItem('researchExperience', exp)}>Update</button>
                  <button onClick={() => handleDeleteItem('researchExperience', exp.researchExperienceId)}>
                    <FaTrash /> Remove
                  </button>
                </div>
            ))}
            <button onClick={() => handleAddItem('researchExperience')}>
              <FaPlus /> Add Research Experience
            </button>
          </section>

          <Footer />
        </main>
      </div>
  );
};

export default EditBiography;
