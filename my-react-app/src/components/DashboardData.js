// Mock data for dashboard visualizations

// Overview Data
export const submissionsByCategory = [
  { name: 'Research Publications', value: 32, color: '#0088FE' },
  { name: 'Other Research', value: 18, color: '#00C49F' },
  { name: 'Teaching Activities', value: 28, color: '#FFBB28' },
  { name: 'Public Service', value: 22, color: '#FF8042' }
];

export const submissionsByStatus = [
  { name: 'Approved', value: 65, color: '#4CAF50' },
  { name: 'Pending', value: 25, color: '#FFC107' },
  { name: 'Rejected', value: 10, color: '#F44336' }
];

export const submissionsTrend = [
  { name: 'Jan', research: 14, teaching: 8, service: 6, total: 28 },
  { name: 'Feb', research: 16, teaching: 10, service: 8, total: 34 },
  { name: 'Mar', research: 18, teaching: 12, service: 9, total: 39 },
  { name: 'Apr', research: 22, teaching: 15, service: 11, total: 48 },
  { name: 'May', research: 26, teaching: 18, service: 14, total: 58 },
  { name: 'Jun', research: 32, teaching: 22, service: 18, total: 72 }
];

export const userActivity = [
  { name: 'Mon', submissions: 15, approvals: 8, rejections: 2 },
  { name: 'Tue', submissions: 18, approvals: 12, rejections: 3 },
  { name: 'Wed', submissions: 25, approvals: 16, rejections: 4 },
  { name: 'Thu', submissions: 22, approvals: 14, rejections: 3 },
  { name: 'Fri', submissions: 28, approvals: 18, rejections: 5 },
  { name: 'Sat', submissions: 12, approvals: 7, rejections: 1 },
  { name: 'Sun', submissions: 8, approvals: 4, rejections: 1 }
];

// Research Analytics Data
export const publicationTypes = [
  { name: 'Journal Articles', value: 45 },
  { name: 'Conference Papers', value: 32 },
  { name: 'Book Chapters', value: 18 },
  { name: 'Books', value: 8 },
  { name: 'Technical Reports', value: 12 },
  { name: 'Other', value: 15 }
];

export const sdgDistribution = [
  { name: 'SDG 1', value: 8 },
  { name: 'SDG 2', value: 12 },
  { name: 'SDG 3', value: 24 },
  { name: 'SDG 4', value: 32 },
  { name: 'SDG 5', value: 18 },
  { name: 'SDG 6', value: 10 },
  { name: 'SDG 7', value: 15 },
  { name: 'SDG 8', value: 22 },
  { name: 'SDG 9', value: 28 },
  { name: 'SDG 10', value: 14 },
  { name: 'SDG 11', value: 16 },
  { name: 'SDG 12', value: 12 },
  { name: 'SDG 13', value: 20 },
  { name: 'SDG 14', value: 8 },
  { name: 'SDG 15', value: 10 },
  { name: 'SDG 16', value: 15 },
  { name: 'SDG 17', value: 18 }
];

export const researchImpactMetrics = [
  { metric: 'Citations', value: 85, previousValue: 70 },
  { metric: 'H-Index', value: 65, previousValue: 55 },
  { metric: 'Publications', value: 90, previousValue: 75 },
  { metric: 'Collaborations', value: 70, previousValue: 60 },
  { metric: 'Funding', value: 60, previousValue: 40 },
  { metric: 'Patents', value: 30, previousValue: 20 }
];

// Teaching Analytics Data
export const courseDistribution = [
  { name: 'Undergraduate', value: 65, color: '#8884d8' },
  { name: 'Graduate', value: 25, color: '#82ca9d' },
  { name: 'Special Topics', value: 10, color: '#ffc658' }
];

