import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { initialCars } from './utils';
import { useState, useEffect } from 'react';

import Home from './Home';
import CarList from './CarList';
import CarItem from './CarItem';
import CarDetails from './CarDetails';
import CarAddForm from './CarAddForm';
import CarEditForm from './CarEditForm';


const getInitialData = () => {
  const data = JSON.parse(localStorage.getItem('MY_CAR_LIST'));
  if (!data) return [];
  return data;
};


export default function App() {
  const [cars, setCars] = useState(getInitialData);

  useEffect(() => {
    localStorage.setItem('MY_CAR_LIST', JSON.stringify(cars));
  }, [cars]);

  const removeCar = (id) => {
    setCars(prevCars => prevCars.filter(car => car.id !== id));
  };

  const addCar = (car) => {
    setCars(prevCars => {
      return [
        ...prevCars,
        {id:crypto.randomUUID(), make: car.make, model: car.model, year: car.year, price: car.price, image: car.image}
      ];
    });
  }

  const updateCar = (id, newCar) => {
    setCars(prevCars => {
      return prevCars.map(car => {
        if (car.id === id) {
          return {id, ...newCar};
        }
        else {
          return car;
        }
      })
    })
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


