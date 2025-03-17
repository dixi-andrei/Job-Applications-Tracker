import axios from '../utils/axiosConfig';

const JOB_APPLICATIONS_API_URL = '/api/job-applications';

// Convert to named exports
export const createJobApplication = async (jobApplicationData) => {
    try {
        const response = await axios.post(JOB_APPLICATIONS_API_URL, jobApplicationData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getJobApplicationById = async (id) => {
    try {
        const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getAllJobApplications = async () => {
    try {
        const response = await axios.get(JOB_APPLICATIONS_API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getJobApplicationsByStatus = async (status) => {
    try {
        const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/status/${status}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const searchJobApplicationsByCompany = async (companyName) => {
    try {
        const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/search?companyName=${companyName}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const searchJobApplicationsByPosition = async (positionTitle) => {
    try {
        const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/search?positionTitle=${positionTitle}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getRecentJobApplications = async (limit = 5) => {
    try {
        const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/recent?limit=${limit}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getJobApplicationsAfterDate = async (date) => {
    try {
        // Format date to ISO format for API call
        const formattedDate = date instanceof Date ? date.toISOString().split('T')[0] : date;
        const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/date?date=${formattedDate}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getJobApplicationsWithUpcomingInterviews = async () => {
    try {
        const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/upcoming-interviews`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getApplicationsStatusCounts = async () => {
    try {
        const response = await axios.get(`${JOB_APPLICATIONS_API_URL}/status-counts`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateJobApplication = async (id, jobApplicationData) => {
    try {
        const response = await axios.put(`${JOB_APPLICATIONS_API_URL}/${id}`, jobApplicationData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateJobApplicationStatus = async (id, status) => {
    try {
        const response = await axios.patch(`${JOB_APPLICATIONS_API_URL}/${id}/status?status=${status}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteJobApplication = async (id) => {
    try {
        await axios.delete(`${JOB_APPLICATIONS_API_URL}/${id}`);
        return true;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Keep the default export for backward compatibility
export default {
    createJobApplication,
    getJobApplicationById,
    getAllJobApplications,
    getJobApplicationsByStatus,
    searchJobApplicationsByCompany,
    searchJobApplicationsByPosition,
    getRecentJobApplications,
    getJobApplicationsAfterDate,
    getJobApplicationsWithUpcomingInterviews,
    getApplicationsStatusCounts,
    updateJobApplication,
    updateJobApplicationStatus,
    deleteJobApplication
};