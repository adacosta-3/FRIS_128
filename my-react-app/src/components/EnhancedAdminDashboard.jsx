import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { 
  FaArrowLeft, FaSearch, FaDownload, FaFilter, FaUsersCog, FaExclamationTriangle,
  FaCalendarAlt, FaChartBar, FaChartPie, FaChartLine, FaTable, FaClipboardList,
  FaUserGraduate, FaBook, FaHandsHelping, FaCheckCircle, FaTimesCircle, FaClock,
  FaEye, FaEdit, FaTrash, FaChevronUp, FaChevronDown, FaPlus, FaMinus, FaSave, FaTimes,
  FaUser, FaUsers, FaUserShield, FaUserCog, FaFileAlt, FaHistory
} from 'react-icons/fa';

// Import chart components
import {
  SubmissionsByCategoryChart,
  SubmissionsByStatusChart,
  SubmissionsTrendChart,
  UserActivityChart,
  PublicationTypesChart,
  SDGDistributionChart,
  ResearchImpactChart,
  CourseDistributionChart,
  TeachingPointsChart,
  AuthorshipDistributionChart,
  ServiceTypeDistributionChart,
  ServiceByLevelChart,
  ServiceTrendChart
} from './DashboardCharts';

// Import mock data
import {
  submissionsByCategory,
  submissionsByStatus,
  submissionsTrend,
  userActivity,
  publicationTypes,
  sdgDistribution,
  researchImpactMetrics,
  courseDistribution,
  teachingPointsByTerm,
  authorshipDistribution,
  serviceTypeDistribution,
  serviceByLevel,
  serviceTrend,
  activityLogs,
  usersList,
  systemAlerts,
  initialApprovalPaths,
  roles,
  scopes
} from './DashboardData';

// Import styles
import './AdminDashboard.css';
import './DashboardCharts.css';

const EnhancedAdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  // States for dashboard tabs and filters
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('month');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAlert, setShowAlert] = useState(true);
  
  // Effect to hide approval path form when switching to the approvals tab
  useEffect(() => {
    if (activeTab === 'approvals') {
      setShowApprovalPathForm(false);
      setEditingPathId(null);
    }
  }, [activeTab]);

  // States for activity logs
  const [logFilter, setLogFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  // States for approval paths management
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

  // States for user management
  const [users, setUsers] = useState(usersList);
  const [editingUser, setEditingUser] = useState(null);

  // Filter activity logs based on search query and category filter
  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      logFilter === 'all' || 
      log.category.toLowerCase() === logFilter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Pagination for activity logs
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  // Handlers for approval paths
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
    setShowApprovalPathForm(false); // Hide the form when canceling
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
        prev.map((p) => (p.id === editingPathId ? { ...formState, id: editingPathId } : p))
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

  // Handlers for user management
  const handleRoleChange = (userId, newRole) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const toggleUserStatus = (userId) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } 
          : user
      )
    );
  };

  // Alert dismissal
  const dismissAlert = () => {
    setShowAlert(false);
  };

  // Export data handler
  const handleExportData = (format) => {
    alert(`Data exported in ${format} format successfully!`);
  };

  // Render dashboard content based on active tab and subtab
  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'research':
        return renderResearchTab();
      case 'teaching':
        return renderTeachingTab();
      case 'service':
        return renderServiceTab();
      case 'logs':
        return renderActivityLogsTab();
      case 'approvals':
        return renderApprovalPathsTab();
      case 'users':
        return renderUserManagementTab();
      default:
        return renderOverviewTab();
    }
  };

  // Render overview tab content
  const renderOverviewTab = () => (
    <div className="analytics-section">
      <h2>Overview Dashboard</h2>
      <div className="dashboard-charts-container">
        <SubmissionsByCategoryChart data={submissionsByCategory} />
        <SubmissionsByStatusChart data={submissionsByStatus} />
        <SubmissionsTrendChart data={submissionsTrend} />
        <UserActivityChart data={userActivity} />
      </div>
    </div>
  );

  // Render research analytics tab content
  const renderResearchTab = () => (
    <div className="analytics-section">
      <h2>Research Analytics</h2>
      <div className="dashboard-charts-container">
        <PublicationTypesChart data={publicationTypes} />
        <ResearchImpactChart data={researchImpactMetrics} />
        <SDGDistributionChart data={sdgDistribution} />
      </div>
    </div>
  );

  // Render teaching analytics tab content
  const renderTeachingTab = () => (
    <div className="analytics-section">
      <h2>Teaching Analytics</h2>
      <div className="dashboard-charts-container">
        <CourseDistributionChart data={courseDistribution} />
        <TeachingPointsChart data={teachingPointsByTerm} />
        <AuthorshipDistributionChart data={authorshipDistribution} />
      </div>
    </div>
  );

  // Render service analytics tab content
  const renderServiceTab = () => (
    <div className="analytics-section">
      <h2>Service Analytics</h2>
      <div className="dashboard-charts-container">
        <ServiceTypeDistributionChart data={serviceTypeDistribution} />
        <ServiceByLevelChart data={serviceByLevel} />
        <ServiceTrendChart data={serviceTrend} />
      </div>
    </div>
  );

  // Render activity logs tab content
  const renderActivityLogsTab = () => (
    <div className="analytics-section">
      <h2>Activity Logs</h2>
      <div className="activity-logs-container">
        <div className="activity-log-filters">
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            value={logFilter} 
            onChange={(e) => setLogFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="research">Research</option>
            <option value="teaching">Teaching</option>
            <option value="service">Service</option>
            <option value="approval">Approvals</option>
            <option value="system">System</option>
          </select>
        </div>
        
        <table className="activity-logs-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Category</th>
              <th>Details</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map(log => (
              <tr key={log.id}>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>
                  <span className={`activity-category category-${log.category.toLowerCase()}`}>
                    {log.category}
                  </span>
                </td>
                <td>{log.details}</td>
                <td>{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // State to control form visibility
  const [showApprovalPathForm, setShowApprovalPathForm] = useState(false);

  // Render approval paths tab content
  const renderApprovalPathsTab = () => (
    <div className="analytics-section">
      <h2>Approval Paths Management</h2>
      <div className="approval-paths-container">
        <div className="section-actions">
          <button 
            className="btn-primary"
            onClick={() => {
              setEditingPathId(null);
              setFormState(initialFormState);
              setShowLevelsForPathId(null);
              setShowApprovalPathForm(true); // Show the form when clicking Create
            }}
          >
            <FaPlus /> Create New Approval Path
          </button>
        </div>

        {/* Only show the form when creating a new path or editing an existing one */}
        {(showApprovalPathForm || editingPathId !== null) && (
          <div className="approval-path-form">
            <h3>{editingPathId !== null ? 'Edit Approval Path' : 'Create New Approval Path'}</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pathName">Path Name</label>
                <input
                  type="text"
                  id="pathName"
                  name="pathName"
                  value={formState.pathName}
                  onChange={handleFormFieldChange}
                  placeholder="e.g., Faculty Research Approval Path"
                />
              </div>
              <div className="form-group">
                <label htmlFor="roleRankId">Applies to Role</label>
                <select
                  id="roleRankId"
                  name="roleRankId"
                  value={formState.roleRankId}
                  onChange={handleFormFieldChange}
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="college">College (optional)</label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formState.college}
                  onChange={handleFormFieldChange}
                  placeholder="e.g., CAS"
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department (optional)</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formState.department}
                  onChange={handleFormFieldChange}
                  placeholder="e.g., Computer Science"
                />
              </div>
            </div>

            <h4>Approval Levels</h4>
            <table className="approval-level-table">
              <thead>
                <tr>
                  <th>Level Order</th>
                  <th>Approver Role</th>
                  <th>Scope</th>
                  <th>Deadline (days)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formState.levels.map((level, index) => (
                  <tr key={index}>
                    <td>{level.levelOrder}</td>
                    <td>
                      <select
                        value={level.roleRankId}
                        onChange={(e) =>
                          handleLevelChange(index, 'roleRankId', e.target.value)
                        }
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={level.scope}
                        onChange={(e) =>
                          handleLevelChange(index, 'scope', e.target.value)
                        }
                      >
                        {scopes.map((scope) => (
                          <option key={scope} value={scope}>
                            {scope.charAt(0).toUpperCase() + scope.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={level.deadlineDays}
                        onChange={(e) =>
                          handleLevelChange(index, 'deadlineDays', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="btn-icon"
                        onClick={() => removeLevel(index)}
                        disabled={formState.levels.length <= 1}
                      >
                        <FaMinus />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn-secondary" onClick={addLevel}>
              <FaPlus /> Add Level
            </button>

            <div className="form-actions">
              <button className="btn-primary" onClick={handleSubmit}>
                <FaSave /> {editingPathId ? 'Update' : 'Create'} Approval Path
              </button>
              <button className="btn-secondary" onClick={cancelEdit}>
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        )}

        <h3>Existing Approval Paths</h3>
        {approvalPaths.map((path) => (
          <div key={path.id} className="approval-path-card">
            <div
              className="approval-path-header"
              onClick={() => toggleShowLevels(path.id)}
            >
              <div className="approval-path-title">
                {path.pathName}
                <span className="path-meta">
                  {' '}
                  ({roles.find((r) => r.id === path.roleRankId)?.name})
                  {path.college && ` - ${path.college}`}
                  {path.department && ` - ${path.department}`}
                </span>
              </div>
              <div className="approval-path-actions">
                <button
                  className="btn-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(path.id);
                    // Hide the levels view when editing
                    setShowLevelsForPathId(null);
                    // Set editingPathId to enable edit form
                    setEditingPathId(path.id);
                    // Show the form when editing
                    setShowApprovalPathForm(true);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(path.id);
                  }}
                >
                  <FaTrash />
                </button>
                {showLevelsForPathId === path.id ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
            </div>
            {showLevelsForPathId === path.id && (
              <div className="approval-path-details">
                <table className="approval-level-table">
                  <thead>
                    <tr>
                      <th>Level Order</th>
                      <th>Approver Role</th>
                      <th>Scope</th>
                      <th>Deadline (days)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {path.levels.map((level) => (
                      <tr key={level.levelOrder}>
                        <td>{level.levelOrder}</td>
                        <td>
                          {roles.find((r) => r.id === level.roleRankId)?.name}
                        </td>
                        <td>
                          {level.scope.charAt(0).toUpperCase() +
                            level.scope.slice(1)}
                        </td>
                        <td>{level.deadlineDays} days</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Render user management tab content
  const renderUserManagementTab = () => (
    <div className="analytics-section">
      <h2>User Management</h2>
      <div className="user-management-container">
        <div className="user-management-header">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="user-management-actions">
            <button className="btn-primary">
              <FaPlus /> Add User
            </button>
            <button className="btn-secondary">
              <FaDownload /> Export Users
            </button>
          </div>
        </div>
        
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select 
                    className="user-role-select"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="Faculty">Faculty</option>
                    <option value="Admin">Admin</option>
                    <option value="Department Head">Department Head</option>
                    <option value="Dean">Dean</option>
                    <option value="Vice Chancellor">Vice Chancellor</option>
                    <option value="Chancellor">Chancellor</option>
                  </select>
                </td>
                <td>{user.department}</td>
                <td>
                  <span className={`user-status status-${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.lastActive}</td>
                <td>
                  <button 
                    className="btn-icon"
                    onClick={() => toggleUserStatus(user.id)}
                    title={user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                  >
                    {user.status === 'Active' ? <FaTimesCircle /> : <FaCheckCircle />}
                  </button>
                  <button className="btn-icon" title="Edit User">
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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
            <button className="dismiss-alert" onClick={dismissAlert}>
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
            <div className="export-dropdown">
              <button className="action-button">
                <FaDownload /> Export Data
              </button>
              <div className="export-dropdown-content">
                <button onClick={() => handleExportData('excel')}>Excel</button>
                <button onClick={() => handleExportData('csv')}>CSV</button>
                <button onClick={() => handleExportData('pdf')}>PDF</button>
              </div>
            </div>
            <button className="action-button">
              <FaFilter /> Filter
            </button>
            <button className="action-button">
              <FaSearch /> Search
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="dashboard-tabs">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => {
              setActiveTab('overview');
              setActiveSubTab('summary');
            }}
          >
            <FaChartBar /> Overview
          </button>
          <button
            className={activeTab === 'research' ? 'active' : ''}
            onClick={() => {
              setActiveTab('research');
              setActiveSubTab('publications');
            }}
          >
            <FaUserGraduate /> Research Analytics
          </button>
          <button
            className={activeTab === 'teaching' ? 'active' : ''}
            onClick={() => {
              setActiveTab('teaching');
              setActiveSubTab('courses');
            }}
          >
            <FaBook /> Teaching Analytics
          </button>
          <button
            className={activeTab === 'service' ? 'active' : ''}
            onClick={() => {
              setActiveTab('service');
              setActiveSubTab('university');
            }}
          >
            <FaHandsHelping /> Service Analytics
          </button>
          <button
            className={activeTab === 'logs' ? 'active' : ''}
            onClick={() => {
              setActiveTab('logs');
              setActiveSubTab('all');
            }}
          >
            <FaHistory /> Activity Logs
          </button>
          <button
            className={activeTab === 'approvals' ? 'active' : ''}
            onClick={() => {
              setActiveTab('approvals');
              setActiveSubTab('paths');
            }}
          >
            <FaClipboardList /> Approval Paths
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => {
              setActiveTab('users');
              setActiveSubTab('manage');
            }}
          >
            <FaUsers /> User Management
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {renderDashboardContent()}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default EnhancedAdminDashboard;
