import axios from '../utils/axiosConfig';

const AUTH_API_URL = '/api/auth';

const authApi = {
    register: async (userData) => {
        try {
            const response = await axios.post(`${AUTH_API_URL}/register`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    login: async (credentials) => {
        try {
            const response = await axios.post(`${AUTH_API_URL}/login`, credentials);
            // Store token in localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    },

    getCurrentUser: async () => {
        try {
            const response = await axios.get(`${AUTH_API_URL}/me`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getUserById: async (id) => {
        try {
            const response = await axios.get(`${AUTH_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getUserByUsername: async (username) => {
        try {
            const response = await axios.get(`${AUTH_API_URL}/username/${username}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateUser: async (id, userData) => {
        try {
            const response = await axios.put(`${AUTH_API_URL}/${id}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteUser: async (id) => {
        try {
            await axios.delete(`${AUTH_API_URL}/${id}`);
            return true;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default authApi;