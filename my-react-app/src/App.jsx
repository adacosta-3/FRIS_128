import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ResearchActivities from './components/ResearchActivities';
import TeachingActivities from './components/TeachingActivities';
import PublicService from './components/PublicService';
import Notifications from './components/Notifications';
import MyRequests from './components/MyRequests';
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
                <div>Google Scholar Integration</div> : 
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
