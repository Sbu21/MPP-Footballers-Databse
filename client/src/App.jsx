import './css/App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { initialCars } from './utils/utils';
import { useState, useEffect } from 'react';
import carService from './utils/carService';
import axios from 'axios';
import useCarStore from './utils/carStore';

import Home from './components/Home';
import CarList from './components/CarList';
import CarItem from './components/CarItem';
import CarDetails from './components/CarDetails';
import CarAddForm from './components/CarAddForm';
import CarEditForm from './components/CarEditForm';


axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.log('Network error, retrying...');
      console.log(error);
      alert(error.message);
      await new Promise(resolve => setTimeout(resolve, 3000));
      return axios(error.config);
    } else {
      console.error('Error:', error);
      alert(error.message);
      return Promise.reject(error);
    }
  }
);

export default function App() {
  const [cars, setCars] = useState([]);
  //const cars = useCarStore(state => state.cars); 
  //const setCars = useCarStore(state => state.setCars);

  useEffect(() => {
    const fetchCars = async () => {
      const fetchedCars = await carService.getAllCars();
      setCars(fetchedCars);
    }
    fetchCars();
  }, []);

  const addCar = async (car) => {
    console.log(car);
    const newCar = await carService.addCar(car);
    setCars(prevCars => [...prevCars, newCar]);
  }

  const updateCar = async (id, newCar) => {
    await carService.updateCar(id, newCar);
    setCars(prevCars => {
      prevCars.map((car) => (car._id === id ? {...car, ...newCar} : car));
    });
  } 

  const removeCar = async (id) => {
    await carService.deleteCar(id);
    setCars(prevCars => prevCars.filter(car => car._id !== id));
  };
  
  const sortCars = () => {
    const sortedCars = [...cars];
    sortedCars.sort((a, b) => {
        const makeA = a.make.toLowerCase();
        const makeB = b.make.toLowerCase();
        if (makeA < makeB) return -1;
        if (makeA > makeB) return 1;
        return 0;
    });
    setCars(sortedCars);
  }

  const deleteSelected = (selectedCars) => {
    selectedCars.forEach(async (id) => {
      await carService.deleteCar(id);
    });
    setCars(prevCars => prevCars.filter(car => !selectedCars.includes(car._id)));
  }

  return (
    <Router>
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cars' element={<CarList cars={cars} sortCars={sortCars} deleteSelected={deleteSelected}/>} />
          <Route path='/cars/details/:id' element={<CarDetails cars={cars} removeCar={removeCar}/>}/>
          <Route path='/cars/edit/:id' element={<CarEditForm cars={cars} updateCar={updateCar}/>}/>
          <Route path='/cars/add' element={<CarAddForm cars={cars} addCar={addCar}/>}/>
        </Routes>
      </div>
    </Router>
  );
}


