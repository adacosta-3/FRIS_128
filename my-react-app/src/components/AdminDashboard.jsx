import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { 
  FaArrowLeft, FaSearch, FaDownload, FaFilter, FaUsersCog, FaExclamationTriangle,
  FaCalendarAlt, FaChartBar, FaChartPie, FaChartLine, FaTable, FaClipboardList,
  FaUserGraduate, FaBook, FaHandsHelping, FaCheckCircle, FaTimesCircle, FaClock,
  FaEye, FaEdit, FaTrash, FaChevronUp, FaChevronDown, FaPlus, FaMinus, FaSave, FaTimes,
} from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import './AdminDashboard.css';

// Mock data for charts and analytics
const submissionsByCategory = [
  { name: 'Research Publications', value: 32, color: '#0088FE' },
  { name: 'Other Research', value: 18, color: '#00C49F' },
  { name: 'Teaching Activities', value: 28, color: '#FFBB28' },
  { name: 'Public Service', value: 22, color: '#FF8042' }
];

const submissionsByStatus = [
  { name: 'Approved', value: 65, color: '#4CAF50' },
  { name: 'Pending', value: 25, color: '#FFC107' },
  { name: 'Rejected', value: 10, color: '#F44336' }
];

const submissionsTrend = [
  { name: 'Jan', research: 14, teaching: 8, service: 6, total: 28 },
  { name: 'Feb', research: 16, teaching: 10, service: 8, total: 34 },
  { name: 'Mar', research: 18, teaching: 12, service: 9, total: 39 },
  { name: 'Apr', research: 22, teaching: 15, service: 11, total: 48 },
  { name: 'May', research: 26, teaching: 18, service: 14, total: 58 },
  { name: 'Jun', research: 32, teaching: 22, service: 18, total: 72 }
];

const userActivity = [
  { name: 'Mon', submissions: 15, approvals: 8, rejections: 2 },
  { name: 'Tue', submissions: 18, approvals: 12, rejections: 3 },
  { name: 'Wed', submissions: 25, approvals: 16, rejections: 4 },
  { name: 'Thu', submissions: 22, approvals: 14, rejections: 3 },
  { name: 'Fri', submissions: 28, approvals: 18, rejections: 5 },
  { name: 'Sat', submissions: 12, approvals: 7, rejections: 1 },
  { name: 'Sun', submissions: 8, approvals: 4, rejections: 1 }
];

const sdgDistribution = [
  { name: 'SDG 1: No Poverty', value: 8 },
  { name: 'SDG 2: Zero Hunger', value: 12 },
  { name: 'SDG 3: Good Health', value: 24 },
  { name: 'SDG 4: Quality Education', value: 32 },
  { name: 'SDG 5: Gender Equality', value: 18 },
  { name: 'SDG 6: Clean Water', value: 10 },
  { name: 'SDG 7: Clean Energy', value: 15 },
  { name: 'SDG 8: Economic Growth', value: 22 },
  { name: 'SDG 9: Innovation', value: 28 },
  { name: 'SDG 10: Reduced Inequalities', value: 14 },
  { name: 'SDG 11: Sustainable Cities', value: 16 },
  { name: 'SDG 12: Responsible Consumption', value: 12 },
  { name: 'SDG 13: Climate Action', value: 20 },
  { name: 'SDG 14: Life Below Water', value: 8 },
  { name: 'SDG 15: Life on Land', value: 10 },
  { name: 'SDG 16: Peace and Justice', value: 15 },
  { name: 'SDG 17: Partnerships', value: 18 }
];

const departmentActivity = [
  { name: 'Computer Science', research: 42, teaching: 28, service: 18 },
  { name: 'Mathematics', research: 38, teaching: 32, service: 15 },
  { name: 'Physics', research: 35, teaching: 30, service: 20 },
  { name: 'Chemistry', research: 32, teaching: 28, service: 16 },
  { name: 'Biology', research: 40, teaching: 35, service: 22 },
  { name: 'Statistics', research: 30, teaching: 25, service: 14 }
];

const approvalTimeData = [
  { name: 'Research', value: 3.2 },
  { name: 'Teaching', value: 2.5 },
  { name: 'Service', value: 1.8 }
];

