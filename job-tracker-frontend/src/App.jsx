import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/SlideBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import JobApplicationsPage from './pages/JobApplicationsPage';
import JobApplicationDetailPage from './pages/JobApplicationDetailPage';
import CompaniesPage from './pages/CompaniesPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import DocumentsPage from './pages/DocumentsPage';
import InterviewsPage from './pages/InterviewsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/index.css';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Router>
                    <div className="app">
                        <Header />
                        <div className="main-container">
                            <Sidebar />
                            <main className="content">
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/register" element={<RegisterPage />} />
                                    <Route path="/dashboard" element={
                                        <PrivateRoute>
                                            <DashboardPage />
                                        </PrivateRoute>
                                    } />
                                    <Route path="/applications" element={
                                        <PrivateRoute>
                                            <JobApplicationsPage />
                                        </PrivateRoute>
                                    } />
                                    <Route path="/applications/:id" element={
                                        <PrivateRoute>
                                            <JobApplicationDetailPage />
                                        </PrivateRoute>
                                    } />
                                    <Route path="/companies" element={
                                        <PrivateRoute>
                                            <CompaniesPage />
                                        </PrivateRoute>
                                    } />
                                    <Route path="/companies/:id" element={
                                        <PrivateRoute>
                                            <CompanyDetailPage />
                                        </PrivateRoute>
                                    } />
                                    <Route path="/documents" element={
                                        <PrivateRoute>
                                            <DocumentsPage />
                                        </PrivateRoute>
                                    } />
                                    <Route path="/interviews" element={
                                        <PrivateRoute>
                                            <InterviewsPage />
                                        </PrivateRoute>
                                    } />
                                    <Route path="/settings" element={
                                        <PrivateRoute>
                                            <SettingsPage />
                                        </PrivateRoute>
                                    } />
                                    <Route path="*" element={<NotFoundPage />} />
                                </Routes>
                            </main>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;