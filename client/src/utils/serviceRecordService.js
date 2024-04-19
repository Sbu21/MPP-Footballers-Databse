import axios from "axios";

const BASE_URL = 'http://localhost:8800/cars/:id/serviceRecords';

const serviceRecordService = {
    getAllserviceRecordsForCar: async () => {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching service records', error);
            throw error;
        }       
    },
    getserviceRecordById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
          } catch (error) {
            console.error('Error fetching service record by id:', error);
            throw error;
          }
    },
    addServiceRecord: async (serviceRecordData) => {
        try {
            const response = await axios.post(BASE_URL, serviceRecordData);
            return response.data;
          } catch (error) {
            console.error('Error adding car:', error);
            throw error;
        }
    },
    updateServiceRecord: async (id, serviceRecordData) => {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, serviceRecordData);
            return response.data;
          } catch (error) {
            console.error('Error updating serviceRecord:', error);
            throw error;
          }
    },
    deleteServiceRecord: async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
        } catch (error) {
            console.error('Error deleting service record:', error);
            throw error;
        }
    }
}

export default serviceRecordService;