const userGrowth = [
  { name: 'Jan', active: 65, new: 12 },
  { name: 'Feb', active: 72, new: 8 },
  { name: 'Mar', active: 78, new: 6 },
  { name: 'Apr', active: 85, new: 7 },
  { name: 'May', active: 92, new: 8 },
  { name: 'Jun', active: 98, new: 6 }
];

const publicationTypes = [
  { name: 'Journal Articles', value: 45 },
  { name: 'Conference Papers', value: 32 },
  { name: 'Book Chapters', value: 18 },
  { name: 'Books', value: 8 },
  { name: 'Technical Reports', value: 12 },
  { name: 'Other', value: 15 }
];

// Mock data for activity logs
const activityLogs = [
  { id: 1, user: 'Kristine Joy Arellano', action: 'Submitted research paper', category: 'Research', timestamp: '2025-05-25 14:32:45', details: 'International Journal Publication' },
  { id: 2, user: 'John Smith', action: 'Approved request', category: 'Approval', timestamp: '2025-05-25 13:15:22', details: 'Teaching activity submission #1254' },
  { id: 3, user: 'Maria Garcia', action: 'Updated teaching record', category: 'Teaching', timestamp: '2025-05-25 11:47:09', details: 'CMSC 128 - Software Engineering' },
  { id: 4, user: 'Robert Johnson', action: 'Rejected submission', category: 'Approval', timestamp: '2025-05-24 16:30:18', details: 'Missing supporting documents' },
  { id: 5, user: 'Lisa Wong', action: 'Added public service entry', category: 'Service', timestamp: '2025-05-24 10:22:37', details: 'Community outreach program' },
  { id: 6, user: 'Michael Brown', action: 'Generated CV', category: 'System', timestamp: '2025-05-24 09:15:44', details: 'Full CV with publications' },
  { id: 7, user: 'Sarah Davis', action: 'Linked Google Scholar', category: 'System', timestamp: '2025-05-23 15:40:12', details: 'Profile synchronization' },
  { id: 8, user: 'James Wilson', action: 'Bulk uploaded entries', category: 'Research', timestamp: '2025-05-23 14:05:29', details: '15 research publications imported' },
  { id: 9, user: 'Emily Taylor', action: 'Updated profile', category: 'System', timestamp: '2025-05-23 11:52:18', details: 'Changed contact information' },
  { id: 10, user: 'David Martinez', action: 'Submitted teaching activity', category: 'Teaching', timestamp: '2025-05-22 16:47:33', details: 'Course development for CMSC 142' },
  { id: 11, user: 'Anna Lee', action: 'Added research project', category: 'Research', timestamp: '2025-05-22 14:22:10', details: 'AI for Healthcare - DOST Funded' },
  { id: 12, user: 'Thomas Wilson', action: 'Updated public service', category: 'Service', timestamp: '2025-05-22 11:05:42', details: 'Department committee service' },
  { id: 13, user: 'Jennifer Lopez', action: 'Submitted conference paper', category: 'Research', timestamp: '2025-05-21 16:38:25', details: 'International Conference on AI' },
  { id: 14, user: 'William Chen', action: 'Generated report', category: 'System', timestamp: '2025-05-21 13:12:08', details: 'Annual faculty performance report' },
  { id: 15, user: 'Olivia Johnson', action: 'Added teaching award', category: 'Teaching', timestamp: '2025-05-21 10:45:33', details: 'Best Teacher Award 2025' }
];

// Mock user list
const usersList = [
  { id: 1, name: 'Kristine Joy Arellano', email: 'kjarellano@up.edu.ph', role: 'Faculty', department: 'Computer Science', status: 'Active', lastActive: '2025-05-25 14:32:45' },
  { id: 2, name: 'John Smith', email: 'jsmith@up.edu.ph', role: 'Admin', department: 'Computer Science', status: 'Active', lastActive: '2025-05-25 13:15:22' },
  { id: 3, name: 'Maria Garcia', email: 'mgarcia@up.edu.ph', role: 'Faculty', department: 'Mathematics', status: 'Active', lastActive: '2025-05-25 11:47:09' },
  { id: 4, name: 'Robert Johnson', email: 'rjohnson@up.edu.ph', role: 'Department Head', department: 'Physics', status: 'Active', lastActive: '2025-05-24 16:30:18' },
  { id: 5, name: 'Lisa Wong', email: 'lwong@up.edu.ph', role: 'Faculty', department: 'Chemistry', status: 'Active', lastActive: '2025-05-24 10:22:37' },
  { id: 6, name: 'Michael Brown', email: 'mbrown@up.edu.ph', role: 'Faculty', department: 'Biology', status: 'Inactive', lastActive: '2025-05-24 09:15:44' },
  { id: 7, name: 'Sarah Davis', email: 'sdavis@up.edu.ph', role: 'Faculty', department: 'Computer Science', status: 'Active', lastActive: '2025-05-23 15:40:12' },
  { id: 8, name: 'James Wilson', email: 'jwilson@up.edu.ph', role: 'Faculty', department: 'Statistics', status: 'Active', lastActive: '2025-05-23 14:05:29' }
];

