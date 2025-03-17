import React, { createContext, useState, useEffect } from 'react';
import { login, getCurrentUser, register, updateUser } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchCurrentUser();
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchCurrentUser = async () => {
        try {
            setIsLoading(true);
            const userData = await getCurrentUser();
            setCurrentUser(userData);
            setError(null);
        } catch (err) {
            setError(err.message);
            localStorage.removeItem('token');
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            setIsLoading(true);
            const response = await login(credentials);
            localStorage.setItem('token', response.token);
            await fetchCurrentUser();
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setIsLoading(true);
            const response = await register(userData);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    const updateProfile = async (id, userData) => {
        try {
            setIsLoading(true);
            const updatedUser = await updateUser(id, userData);
            setCurrentUser(updatedUser);
            return updatedUser;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isLoading,
                error,
                login,
                register,
                logout,
                updateProfile,
                fetchCurrentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};