export const teachingPointsByTerm = [
  { term: '1st Sem 2023-2024', undergraduate: 18, graduate: 6 },
  { term: '2nd Sem 2023-2024', undergraduate: 21, graduate: 9 },
  { term: 'Summer 2024', undergraduate: 12, graduate: 3 },
  { term: '1st Sem 2024-2025', undergraduate: 24, graduate: 12 },
  { term: '2nd Sem 2024-2025', undergraduate: 27, graduate: 15 }
];

export const authorshipDistribution = [
  { type: 'Textbooks', count: 8 },
  { type: 'Modules', count: 15 },
  { type: 'Lab Manuals', count: 12 },
  { type: 'Course Packs', count: 20 },
  { type: 'Digital Materials', count: 25 }
];

// Service Analytics Data
export const serviceTypeDistribution = [
  { name: 'University Service', value: 45, color: '#8884d8' },
  { name: 'Professional Service', value: 30, color: '#82ca9d' },
  { name: 'Community Service', value: 15, color: '#ffc658' },
  { name: 'Government Service', value: 10, color: '#ff8042' }
];

export const serviceByLevel = [
  { level: 'Department', count: 28 },
  { level: 'College', count: 22 },
  { level: 'University', count: 15 },
  { level: 'National', count: 12 },
  { level: 'International', count: 8 }
];

export const serviceTrend = [
  { period: '2020', university: 12, professional: 8, community: 5 },
  { period: '2021', university: 15, professional: 10, community: 7 },
  { period: '2022', university: 18, professional: 12, community: 8 },
  { period: '2023', university: 22, professional: 15, community: 10 },
  { period: '2024', university: 25, professional: 18, community: 12 }
];

// Activity Logs
export const activityLogs = [
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

// User Management
export const usersList = [
  { id: 1, name: 'Kristine Joy Arellano', email: 'kjarellano@up.edu.ph', role: 'Faculty', department: 'Computer Science', status: 'Active', lastActive: '2025-05-25 14:32:45' },
  { id: 2, user: 'John Smith', email: 'jsmith@up.edu.ph', role: 'Admin', department: 'Computer Science', status: 'Active', lastActive: '2025-05-25 13:15:22' },
  { id: 3, user: 'Maria Garcia', email: 'mgarcia@up.edu.ph', role: 'Faculty', department: 'Mathematics', status: 'Active', lastActive: '2025-05-25 11:47:09' },
  { id: 4, user: 'Robert Johnson', email: 'rjohnson@up.edu.ph', role: 'Department Head', department: 'Physics', status: 'Active', lastActive: '2025-05-24 16:30:18' },
  { id: 5, user: 'Lisa Wong', email: 'lwong@up.edu.ph', role: 'Faculty', department: 'Chemistry', status: 'Active', lastActive: '2025-05-24 10:22:37' },
  { id: 6, user: 'Michael Brown', email: 'mbrown@up.edu.ph', role: 'Faculty', department: 'Biology', status: 'Inactive', lastActive: '2025-05-24 09:15:44' },
  { id: 7, user: 'Sarah Davis', email: 'sdavis@up.edu.ph', role: 'Faculty', department: 'Computer Science', status: 'Active', lastActive: '2025-05-23 15:40:12' },
  { id: 8, user: 'James Wilson', email: 'jwilson@up.edu.ph', role: 'Faculty', department: 'Statistics', status: 'Active', lastActive: '2025-05-23 14:05:29' }
];

// System Alerts
export const systemAlerts = [
  { id: 1, type: 'warning', message: 'High number of pending approvals (25)', timestamp: '2025-05-25 08:00:00' },
  { id: 2, type: 'info', message: 'System maintenance scheduled for May 30, 2025', timestamp: '2025-05-24 10:15:00' },
  { id: 3, type: 'error', message: 'Database synchronization failed', timestamp: '2025-05-23 14:22:33' },
  { id: 4, type: 'success', message: 'Backup completed successfully', timestamp: '2025-05-22 02:00:00' }
];

// Approval Paths
export const roles = [
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

export const initialApprovalPaths = [
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

export const scopes = ['department', 'college', 'university'];