// System alerts
const systemAlerts = [
  { id: 1, type: 'warning', message: 'High number of pending approvals (25)', timestamp: '2025-05-25 08:00:00' },
  { id: 2, type: 'info', message: 'System maintenance scheduled for May 30, 2025', timestamp: '2025-05-24 10:15:00' },
  { id: 3, type: 'error', message: 'Database synchronization failed', timestamp: '2025-05-23 14:22:33' },
  { id: 4, type: 'success', message: 'Backup completed successfully', timestamp: '2025-05-22 02:00:00' }
];

// Approval paths data and related constants
const initialApprovalPaths = [
  {
    id: 1,
    pathName: 'CAS Faculty Path: Chair → Dean → VC → Chancellor',
    roleRankId: 8,
    college: 'CAS',
    department: 'DPSM',
    levels: [
      { levelOrder: 1, roleRankId: 6, scope: 'department', deadlineDays: 5 },
      { levelOrder: 2, roleRankId: 4, scope: 'college', deadlineDays: 5 },
      { levelOrder: 3, roleRankId: 3, scope: 'university', deadlineDays: 4 },
      { levelOrder: 4, roleRankId: 2, scope: 'university', deadlineDays: 3 },
    ],
  },
];

const roles = [
  { id: 1, name: 'OVCR' },
  { id: 2, name: 'Chancellor' },
  { id: 3, name: 'Vice Chancellor' },
  { id: 4, name: 'Dean' },
  { id: 5, name: 'Associate Dean' },
  { id: 6, name: 'Department Chairperson' },
  { id: 7, name: 'Program Coordinator' },
  { id: 8, name: 'Faculty' },
  { id: 9, name: 'Administrative Staff' },
  { id: 10, name: 'College Secretary' },
];

const scopes = ['department', 'college', 'university'];

const tableHeaderStyle = {
  padding: '0.75rem 1rem',
  textAlign: 'left',
  borderBottom: '2px solid #ccc',
  fontWeight: '600',
  fontSize: '1rem',
};

const tableCellStyle = {
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #ccc',
  verticalAlign: 'middle',
  fontSize: '0.95rem',
};

const actionButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '0.25rem 0.5rem',
  cursor: 'pointer',
  borderRadius: '4px',
  fontSize: '0.85rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
};

const levelHeaderCellStyle = {
  padding: '0.5rem 1rem',
  borderBottom: '2px solid #aaa',
  fontWeight: '600',
  fontSize: '0.9rem',
  textAlign: 'left',
};

