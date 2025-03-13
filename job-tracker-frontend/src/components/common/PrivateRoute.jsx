import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a proper loading spinner component
    }

    return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;