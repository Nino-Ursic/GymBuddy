import './App.css';
import Auth from './components/auth';
import Home from './components/home';
import History from './components/history';
import Settings from './components/settings';
import Training from './components/training';
import TrainingPlan from './components/trainingPlan';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';

import ProtectedRoute from './components/protectedRoute';

import { useState, useEffect } from 'react';
import {auth} from './config/firebase-config';


function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth/>} />
          <Route element={<Navbar/>}>
            <Route path='/home' element={<Home/>} />
            <Route path='/training' element={<Training />} />
            <Route path='/trainingPlan' element={<TrainingPlan />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/history' element={<History />} />
            </Route>
            <Route path='/settings' element={<Settings />} />
            <Route path='*' element={<h1>ERROR</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
