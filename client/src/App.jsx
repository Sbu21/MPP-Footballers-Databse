import './css/App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { initialCars } from './utils/utils';
import { useState, useEffect } from 'react';
import carService from './utils/carService';

import Home from './components/Home';
import CarList from './components/CarList';
import CarItem from './components/CarItem';
import CarDetails from './components/CarDetails';
import CarAddForm from './components/CarAddForm';
import CarEditForm from './components/CarEditForm';


export default function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const fetchedCars = await carService.getAllCars();
      setCars(fetchedCars);
    }
    fetchCars();
  }, []);

  const removeCar = async (id) => {
    await carService.deleteCar(id);
    setCars(prevCars => prevCars.filter(car => car.id !== id));
  };

  const addCar = async (car) => {
    const newCar = await carService.addCar(car);
    setCars(prevCars => [...prevCars, newCar]);
  }

  const updateCar = async (id, newCar) => {
    await carService.updateCar(id, newCar);
    setCars(prevCars => {
      prevCars.map((car) => (car.id === id ? {...car, ...newCar} : car));
    });
  } 
  
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
    setCars(prevCars => prevCars.filter(car => !selectedCars.includes(car.id)));
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


