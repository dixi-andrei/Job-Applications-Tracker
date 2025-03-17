import axios from '../utils/axiosConfig';

const DOCUMENTS_API_URL = '/api/documents';

// Convert to named exports
export const createDocument = async (documentData) => {
    try {
        const response = await axios.post(DOCUMENTS_API_URL, documentData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getDocumentById = async (id) => {
    try {
        const response = await axios.get(`${DOCUMENTS_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getDocumentsByJobApplication = async (jobApplicationId) => {
    try {
        const response = await axios.get(`${DOCUMENTS_API_URL}/job-application/${jobApplicationId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getDocumentsByType = async (jobApplicationId, documentType) => {
    try {
        const response = await axios.get(`${DOCUMENTS_API_URL}/job-application/${jobApplicationId}/type/${documentType}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getAllUserDocuments = async () => {
    try {
        const response = await axios.get(`${DOCUMENTS_API_URL}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getAllUserDocumentsByType = async (documentType) => {
    try {
        const response = await axios.get(`${DOCUMENTS_API_URL}/all/type/${documentType}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateDocument = async (id, documentData) => {
    try {
        const response = await axios.put(`${DOCUMENTS_API_URL}/${id}`, documentData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteDocument = async (id) => {
    try {
        await axios.delete(`${DOCUMENTS_API_URL}/${id}`);
        return true;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Keep the default export for backward compatibility
export default {
    createDocument,
    getDocumentById,
    getDocumentsByJobApplication,
    getDocumentsByType,
    getAllUserDocuments,
    getAllUserDocumentsByType,
    updateDocument,
    deleteDocument
};