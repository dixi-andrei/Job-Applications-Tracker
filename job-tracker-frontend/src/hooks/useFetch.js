// src/hooks/useFetch.js
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

export const useFetch = (initialUrl = null, initialOptions = {}) => {
    const [url, setUrl] = useState(initialUrl);
    const [options, setOptions] = useState(initialOptions);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { logout } = useAuth();

    const fetchData = useCallback(async (fetchUrl = url, fetchOptions = options) => {
        if (!fetchUrl) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(fetchUrl, {
                ...fetchOptions,
                headers: {
                    ...fetchOptions.headers,
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // Unauthorized, logout user
                    logout();
                    throw new Error('Your session has expired. Please login again.');
                }
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [url, options, logout]);

    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [url, fetchData]);

    return { data, loading, error, fetchData, setUrl, setOptions };
};