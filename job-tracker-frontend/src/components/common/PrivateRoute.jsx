import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../ui/Loader';

const PrivateRoute = () => {
    const { currentUser, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) {
        return <Loader />;
    }

    if (!currentUser) {
        // Redirect to login page but save the location they were trying to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If authenticated, render the child routes
    return <Outlet />;
};

export default PrivateRoute;