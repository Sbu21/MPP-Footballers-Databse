import axios from "axios";

const BASE_URL = 'http://localhost:8800/footballers';

const footballerService = {
    getAllFootballers: async (currentPage, limit) => {
        try {
            const response = await axios.get(`${BASE_URL}?page=${currentPage}&limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error;
        }       
    },
    getFootballerById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
          } catch (error) {
            throw error;
          }
    },
    addFootballer: async (footballerData) => {
        try {
            const response = await axios.post(BASE_URL, footballerData);
            return response.data;
          } catch (error) {
            throw error;
        }
    },
    updateFootballer: async (id, footballerData) => {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, footballerData);
            return response.data;
          } catch (error) {
            throw error;
          }
    },
    deleteFootballer: async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
        } catch (error) {
            throw error;
        }
    }
};

export default footballerService;
