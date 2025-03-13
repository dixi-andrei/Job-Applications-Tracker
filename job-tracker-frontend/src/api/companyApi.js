import axios from '../utils/axiosConfig';

const COMPANIES_API_URL = '/api/companies';

const companyApi = {
    createCompany: async (companyData) => {
        try {
            const response = await axios.post(COMPANIES_API_URL, companyData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getCompanyById: async (id) => {
        try {
            const response = await axios.get(`${COMPANIES_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAllCompanies: async () => {
        try {
            const response = await axios.get(`${COMPANIES_API_URL}/search`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    searchCompaniesByName: async (name) => {
        try {
            const response = await axios.get(`${COMPANIES_API_URL}?name=${name}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateCompany: async (id, companyData) => {
        try {
            const response = await axios.put(`${COMPANIES_API_URL}/${id}`, companyData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteCompany: async (id) => {
        try {
            await axios.delete(`${COMPANIES_API_URL}/${id}`);
            return true;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default companyApi;