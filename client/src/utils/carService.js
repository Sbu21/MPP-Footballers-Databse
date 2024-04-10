import axios from "axios";

const BASE_URL = 'http://localhost:8800/cars';

const carService = {
    getAllCars: async () => {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching cars', error);
            throw error;
        }       
    },
    getCarById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
          } catch (error) {
            console.error('Error fetching car by id:', error);
            throw error;
          }
    },
    addCar: async (carData) => {
        try {
            const response = await axios.post(BASE_URL, carData);
            return response.data;
          } catch (error) {
            console.error('Error adding car:', error);
            useCarStore.getState().addCar(carData);
            throw error;
        }
    },
    updateCar: async (id, carData) => {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, carData);
            return response.data;
          } catch (error) {
            console.error('Error updating car:', error);
            throw error;
          }
    },
    deleteCar: async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
        } catch (error) {
            console.error('Error deleting car:', error);
            throw error;
        }
    }
};

export default carService;
