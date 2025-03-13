import axios from '../utils/axiosConfig';

const DOCUMENTS_API_URL = '/api/documents';

const documentApi = {
    createDocument: async (documentData) => {
        try {
            const response = await axios.post(DOCUMENTS_API_URL, documentData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getDocumentById: async (id) => {
        try {
            const response = await axios.get(`${DOCUMENTS_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getDocumentsByJobApplication: async (jobApplicationId) => {
        try {
            const response = await axios.get(`${DOCUMENTS_API_URL}/job-application/${jobApplicationId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getDocumentsByType: async (jobApplicationId, documentType) => {
        try {
            const response = await axios.get(`${DOCUMENTS_API_URL}/job-application/${jobApplicationId}/type/${documentType}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAllUserDocuments: async () => {
        try {
            const response = await axios.get(`${DOCUMENTS_API_URL}/all`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAllUserDocumentsByType: async (documentType) => {
        try {
            const response = await axios.get(`${DOCUMENTS_API_URL}/all/type/${documentType}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateDocument: async (id, documentData) => {
        try {
            const response = await axios.put(`${DOCUMENTS_API_URL}/${id}`, documentData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteDocument: async (id) => {
        try {
            await axios.delete(`${DOCUMENTS_API_URL}/${id}`);
            return true;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default documentApi;