import axios from "axios";

const BASE_URL = 'http://localhost:8800/footballers/:id/footballersStats';

const footballersStatsService = {
    getAllFootballerStatsForFootballer: async (footballerId) => {
        try {
            const response = await axios.get(`http://localhost:8800/footballers/${footballerId}/footballersStats`);
            return response.data;
        } catch (error) {
            throw error;
        }       
    },
    getfootballersStatsById: async (footballerId, id) => {
        try {
            const response = await axios.get(`http://localhost:8800/footballers/${footballerId}/footballersStats/${id}`);
            return response.data;
          } catch (error) {
            throw error;
          }
    },
    addFootballersStats: async (footballerId, footballersStatsData) => {
        try {
            const response = await axios.post(`http://localhost:8800/footballers/${footballerId}/footballersStats`, footballersStatsData);
            return response.data;
          } catch (error) {
            throw error;
        }
    },
    updateFootballersStats: async (footballerId, id, footballersStatsData) => {
        try {
            const response = await axios.put(`http://localhost:8800/footballers/${footballerId}/footballersStats/${id}`, footballersStatsData);
            return response.data;
          } catch (error) {
            throw error;
          }
    },
    deleteFootballersStats: async (footballerId, id) => {
        try {
            await axios.delete(`http://localhost:8800/footballers/${footballerId}/footballersStats/${id}`);
        } catch (error) {
            throw error;
        }
    }
}

export default footballersStatsService;