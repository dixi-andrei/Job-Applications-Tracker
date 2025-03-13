import axios from '../utils/axiosConfig';

const INTERVIEWS_API_URL = '/api/interviews';

const interviewApi = {
    createInterview: async (interviewData) => {
        try {
            const response = await axios.post(INTERVIEWS_API_URL, interviewData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getInterviewById: async (id) => {
        try {
            const response = await axios.get(`${INTERVIEWS_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getInterviewsByJobApplication: async (jobApplicationId) => {
        try {
            const response = await axios.get(`${INTERVIEWS_API_URL}/job-application/${jobApplicationId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getUpcomingInterviews: async () => {
        try {
            const response = await axios.get(`${INTERVIEWS_API_URL}/upcoming`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getInterviewsInDateRange: async (start, end) => {
        try {
            const response = await axios.get(
                `${INTERVIEWS_API_URL}/date-range?start=${start.toISOString()}&end=${end.toISOString()}`
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateInterview: async (id, interviewData) => {
        try {
            const response = await axios.put(`${INTERVIEWS_API_URL}/${id}`, interviewData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    markInterviewAsCompleted: async (id) => {
        try {
            const response = await axios.put(`${INTERVIEWS_API_URL}/${id}/complete`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteInterview: async (id) => {
        try {
            await axios.delete(`${INTERVIEWS_API_URL}/${id}`);
            return true;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default interviewApi;