import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ResearchActivities from './components/ResearchActivities';
import TeachingActivities from './components/TeachingActivities';
import PublicService from './components/PublicService';
import Notifications from './components/Notifications';
import MyRequests from './components/MyRequests';
import EditBiography from './components/EditBiography';
import AddEntryForm from './components/AddEntryForm';
import MultipleAddForm from './components/MultipleAddForm';
import AddSingleEntryToMultipleForm from './components/MultipleAddEntryForm';
import ApprovalTasks from './components/ApprovalTasks';
import GoogleScholarLinking from './components/GoogleScholarLinking';
import AdminDashboard from './components/AdminDashboard';
import RequestApprovalView from './components/RequestApprovalView';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (email) => {
    setUsername(email.split('@')[0]);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              isLoggedIn ? 
                <Navigate to="/home" /> : 
                <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/home" 
            element={
              isLoggedIn ? 
                <Home username={username} onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/research" 
            element={
              isLoggedIn ? 
                <ResearchActivities onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/research/single-publication" 
            element={
              isLoggedIn ? 
                <div>Single Publication Form</div> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/research/multiple-publications" 
            element={
              isLoggedIn ? 
                <div>Multiple Publications Form</div> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/research/google-scholar" 
            element={
              isLoggedIn ? 
                <GoogleScholarLinking onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/teaching" 
            element={
              isLoggedIn ? 
                <TeachingActivities onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/public" 
            element={
              isLoggedIn ? 
                <PublicService onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/notifications" 
            element={
              isLoggedIn ? 
                <Notifications onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/requests" 
            element={
              isLoggedIn ? 
                <MyRequests onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/edit-biography" 
            element={
              isLoggedIn ? 
                <EditBiography onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/add-entry" 
            element={
              isLoggedIn ? 
                <AddEntryForm onLogout={handleLogout} isMultiple={false} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/add-multiple-entries" 
            element={
              isLoggedIn ? 
                <MultipleAddForm onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/multiple-add" 
            element={
              isLoggedIn ? 
                <MultipleAddForm onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/multiple-add-entry" 
            element={
              isLoggedIn ? 
                <AddSingleEntryToMultipleForm onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/approval-tasks" 
            element={
              isLoggedIn ? 
                <ApprovalTasks onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/approval-tasks/view/:requestId" 
            element={
              isLoggedIn ? 
                <RequestApprovalView onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/admin" 
            element={
              isLoggedIn ? 
                <AdminDashboard onLogout={handleLogout} /> : 
                <Navigate to="/" />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
