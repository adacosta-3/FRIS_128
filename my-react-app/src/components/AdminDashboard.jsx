import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { 
  FaArrowLeft, FaSearch, FaDownload, FaFilter, FaUsersCog, FaExclamationTriangle,
  FaCalendarAlt, FaChartBar, FaChartPie, FaChartLine, FaTable, FaClipboardList,
  FaUserGraduate, FaBook, FaHandsHelping, FaCheckCircle, FaTimesCircle, FaClock
} from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadarChart, Radar, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, ZAxis, ComposedChart
} from 'recharts';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('month');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAlert, setShowAlert] = useState(false);

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

  // Mock data for user management
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

  // Mock system alerts
  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High number of pending approvals (25)', timestamp: '2025-05-25 08:00:00' },
    { id: 2, type: 'info', message: 'System maintenance scheduled for May 30, 2025', timestamp: '2025-05-24 10:15:00' },
    { id: 3, type: 'error', message: 'Database synchronization failed', timestamp: '2025-05-23 14:22:33' },
    { id: 4, type: 'success', message: 'Backup completed successfully', timestamp: '2025-05-22 02:00:00' }
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Filter logs based on search query
  const filteredLogs = activityLogs.filter(log => 
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle alert dismissal
  const dismissAlert = (id) => {
    setShowAlert(false);
  };

  // Handle export data
  const handleExportData = (format) => {
    alert(`Data exported in ${format} format successfully!`);
  };

  // Handle user action (for user management)
  const handleUserAction = (userId, action) => {
    alert(`Action '${action}' performed on user ID: ${userId}`);
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
          
          {activeTab !== 'users' && activeTab !== 'logs' && (
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
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && activeSubTab === 'summary' && (
            <div className="overview-section">
              {/* Summary Cards */}
              <div className="summary-cards">
                <div className="summary-card">
                  <div className="card-icon research"><FaBook /></div>
                  <div className="card-content">
                    <h3>Total Submissions</h3>
                    <p className="card-value">100</p>
                    <p className="card-trend positive">+15% from last {timeRange}</p>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="card-icon pending"><FaClock /></div>
                  <div className="card-content">
                    <h3>Pending Approvals</h3>
                    <p className="card-value">25</p>
                    <p className="card-trend negative">+5% from last {timeRange}</p>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="card-icon users"><FaUsersCog /></div>
                  <div className="card-content">
                    <h3>Active Users</h3>
                    <p className="card-value">42</p>
                    <p className="card-trend positive">+8% from last {timeRange}</p>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="card-icon time"><FaClock /></div>
                  <div className="card-content">
                    <h3>Avg. Approval Time</h3>
                    <p className="card-value">2.3 days</p>
                    <p className="card-trend positive">-0.5 days from last {timeRange}</p>
                  </div>
                </div>
              </div>
              
              {/* Charts */}
              <div className="charts-container">
                <div className="chart-card">
                  <div className="chart-header">
                    <h3><FaChartPie /> Submissions by Category</h3>
                    <div className="chart-actions">
                      <button className="chart-action-button" onClick={() => handleExportData('PNG')}>
                        <FaDownload /> Export
                      </button>
                    </div>
                  </div>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={submissionsByCategory}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {submissionsByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value} submissions`, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="chart-card">
                  <div className="chart-header">
                    <h3><FaChartPie /> Submissions by Status</h3>
                    <div className="chart-actions">
                      <button className="chart-action-button" onClick={() => handleExportData('PNG')}>
                        <FaDownload /> Export
                      </button>
                    </div>
                  </div>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={submissionsByStatus}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {submissionsByStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value} submissions`, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="chart-card">
                  <div className="chart-header">
                    <h3><FaChartLine /> Submissions Trend</h3>
                    <div className="chart-actions">
                      <button className="chart-action-button" onClick={() => handleExportData('PNG')}>
                        <FaDownload /> Export
                      </button>
                    </div>
                  </div>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart
                        data={submissionsTrend}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="research" stroke="#0088FE" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="teaching" stroke="#00C49F" />
                        <Line type="monotone" dataKey="service" stroke="#FFBB28" />
                        <Line type="monotone" dataKey="total" stroke="#FF8042" strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="chart-card">
                  <div className="chart-header">
                    <h3><FaChartBar /> User Activity (Last Week)</h3>
                    <div className="chart-actions">
                      <button className="chart-action-button" onClick={() => handleExportData('PNG')}>
                        <FaDownload /> Export
                      </button>
                    </div>
                  </div>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={userActivity}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="submissions" fill="#0088FE" />
                        <Bar dataKey="approvals" fill="#00C49F" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* OVERVIEW - DEPARTMENTS SUBTAB */}
          {activeTab === 'overview' && activeSubTab === 'departments' && (
            <div className="departments-section">
              <div className="charts-container">
                <div className="chart-card full-width">
                  <div className="chart-header">
                    <h3><FaChartBar /> Department Activity Comparison</h3>
                    <div className="chart-actions">
                      <button className="chart-action-button" onClick={() => handleExportData('PNG')}>
                        <FaDownload /> Export
                      </button>
                    </div>
                  </div>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        data={departmentActivity}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value, name) => [`${value} submissions`, name]} />
                        <Legend />
                        <Bar dataKey="research" stackId="a" fill="#0088FE" name="Research" />
                        <Bar dataKey="teaching" stackId="a" fill="#00C49F" name="Teaching" />
                        <Bar dataKey="service" stackId="a" fill="#FFBB28" name="Service" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="chart-card">
                  <div className="chart-header">
                    <h3><FaChartPie /> Department Contribution</h3>
                    <div className="chart-actions">
                      <button className="chart-action-button" onClick={() => handleExportData('PNG')}>
                        <FaDownload /> Export
                      </button>
                    </div>
                  </div>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart outerRadius={90} width={730} height={300} data={departmentActivity}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, 50]} />
                        <Radar name="Research" dataKey="research" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
                        <Radar name="Teaching" dataKey="teaching" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} />
                        <Radar name="Service" dataKey="service" stroke="#FFBB28" fill="#FFBB28" fillOpacity={0.6} />
                        <Legend />
                        <Tooltip formatter={(value, name) => [`${value} submissions`, name]} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="chart-card">
                  <div className="chart-header">
                    <h3><FaChartBar /> Publication Types</h3>
                    <div className="chart-actions">
                      <button className="chart-action-button" onClick={() => handleExportData('PNG')}>
                        <FaDownload /> Export
                      </button>
                    </div>
                  </div>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={publicationTypes}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {publicationTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value} publications`, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* OVERVIEW - SDG ANALYSIS SUBTAB */}
          {activeTab === 'overview' && activeSubTab === 'sdg' && (
            <div className="sdg-section">
              <div className="section-header">
                <h2>Sustainable Development Goals (SDG) Analysis</h2>
                <p>Distribution of research publications and activities across the 17 UN Sustainable Development Goals</p>
              </div>
              
              <div className="charts-container">
                <div className="chart-card full-width">
                  <div className="chart-header">
                    <h3><FaChartBar /> SDG Distribution</h3>
                    <div className="chart-actions">
                      <button className="chart-action-button" onClick={() => handleExportData('PNG')}>
                        <FaDownload /> Export
                      </button>
                    </div>
                  </div>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={500}>
                      <BarChart
                        data={sdgDistribution}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={150} />
                        <Tooltip formatter={(value) => [`${value} publications/activities`, 'Count']} />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" name="Publications & Activities" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="sdg-metrics">
                  <div className="metric-card">
                    <div className="metric-icon"><FaBook /></div>
                    <div className="metric-content">
                      <h3>Most Active SDG</h3>
                      <p className="metric-value">SDG 4: Quality Education</p>
                      <p className="metric-detail">32 publications/activities</p>
                    </div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="metric-icon"><FaChartLine /></div>
                    <div className="metric-content">
                      <h3>Fastest Growing SDG</h3>
                      <p className="metric-value">SDG 9: Innovation</p>
                      <p className="metric-detail">+45% from last {timeRange}</p>
                    </div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="metric-icon"><FaHandsHelping /></div>
                    <div className="metric-content">
                      <h3>Least Represented SDG</h3>
                      <p className="metric-value">SDG 14: Life Below Water</p>
                      <p className="metric-detail">8 publications/activities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* RESEARCH ANALYTICS TAB */}
          {activeTab === 'research' && (
            <div className="research-analytics-section">
              <div className="section-header">
                <h2>Research Analytics</h2>
                <p>Comprehensive analysis of research activities and publications</p>
              </div>
              
              <div className="summary-cards">
                <div className="summary-card">
                  <div className="card-icon research"><FaBook /></div>
                  <div className="card-content">
                    <h3>Total Publications</h3>
                    <p className="card-value">50</p>
                    <p className="card-trend positive">+12% from last {timeRange}</p>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="card-icon projects"><FaChartLine /></div>
                  <div className="card-content">
                    <h3>Active Projects</h3>
                    <p className="card-value">18</p>
                    <p className="card-trend positive">+5% from last {timeRange}</p>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="card-icon presentations"><FaChartBar /></div>
                  <div className="card-content">
                    <h3>Presentations</h3>
                    <p className="card-value">32</p>
                    <p className="card-trend positive">+15% from last {timeRange}</p>
                  </div>
                </div>
              </div>
              
              <div className="charts-container">
                <div className="chart-card">
                  <div className="chart-header">
                    <h3><FaChartPie /> Publication Types</h3>
                    <div className="chart-actions">
                      <button className="chart-action-button" onClick={() => handleExportData('PNG')}>
                        <FaDownload /> Export
                      </button>
                    </div>
                  </div>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={publicationTypes}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {publicationTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value} publications`, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'logs' && (
            <div className="logs-section">
              <div className="logs-header">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search logs..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="logs-actions">
                  <button className="filter-button">
                    <FaFilter /> Filter
                  </button>
                  <button className="export-button">
                    <FaDownload /> Export
                  </button>
                </div>
              </div>
              
              <div className="logs-table">
                <div className="table-header">
                  <div className="header-cell">User</div>
                  <div className="header-cell">Action</div>
                  <div className="header-cell">Category</div>
                  <div className="header-cell">Timestamp</div>
                </div>
                
                <div className="table-body">
                  {filteredLogs.map(log => (
                    <div key={log.id} className="table-row">
                      <div className="table-cell">{log.user}</div>
                      <div className="table-cell">{log.action}</div>
                      <div className="table-cell">
                        <span className={`category-badge ${log.category.toLowerCase()}`}>
                          {log.category}
                        </span>
                      </div>
                      <div className="table-cell">{log.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pagination">
                <button className="pagination-button">Prev</button>
                <div className="pagination-numbers">
                  <button className="pagination-number active">1</button>
                  <button className="pagination-number">2</button>
                  <button className="pagination-number">3</button>
                </div>
                <button className="pagination-button">Next</button>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="users-section">
              <p className="placeholder-message">User management functionality will be implemented in a future update.</p>
            </div>
          )}
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default AdminDashboard;
