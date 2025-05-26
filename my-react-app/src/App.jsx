// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';

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
import GoogleScholarLink from './components/GoogleScholarLink';
import AdminDashboard from './components/AdminDashboard';
import RequestApprovalView from './components/RequestApprovalView';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function AppRoutes() {
    const { username, logout } = useAuth();

    return (
        <Routes>
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home username={username} onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/research"
                element={
                    <ProtectedRoute>
                        <ResearchActivities onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/research/single-publication"
                element={
                    <ProtectedRoute>
                        <div>Single Publication Form</div>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/research/multiple-publications"
                element={
                    <ProtectedRoute>
                        <div>Multiple Publications Form</div>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/research/google-scholar"
                element={
                    <ProtectedRoute>
                        <GoogleScholarLink onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/research/google-scholar/publications"
                element={
                    <ProtectedRoute>
                        <GoogleScholarLinking onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teaching"
                element={
                    <ProtectedRoute>
                        <TeachingActivities onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/public"
                element={
                    <ProtectedRoute>
                        <PublicService onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/notifications"
                element={
                    <ProtectedRoute>
                        <Notifications onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/requests"
                element={
                    <ProtectedRoute>
                        <MyRequests onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/edit-biography"
                element={
                    <ProtectedRoute>
                        <EditBiography onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/add-entry"
                element={
                    <ProtectedRoute>
                        <AddEntryForm onLogout={logout} isMultiple={false} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/add-multiple-entries"
                element={
                    <ProtectedRoute>
                        <MultipleAddForm onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/multiple-add"
                element={
                    <ProtectedRoute>
                        <MultipleAddForm onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/multiple-add-entry"
                element={
                    <ProtectedRoute>
                        <AddSingleEntryToMultipleForm onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/approval-tasks"
                element={
                    <ProtectedRoute>
                        <ApprovalTasks onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/approval-tasks/view/:requestId"
                element={
                    <ProtectedRoute>
                        <RequestApprovalView onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminDashboard onLogout={logout} />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function AppWrapper() {
    const { isLoggedIn } = useAuth();

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
                />
                <Route
                    path="/*"
                    element={isLoggedIn ? <AppRoutes /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppWrapper />
        </AuthProvider>
    );
}
