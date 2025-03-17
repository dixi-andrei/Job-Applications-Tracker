import axios from '../utils/axiosConfig';

const INTERVIEWS_API_URL = '/api/interviews';

export const createInterview = async (interviewData) => {
    try {
        const response = await axios.post(INTERVIEWS_API_URL, interviewData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getInterviewById = async (id) => {
    try {
        const response = await axios.get(`${INTERVIEWS_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getInterviewsByJobApplication = async (jobApplicationId) => {
    try {
        const response = await axios.get(`${INTERVIEWS_API_URL}/job-application/${jobApplicationId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getUpcomingInterviews = async () => {
    try {
        const response = await axios.get(`${INTERVIEWS_API_URL}/upcoming`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getInterviewsInDateRange = async (start, end) => {
    try {
        const response = await axios.get(
            `${INTERVIEWS_API_URL}/date-range?start=${start.toISOString()}&end=${end.toISOString()}`
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateInterview = async (id, interviewData) => {
    try {
        const response = await axios.put(`${INTERVIEWS_API_URL}/${id}`, interviewData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const markInterviewAsCompleted = async (id) => {
    try {
        const response = await axios.put(`${INTERVIEWS_API_URL}/${id}/complete`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteInterview = async (id) => {
    try {
        await axios.delete(`${INTERVIEWS_API_URL}/${id}`);
        return true;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export default {
    createInterview,
    getInterviewById,
    getInterviewsByJobApplication,
    getUpcomingInterviews,
    getInterviewsInDateRange,
    updateInterview,
    markInterviewAsCompleted,
    deleteInterview,
};