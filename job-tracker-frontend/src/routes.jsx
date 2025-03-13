import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import JobApplicationsPage from './pages/JobApplicationsPage';
import JobApplicationDetailPage from './pages/JobApplicationDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/applications" element={<JobApplicationsPage />} />
                <Route path="/applications/:id" element={<JobApplicationDetailPage />} />
                {/* Add more protected routes as needed */}
            </Route>

            {/* Catch all */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;