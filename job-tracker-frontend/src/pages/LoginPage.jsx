import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="auth-page login-page">
            <div className="auth-container">
                <h1>Welcome Back</h1>
                <p>Log in to continue tracking your job applications</p>
                <Login />
            </div>
        </div>
    );
};

export default LoginPage;