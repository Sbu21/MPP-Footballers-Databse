import axios from "axios";

const BASE_URL = 'http://localhost:8800/cars';

const carService = {
    getAllCars: async () => {
        const response = await axios.get(BASE_URL);
        return response.data;
    },
    getCarById: async (id) => {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    },
    addCar: async (carData) => {
        const response = await axios.post(BASE_URL, carData);
        return response.data;
    },
    updateCar: async (id, carData) => {
        const response = await axios.put(`${BASE_URL}/${id}`, carData);
        return response.data;
    },
    deleteCar: async (id) => {
        await axios.delete(`${BASE_URL}/${id}`);
    }
};

export default carService;