const levelCellStyle = {
  padding: '0.5rem 1rem',
  borderBottom: '1px solid #ddd',
  fontSize: '0.9rem',
};

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  // States from original dashboard
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('month');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAlert, setShowAlert] = useState(false);

  // Approval Paths states
  const [approvalPaths, setApprovalPaths] = useState(initialApprovalPaths);
  const [showLevelsForPathId, setShowLevelsForPathId] = useState(null);
  const [editingPathId, setEditingPathId] = useState(null);
  const initialFormState = {
    pathName: '',
    roleRankId: 8,
    college: '',
    department: '',
    levels: [
      {
        levelOrder: 1,
        roleRankId: 6,
        scope: 'department',
        deadlineDays: 5,
      },
    ],
  };
  const [formState, setFormState] = useState(initialFormState);

  // Handlers for Approval Paths Management
  const toggleShowLevels = (pathId) => {
    if (editingPathId === pathId) return;
    setShowLevelsForPathId(showLevelsForPathId === pathId ? null : pathId);
  };

  const startEdit = (pathId) => {
    const path = approvalPaths.find((p) => p.id === pathId);
    if (!path) return;
    setEditingPathId(pathId);
    const levelsCopy = path.levels.map((lvl) => ({ ...lvl }));
    setFormState({ ...path, levels: levelsCopy });
    setShowLevelsForPathId(pathId);
  };

  const cancelEdit = () => {
    setEditingPathId(null);
    setFormState(initialFormState);
  };

  const handleFormFieldChange = (e) => {
    const { name, value } = e.target;
    if (name === 'roleRankId') {
      setFormState((prev) => ({ ...prev, roleRankId: Number(value) }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLevelChange = (index, field, value) => {
    setFormState((prev) => {
      const levelsCopy = [...prev.levels];
      if (field === 'roleRankId' || field === 'deadlineDays' || field === 'levelOrder') {
        levelsCopy[index][field] = Number(value);
      } else {
        levelsCopy[index][field] = value;
      }
      return { ...prev, levels: levelsCopy };
    });
  };

  const addLevel = () => {
    setFormState((prev) => ({
      ...prev,
      levels: [
        ...prev.levels,
        {
          levelOrder: prev.levels.length + 1,
          roleRankId: roles[0].id,
          scope: scopes[0],
          deadlineDays: 3,
        },
      ],
    }));
  };

  const removeLevel = (index) => {
    setFormState((prev) => {
      if (prev.levels.length === 1) return prev;
      const newLevels = prev.levels
        .filter((_, i) => i !== index)
        .map((lvl, idx) => ({ ...lvl, levelOrder: idx + 1 }));
      return { ...prev, levels: newLevels };
    });
  };

  const validateForm = () => {
    if (!formState.pathName.trim()) {
      alert('Please enter an approval path name.');
      return false;
    }
    if (!formState.roleRankId) {
      alert('Please select a role for the approval path.');
      return false;
    }
    for (const lvl of formState.levels) {
      if (!lvl.levelOrder || !lvl.roleRankId || !lvl.scope || !lvl.deadlineDays) {
        alert('Please fill in all level fields.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingPathId !== null) {
      setApprovalPaths((prev) =>
        prev.map((p) => (p.id === editingPathId ? { ...formState } : p))
      );
      alert('Approval path updated successfully.');
    } else {
      const newId = approvalPaths.length
        ? Math.max(...approvalPaths.map((p) => p.id)) + 1
        : 1;
      setApprovalPaths((prev) => [...prev, { ...formState, id: newId }]);
      alert('New approval path created successfully.');
    }
    cancelEdit();
    setShowLevelsForPathId(null);
  };

  const handleDelete = (pathId) => {
    if (window.confirm('Are you sure you want to delete this approval path?')) {
      setApprovalPaths((prev) => prev.filter((p) => p.id !== pathId));
      if (showLevelsForPathId === pathId) setShowLevelsForPathId(null);
      if (editingPathId === pathId) cancelEdit();
    }
  };

  // Filtering activity logs for 'logs' tab
  const filteredLogs = activityLogs.filter(log => 
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Alert dismissal
  const dismissAlert = (id) => {
    setShowAlert(false);
  };

  // Export data handler
  const handleExportData = (format) => {
    alert(`Data exported in ${format} format successfully!`);
  };

  return (
    <div className="admin-dashboard-root">
      <Sidebar onLogout={onLogout} />
      <main className="admin-dashboard-main">
        {/* System Alerts */}
        {showAlert && systemAlerts.length > 0 && (
          <div className={`system-alert ${systemAlerts[0].type}`}>
            <div className="alert-icon">
              {systemAlerts[0].type === 'warning' && <FaExclamationTriangle />}
              {systemAlerts[0].type === 'info' && <FaCalendarAlt />}
              {systemAlerts[0].type === 'error' && <FaTimesCircle />}
              {systemAlerts[0].type === 'success' && <FaCheckCircle />}
            </div>
            <div className="alert-content">
              <p>{systemAlerts[0].message}</p>
              <span className="alert-timestamp">{systemAlerts[0].timestamp}</span>
            </div>
            <button className="dismiss-alert" onClick={() => dismissAlert(systemAlerts[0].id)}>
              &times;
            </button>
          </div>
        )}

        {/* Go Back Button */}
        <div className="go-back-button">
          <button onClick={() => navigate('/home')}>
            <FaArrowLeft /> Go Back
          </button>
        </div>

        {/* Dashboard Header */}
        <div className="admin-dashboard-header">
          <h1><FaUsersCog /> Admin Dashboard</h1>
          <div className="dashboard-actions">
            <button className="action-button" onClick={() => setShowAlert(!showAlert)}>
              <FaExclamationTriangle /> Alerts ({systemAlerts.length})
            </button>
            <div className="export-dropdown">
              <button className="action-button">
                <FaDownload /> Export Data
              </button>
              <div className="export-dropdown-content">
                <button onClick={() => handleExportData('CSV')}>CSV</button>
                <button onClick={() => handleExportData('Excel')}>Excel</button>
                <button onClick={() => handleExportData('PDF')}>PDF</button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaChartBar /> Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'research' ? 'active' : ''}`}
            onClick={() => setActiveTab('research')}
          >
            <FaBook /> Research Analytics
          </button>
          <button 
            className={`tab-button ${activeTab === 'teaching' ? 'active' : ''}`}
            onClick={() => setActiveTab('teaching')}
          >
            <FaUserGraduate /> Teaching Analytics
          </button>
          <button 
            className={`tab-button ${activeTab === 'service' ? 'active' : ''}`}
            onClick={() => setActiveTab('service')}
          >
            <FaHandsHelping /> Service Analytics
          </button>
          <button 
            className={`tab-button ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            <FaClipboardList /> Activity Logs
          </button>
          <button 
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsersCog /> User Management
          </button>
          <button 
            className={`tab-button ${activeTab === 'approvalPaths' ? 'active' : ''}`}
            onClick={() => setActiveTab('approvalPaths')}
          >
            <FaUsersCog /> Approval Paths
          </button>
        </div>

        {/* Sub-tabs for Overview */}
        {activeTab === 'overview' && (
          <div className="dashboard-subtabs">
            <button 
              className={`subtab-button ${activeSubTab === 'summary' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('summary')}
            >
              Summary
            </button>
            <button 
              className={`subtab-button ${activeSubTab === 'trends' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('trends')}
            >
              Trends
            </button>
            <button 
              className={`subtab-button ${activeSubTab === 'departments' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('departments')}
            >
              Departments
            </button>
            <button 
              className={`subtab-button ${activeSubTab === 'sdg' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('sdg')}
            >
              SDG Analysis
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="dashboard-filters">
          <div className="time-range-filter">
            <label><FaCalendarAlt /> Time Range:</label>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
          </div>

          {activeTab !== 'users' && activeTab !== 'logs' && activeTab !== 'approvalPaths' && (
            <div className="category-filter">
              <label><FaFilter /> Category:</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="research">Research</option>
                <option value="teaching">Teaching</option>
                <option value="service">Public Service</option>
              </select>
            </div>
          )}

          {(activeTab === 'logs' || activeTab === 'users') && (
            <div className="search-filter">
              <label><FaSearch /></label>
              <input
                type="text"
                placeholder={activeTab === 'logs' ? "Search logs..." : "Search users..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Show content based on active tab */}
          {/* ... original tabs omitted for brevity (they can be added the same as in initial code)... */}

          {/* Approval Paths Management Tab */}
          {activeTab === 'approvalPaths' && (
            <div style={{ padding: '1rem', maxWidth: '1000px', margin: 'auto' }}>
              <h2>Approval Paths Management</h2>

              {/* New Approval Path or Edit form */}
              {!editingPathId && (
                <section
                  style={{
                    marginBottom: '2rem',
                    border: '1px solid #ddd',
                    padding: '1rem',
                    borderRadius: '8px',
                    backgroundColor: '#fafafa',
                  }}
                  aria-label="New Approval Path Form"
                >
                  <h3>Add New Approval Path</h3>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <div style={{ flexGrow: 1, minWidth: '200px' }}>
                      <label htmlFor="new-pathName" style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                        Approval Path Name*
                      </label>
                      <input
                        id="new-pathName"
                        type="text"
                        name="pathName"
                        placeholder="Enter approval path name"
                        value={formState.pathName}
                        onChange={handleFormFieldChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                        aria-required="true"
                      />
                    </div>

                    <div style={{ minWidth: '180px' }}>
                      <label htmlFor="new-roleRankId" style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                        Role Rank*
                      </label>
                      <select
                        id="new-roleRankId"
                        name="roleRankId"
                        value={formState.roleRankId}
                        onChange={handleFormFieldChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                        aria-required="true"
                      >
                        {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                      </select>
                    </div>

                    <div style={{ minWidth: '150px' }}>
                      <label htmlFor="new-college" style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                        College
                      </label>
                      <input
                        id="new-college"
                        type="text"
                        name="college"
                        placeholder="Enter college (optional)"
                        value={formState.college}
                        onChange={handleFormFieldChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>

                    <div style={{ minWidth: '150px' }}>
                      <label htmlFor="new-department" style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                        Department
                      </label>
                      <input
                        id="new-department"
                        type="text"
                        name="department"
                        placeholder="Enter department (optional)"
                        value={formState.department}
                        onChange={handleFormFieldChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <h4>Approval Levels</h4>
                    {formState.levels.map((level, index) => (
                      <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div>
                          <label htmlFor={`new-levelOrder-${index}`} style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                            Level Order*
                          </label>
                          <input
                            id={`new-levelOrder-${index}`}
                            type="number"
                            min={1}
                            name="levelOrder"
                            placeholder="Level Order"
                            value={level.levelOrder}
                            onChange={(e) => handleLevelChange(index, 'levelOrder', e.target.value)}
                            style={{ width: '90px', padding: '0.4rem' }}
                            aria-required="true"
                          />
                        </div>
                        <div>
                          <label htmlFor={`new-roleRankId-${index}`} style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                            Role Rank*
                          </label>
                          <select
                            id={`new-roleRankId-${index}`}
                            name="roleRankId"
                            value={level.roleRankId}
                            onChange={(e) => handleLevelChange(index, 'roleRankId', e.target.value)}
                            style={{ minWidth: '140px', padding: '0.4rem' }}
                            aria-required="true"
                          >
                            {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label htmlFor={`new-scope-${index}`} style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                            Scope*
                          </label>
                          <select
                            id={`new-scope-${index}`}
                            name="scope"
                            value={level.scope}
                            onChange={(e) => handleLevelChange(index, 'scope', e.target.value)}
                            style={{ minWidth: '130px', padding: '0.4rem' }}
                            aria-required="true"
                          >
                            {scopes.map(sc => <option key={sc} value={sc}>{sc}</option>)}
                          </select>
                        </div>
                        <div>
                          <label htmlFor={`new-deadlineDays-${index}`} style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                            Deadline (days)*
                          </label>
                          <input
                            id={`new-deadlineDays-${index}`}
                            type="number"
                            min={1}
                            name="deadlineDays"
                            placeholder="Deadline days"
                            value={level.deadlineDays}
                            onChange={(e) => handleLevelChange(index, 'deadlineDays', e.target.value)}
                            style={{ width: '110px', padding: '0.4rem' }}
                            aria-required="true"
                          />
                        </div>
                        {formState.levels.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLevel(index)}
                            title="Remove level"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'red',
                              fontSize: '1.2rem',
                              cursor: 'pointer',
                              alignSelf: 'flex-end',
                              marginBottom: '4px',
                            }}
                            aria-label={`Remove level ${index + 1}`}
                          >
                            <FaMinus />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addLevel}
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.4rem 1rem',
                        fontSize: '1rem',
                        cursor: 'pointer',
                      }}
                      aria-label="Add new approval level"
                    >
                      <FaPlus /> Add Level
                    </button>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <button
                      onClick={handleSubmit}
                      style={{
                        padding: '0.6rem 1.2rem',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        marginRight: '0.5rem',
                      }}
                      aria-label="Save approval path"
                    >
                      <FaSave /> Save
                    </button>
                  </div>
                </section>
              )}

              {/* Approval Paths Table */}
              <div
                className="approval-paths-list"
                aria-label="Approval paths list"
                style={{ width: '100%', boxSizing: 'border-box' }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#f0f0f0' }}>
                    <tr>
                      <th style={tableHeaderStyle}>Path ID</th>
                      <th style={tableHeaderStyle}>Name</th>
                      <th style={tableHeaderStyle}>Role Rank ID</th>
                      <th style={tableHeaderStyle}>College</th>
                      <th style={tableHeaderStyle}>Department</th>
                      <th style={tableHeaderStyle}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalPaths.map((path) => (
                      <React.Fragment key={path.id}>
                        <tr style={{ borderBottom: '1px solid #ddd' }}>
                          <td style={tableCellStyle}>{path.id}</td>
                          <td style={tableCellStyle}>{path.pathName}</td>
                          <td style={tableCellStyle}>{path.roleRankId}</td>
                          <td style={tableCellStyle}>{path.college || '-'}</td>
                          <td style={tableCellStyle}>{path.department || '-'}</td>
                          <td style={tableCellStyle}>
                            <button
                              onClick={() => toggleShowLevels(path.id)}
                              style={actionButtonStyle}
                              aria-label={`View levels for ${path.pathName}`}
                              disabled={editingPathId === path.id}
                            >
                              {showLevelsForPathId === path.id ? <FaChevronUp /> : <FaEye />} View Levels
                            </button>
                            <button
                              onClick={() => startEdit(path.id)}
                              style={{ ...actionButtonStyle, marginLeft: '0.5rem' }}
                              aria-label={`Edit ${path.pathName}`}
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(path.id)}
                              style={{
                                ...actionButtonStyle,
                                marginLeft: '0.5rem',
                                color: 'red',
                              }}
                              aria-label={`Delete ${path.pathName}`}
                              disabled={editingPathId === path.id}
                            >
                              <FaTrash /> Delete
                            </button>
                          </td>
                        </tr>

                        {/* Show levels */}
                        {showLevelsForPathId === path.id && editingPathId !== path.id && (
                          <tr>
                            <td colSpan={6} style={{ backgroundColor: '#fafafa', padding: '0.5rem 1rem' }}>
                              <table style={{ width: '100%', borderCollapse: 'collapse' }} aria-label={`Levels for ${path.pathName}`}>
                                <thead style={{ backgroundColor: '#e6e6e6' }}>
                                  <tr>
                                    <th style={levelHeaderCellStyle}>Level</th>
                                    <th style={levelHeaderCellStyle}>Role Rank ID</th>
                                    <th style={levelHeaderCellStyle}>Scope</th>
                                    <th style={levelHeaderCellStyle}>Deadline</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {path.levels
                                    .slice()
                                    .sort((a, b) => a.levelOrder - b.levelOrder)
                                    .map((level) => (
                                      <tr key={level.levelOrder} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={levelCellStyle}>{level.levelOrder}</td>
                                        <td style={levelCellStyle}>{level.roleRankId}</td>
                                        <td style={levelCellStyle}>{level.scope}</td>
                                        <td style={levelCellStyle}>
                                          {level.deadlineDays} day{level.deadlineDays > 1 ? 's' : ''}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}

                        {/* Edit form */}
                        {editingPathId === path.id && (
                          <tr>
                            <td colSpan={6}>
                              <div
                                style={{
                                  border: '1px solid #ddd',
                                  padding: '1rem',
                                  borderRadius: '8px',
                                  backgroundColor: '#f9f9f9',
                                }}
                                aria-label={`Editing approval path ${path.pathName}`}
                              >
                                <h3>Edit Approval Path</h3>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                  <div style={{ flexGrow: 1, minWidth: '200px' }}>
                                    <label htmlFor="edit-pathName" style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                                      Approval Path Name*
                                    </label>
                                    <input
                                      id="edit-pathName"
                                      type="text"
                                      name="pathName"
                                      placeholder="Approval Path Name"
                                      value={formState.pathName}
                                      onChange={handleFormFieldChange}
                                      style={{ width: '100%', padding: '0.5rem' }}
                                      aria-required="true"
                                    />
                                  </div>
                                  <div style={{ minWidth: '180px' }}>
                                    <label htmlFor="edit-roleRankId" style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                                      Role Rank*
                                    </label>
                                    <select
                                      id="edit-roleRankId"
                                      name="roleRankId"
                                      value={formState.roleRankId}
                                      onChange={handleFormFieldChange}
                                      style={{ width: '100%', padding: '0.5rem' }}
                                      aria-required="true"
                                    >
                                      {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                                    </select>
                                  </div>
                                  <div style={{ minWidth: '150px' }}>
                                    <label htmlFor="edit-college" style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                                      College
                                    </label>
                                    <input
                                      id="edit-college"
                                      type="text"
                                      name="college"
                                      placeholder="College (optional)"
                                      value={formState.college}
                                      onChange={handleFormFieldChange}
                                      style={{ width: '100%', padding: '0.5rem' }}
                                    />
                                  </div>
                                  <div style={{ minWidth: '150px' }}>
                                    <label htmlFor="edit-department" style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                                      Department
                                    </label>
                                    <input
                                      id="edit-department"
                                      type="text"
                                      name="department"
                                      placeholder="Department (optional)"
                                      value={formState.department}
                                      onChange={handleFormFieldChange}
                                      style={{ width: '100%', padding: '0.5rem' }}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <h4>Approval Levels</h4>
                                  {formState.levels.map((level, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                      <div>
                                        <label htmlFor={`edit-levelOrder-${index}`} style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                                          Level Order*
                                        </label>
                                        <input
                                          id={`edit-levelOrder-${index}`}
                                          type="number"
                                          min={1}
                                          name="levelOrder"
                                          placeholder="Level Order"
                                          value={level.levelOrder}
                                          onChange={(e) => handleLevelChange(index, 'levelOrder', e.target.value)}
                                          style={{ width: '90px', padding: '0.4rem' }}
                                          aria-required="true"
                                        />
                                      </div>
                                      <div>
                                        <label htmlFor={`edit-roleRankId-${index}`} style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                                          Role Rank*
                                        </label>
                                        <select
                                          id={`edit-roleRankId-${index}`}
                                          name="roleRankId"
                                          value={level.roleRankId}
                                          onChange={(e) => handleLevelChange(index, 'roleRankId', e.target.value)}
                                          style={{ minWidth: '140px', padding: '0.4rem' }}
                                          aria-required="true"
                                        >
                                          {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                                        </select>
                                      </div>
                                      <div>
                                        <label htmlFor={`edit-scope-${index}`} style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                                          Scope*
                                        </label>
                                        <select
                                          id={`edit-scope-${index}`}
                                          name="scope"
                                          value={level.scope}
                                          onChange={(e) => handleLevelChange(index, 'scope', e.target.value)}
                                          style={{ minWidth: '130px', padding: '0.4rem' }}
                                          aria-required="true"
                                        >
                                          {scopes.map(sc => <option key={sc} value={sc}>{sc}</option>)}
                                        </select>
                                      </div>
                                      <div>
                                        <label htmlFor={`edit-deadlineDays-${index}`} style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                                          Deadline (days)*
                                        </label>
                                        <input
                                          id={`edit-deadlineDays-${index}`}
                                          type="number"
                                          min={1}
                                          name="deadlineDays"
                                          placeholder="Deadline days"
                                          value={level.deadlineDays}
                                          onChange={(e) => handleLevelChange(index, 'deadlineDays', e.target.value)}
                                          style={{ width: '110px', padding: '0.4rem' }}
                                          aria-required="true"
                                        />
                                      </div>
                                      {formState.levels.length > 1 && (
                                        <button
                                          type="button"
                                          onClick={() => removeLevel(index)}
                                          title="Remove level"
                                          style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'red',
                                            fontSize: '1.2rem',
                                            cursor: 'pointer',
                                            alignSelf: 'flex-end',
                                            marginBottom: '4px',
                                          }}
                                          aria-label={`Remove level ${index + 1}`}
                                        >
                                          <FaMinus />
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={addLevel}
                                    style={{
                                      marginTop: '0.5rem',
                                      padding: '0.4rem 1rem',
                                      fontSize: '1rem',
                                      cursor: 'pointer',
                                    }}
                                    aria-label="Add new approval level"
                                  >
                                    <FaPlus /> Add Level
                                  </button>
                                </div>

                                <div style={{ marginTop: '1rem' }}>
                                  <button
                                    onClick={handleSubmit}
                                    style={{
                                      padding: '0.6rem 1.2rem',
                                      fontSize: '1rem',
                                      cursor: 'pointer',
                                      backgroundColor: '#007bff',
                                      color: 'white',
                                      border: 'none',
                                      borderRadius: '4px',
                                      marginRight: '0.5rem',
                                    }}
                                    aria-label="Save approval path"
                                  >
                                    <FaSave /> Save
                                  </button>
                                  <button
                                    onClick={cancelEdit}
                                    style={{
                                      padding: '0.6rem 1.2rem',
                                      fontSize: '1rem',
                                      cursor: 'pointer',
                                      backgroundColor: '#6c757d',
                                      color: 'white',
                                      border: 'none',
                                      borderRadius: '4px',
                                    }}
                                    aria-label="Cancel editing approval path"
                                  >
                                    <FaTimes /> Cancel
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                    {approvalPaths.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '1rem' }}>
                          No approval paths available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* You can add back other tab contents like overview, research, teaching etc here if needed */}
          {/* I omitted them here for brevity since the user has original code already with those */}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default AdminDashboard;

