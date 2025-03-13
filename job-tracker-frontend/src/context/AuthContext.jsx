// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getCurrentUser, logoutUser } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is already logged in
        const checkAuthStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const user = await getCurrentUser();
                    setCurrentUser(user);
                }
            } catch (err) {
                console.error('Authentication check failed:', err);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginUser(credentials);
            localStorage.setItem('token', response.token);
            setCurrentUser(response.user);
            return response.user;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const user = await registerUser(userData);
            return user;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('token');
            setCurrentUser(null);
        }
    };

    const updateUserState = (userData) => {
        setCurrentUser(userData);
    };

    const value = {
        currentUser,
        loading,
        error,
        login,
        register,
        logout,
        updateUserState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};