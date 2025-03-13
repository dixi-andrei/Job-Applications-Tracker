import axios from '../utils/axiosConfig';

const JOB_APPLICATIONS_API_URL = '/api/job-applications';

const jobApplicationApi = {
    createJobApplication: async (jobApplicationData) => {
        try {
            const response = await axios.post(JOB_APPLICATIONS_API_URL, jobApplicationData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getJobApplicationById: async (id) => {
        try {
            const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAllJobApplications: async () => {
        try {
            const response = await axios.get(JOB_APPLICATIONS_API_URL);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getJobApplicationsByStatus: async (status) => {
        try {
            const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/status/${status}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    searchJobApplicationsByCompany: async (companyName) => {
        try {
            const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/search?companyName=${companyName}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    searchJobApplicationsByPosition: async (positionTitle) => {
        try {
            const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/search?positionTitle=${positionTitle}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getRecentJobApplications: async (limit = 5) => {
        try {
            const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/recent?limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getJobApplicationsAfterDate: async (date) => {
        try {
            // Format date to ISO format for API call
            const formattedDate = date instanceof Date ? date.toISOString().split('T')[0] : date;
            const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/date?date=${formattedDate}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getJobApplicationsWithUpcomingInterviews: async () => {
        try {
            const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/upcoming-interviews`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getApplicationStatusCounts: async () => {
        try {
            const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/status-counts`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateJobApplication: async (id, jobApplicationData) => {
        try {
            const response = await axios.put(`${JOB_APPLICATIONS_API_URL}/${id}`, jobApplicationData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateJobApplicationStatus: async (id, status) => {
        try {
            const response = await axios.patch(`${JOB_APPLICATIONS_API_URL}/${id}/status?status=${status}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteJobApplication: async (id) => {
        try {
            await axios.delete(`${JOB_APPLICATIONS_API_URL}/${id}`);
            return true;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default jobApplicationApi;