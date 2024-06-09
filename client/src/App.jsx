import './css/App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState, useEffect } from 'react';
import footballerService from './utils/footballerService.js';
import footballersStatsService from './utils/footballersStatsService.js';
import userService from './utils/userService.js';
import useFootballerStore from './store/footballerStore.js';
import axios from 'axios';
import * as db from './db/db.js';
import Dexie from 'dexie';

import Home from './components/Home';

import FootballerList from './components/FootballerList';
import FootballerDetails from './components/FootballerDetails';
import FootballerAddForm from './components/FootballerAddForm.jsx';
import FootballerEditForm from './components/FootballerEditForm';

import FootballerStatAddForm from './components/FootballerStatsAddForm.jsx';
import FootballerStatEditForm from './components/FootballersStatsEditForm.jsx';

import UserLoginForm from './components/UserLoginForm.jsx';
import UserRegisterForm from './components/UserRegisterForm.jsx';
import UserProfile from './components/UserProfile.jsx';
import VerificationPage from './components/VerificationPage.jsx';

export default function App() {
  const [footballers, setFootballers] = useState([]);
  const [backendDown, setBackendDown] = useState(true);
  const [sort, setSort] = useState('ascending');
  
  //infinite scroll
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchFootballers = async () => {
      try {
        const fetchedFootballers = await footballerService.getAllFootballers(currentPage, itemsPerPage);
        setFootballers([...footballers, ...fetchedFootballers]);
        setBackendDown(false);
      } catch(error) {
        console.error('Error fetching footballers', error);
        if(error.code === 'ERR_NETWORK') {
          setBackendDown(true);
        }
      }
    }
    fetchFootballers();
  }, [currentPage]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight - 100) {
      setCurrentPage(currentPage + 1);
    }
  }
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  useEffect(() => {
    const syncData = async () => {
      const databaseExists = await Dexie.exists('offlineDB');
      if (backendDown === false && databaseExists) {
        await db.syncDataWithBackend();
        await db.clearOfflineDb();
      } 
    }
    syncData();
  }, [backendDown])

  const addFootballer = async (footballer) => {
    try {
      const newFootballer = await footballerService.addFootballer(footballer);
      setFootballers(prevFootballers => [...prevFootballers, newFootballer]);
      setBackendDown(false);
    } catch(error) {
      console.error('Error adding footballer', error);
      if(error.code === 'ERR_NETWORK') {
        console.log('error adding footballer');
        setBackendDown(true);
        db.saveFootballersLocally(footballer, 'POST');
      }
    }
  }

  const updateFootballer = async (id, updatedFootballer) => {
    try {
      await footballerService.updateFootballer(id, updatedFootballer);
      setBackendDown(false);
    } catch(error) {
      console.error('Error updating footballer', error);
      if(error.code === 'ERR_NETWORK') {
        console.log('error updating footballer');
        setBackendDown(true);
        db.saveFootballersLocally({...updatedFootballer, _id: id}, 'PUT');
      }
    }
  } 

  const removeFootballer = async (id) => {
    try {
      await footballerService.deleteFootballer(id);
      setFootballers(prevFootballers => prevFootballers.filter(footballer => footballer._id !== id));
      setBackendDown(false);
    } catch(error) {
      console.error('Error removing footballer', error);
      setBackendDown(true);
    }
  };
  
  const sortFootballers = () => {
    debugger;
    const sortedFootballers = [...footballers];
    sortedFootballers.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
    setFootballers(sortedFootballers);
  }

  const deleteSelected = (selectedFootballers) => {
    selectedFootballers.forEach(async (id) => {
      await removeFootballer(id);
    });
    setFootballers(prevFootballers => prevFootballers.filter(footballer => !selectedFootballers.includes(footballer._id)));
  }

  const addFootballerStat = async (footballerId, newFootballerStat) => {
    try {
      await footballersStatsService.addFootballersStats(footballerId, newFootballerStat);
    } catch(error) {
      console.error('Error adding footballer stat', error);
    }
  }

  const updateFootballerStat = async (footballerId, id, updatedFootballerStat) => {
    try {
      await footballersStatsService.updateFootballersStats(footballerId, id, updatedFootballerStat);
    } catch(error) {
      console.error('Error adding footballer stat', error);
    }
  }

  const removeFootballerStat = async (footballerId, id) => {
    try {
      await footballersStatsService.deleteFootballersStats(footballerId, id);
    } catch(error) {
      console.error('Error adding footballer stat', error);
    }
  }

  const registerUser = async (userData) => {
    try {
      const emailToken = await userService.registerUser(userData);
      return emailToken;
      //setCurrentUser(currentUser);
    } catch(error) {
      console.error('Error registering user', error);
    }
  }

  const loginUser = async (userData) => {
    try {
      const currentUser = await userService.loginUser(userData);
      return currentUser;
      //setCurrentUser(currentUser);
    } catch(error) {
      console.error('Error logging in user', error);
    }
  }

  const logoutUser = async () => {
    try {
      await userService.logoutUser();
      //setCurrentUser(undefined);
    } catch(error) {
      console.error('Error logging out user', error);
    }
  }

  return (
    <Router>
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home logoutUser={logoutUser}/>} />
          <Route path='/login' element={<UserLoginForm loginUser={loginUser}/>}/>
          <Route path='/register' element={<UserRegisterForm registerUser={registerUser}/>}/>
          <Route path='/footballers' element={<FootballerList footballers={footballers} sortFootballers={sortFootballers} deleteSelected={deleteSelected}/>} />
          <Route path='/footballers/details/:id' element={<FootballerDetails removeFootballer={removeFootballer} removeFootballerStat={removeFootballerStat}/>}/>
          <Route path='/footballers/edit/:id' element={<FootballerEditForm footballers={footballers} updateFootballer={updateFootballer}/>}/>
          <Route path='/footballers/add' element={<FootballerAddForm addFootballer={addFootballer}/>}/>
          <Route path='/footballers/:id/footballersStats/add' element={<FootballerStatAddForm addFootballerStat={addFootballerStat}/>}/>
          <Route path='/footballers/:id/footballersStats/edit/:footballersStatsId' element={<FootballerStatEditForm updateFootballerStat={updateFootballerStat}/>}/>
          <Route path='/users/:id' element={<UserProfile/>}/>
          <Route path='/confirmation/:token' element={<VerificationPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}


