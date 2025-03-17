import axios from '../utils/axiosConfig';

const COMPANIES_API_URL = '/api/companies';

// Export individual functions as named exports
export const createCompany = async (companyData) => {
    try {
        const response = await axios.post(COMPANIES_API_URL, companyData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getCompanyById = async (id) => {
    try {
        const response = await axios.get(`${COMPANIES_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getAllCompanies = async () => {
    try {
        const response = await axios.get(`${COMPANIES_API_URL}/search`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const searchCompaniesByName = async (name) => {
    try {
        const response = await axios.get(`${COMPANIES_API_URL}?name=${name}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateCompany = async (id, companyData) => {
    try {
        const response = await axios.put(`${COMPANIES_API_URL}/${id}`, companyData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteCompany = async (id) => {
    try {
        await axios.delete(`${COMPANIES_API_URL}/${id}`);
        return true;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// You can still keep the default export if needed elsewhere
export default {
    createCompany,
    getCompanyById,
    getAllCompanies,
    searchCompaniesByName,
    updateCompany,
    deleteCompany
};