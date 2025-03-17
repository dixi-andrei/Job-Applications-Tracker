import React from 'react';
import { Navigate } from 'react-router-dom';
import Register from '../components/auth/Register';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="auth-page register-page">
            <div className="auth-container">
                <h1>Create Your Account</h1>
                <p>Start tracking your job applications today</p>
                <Register />
            </div>
        </div>
    );
};

export default RegisterPage;