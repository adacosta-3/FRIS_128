import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area
} from 'recharts';

// Overview Charts
export const SubmissionsByCategoryChart = ({ data }) => (
  <div className="chart-container">
    <h3>Submissions by Category</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} entries`, 'Count']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const SubmissionsByStatusChart = ({ data }) => (
  <div className="chart-container">
    <h3>Submissions by Status</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} entries`, 'Count']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const SubmissionsTrendChart = ({ data }) => (
  <div className="chart-container">
    <h3>Submissions Trend</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="research" stroke="#0088FE" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="teaching" stroke="#FFBB28" />
        <Line type="monotone" dataKey="service" stroke="#FF8042" />
        <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const UserActivityChart = ({ data }) => (
  <div className="chart-container">
    <h3>User Activity</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="submissions" fill="#0088FE" />
        <Bar dataKey="approvals" fill="#4CAF50" />
        <Bar dataKey="rejections" fill="#F44336" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Research Analytics Charts
export const PublicationTypesChart = ({ data }) => (
  <div className="chart-container">
    <h3>Publication Types</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={150} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#0088FE" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const SDGDistributionChart = ({ data }) => (
  <div className="chart-container">
    <h3>SDG Distribution in Research</h3>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#00C49F" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const ResearchImpactChart = ({ data }) => (
  <div className="chart-container">
    <h3>Research Impact Metrics</h3>
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Current Year" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="Previous Year" dataKey="previousValue" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        <Legend />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

// Teaching Analytics Charts
export const CourseDistributionChart = ({ data }) => (
  <div className="chart-container">
    <h3>Course Distribution</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} courses`, 'Count']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const TeachingPointsChart = ({ data }) => (
  <div className="chart-container">
    <h3>Teaching Points by Term</h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="term" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="undergraduate" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="graduate" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const AuthorshipDistributionChart = ({ data }) => (
  <div className="chart-container">
    <h3>Teaching Materials Authorship</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#FFBB28" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Service Analytics Charts
export const ServiceTypeDistributionChart = ({ data }) => (
  <div className="chart-container">
    <h3>Service Type Distribution</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} activities`, 'Count']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const ServiceByLevelChart = ({ data }) => (
  <div className="chart-container">
    <h3>Service by Level</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="level" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#FF8042" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const ServiceTrendChart = ({ data }) => (
  <div className="chart-container">
    <h3>Service Activity Trend</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="university" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="professional" stroke="#82ca9d" />
        <Line type="monotone" dataKey="community" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
