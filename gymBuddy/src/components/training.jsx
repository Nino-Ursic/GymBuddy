import React, { useState, useEffect } from "react";
import "./home.css";
import TrainingItem from "./trainingItem.jsx";
import { getTraining, getUser } from "../config/firebase-config";
import { auth } from '../config/firebase-config.js';

function Training() {
  const [training, setTraining] = useState([]);  // Original exercises
  const [filteredTraining, setFilteredTraining] = useState([]);  // Filtered exercises
  const [kategorija, setKategorija] = useState(""); 
  const [difficulty, setDifficulty] = useState(""); // Selected difficulty
  const [duration, setDuration] = useState(0);
  const [userFavourites, setUserFavourites] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        setIsLoading(false);
      });
  
      // Cleanup the listener when the component is unmounted
      return () => unsubscribe();
    }, []);

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const ex = await getTraining();
        setTraining(ex);
        setFilteredTraining(ex); // Initially set filteredExercises to all exercises
      } catch (error) {
        console.error("Error fetching training:", error);
      }
    };

    fetchTraining();

    const fetchUser = async () => {
      try {
        const user = await getUser();
        console.log(user);
        console.log(user.favourite);
        setUserFavourites(user.favourite);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();

  }, []);

  useEffect(() => {
    let filteredItems = training;

    
      filteredItems = filteredItems.filter( (item) =>{
        if(item.userId){
          return(item.userId == auth.currentUser?.uid);
        }else{
          return true;
        }
      })
    

    if (kategorija) {
      filteredItems = filteredItems.filter(
        (item) => {
           return (item.muscleGroup === kategorija || item.muscleGroup.includes('all') || item.muscleGroup.includes(kategorija));
        }
      );
    }

    if (difficulty) {
      filteredItems = filteredItems.filter(
        (item) => item.difficulty === difficulty
      );
    }

    if (duration) {
      if(duration == 0){
        filteredItems = filteredItems
      }else{
      filteredItems = filteredItems.filter(
        (item) => item.duration <= duration
      );
    }}

    setFilteredTraining(filteredItems); // Update filtered exercises
  }, [kategorija, difficulty, training, duration]); // This effect runs when filters or exercises change

  return (
    <>
      <div className="filter-container spacing">
        <label htmlFor="category-select" className="filter-label">
          Filter by Category:
        </label>
        <select
          id="category-select"
          className="filter-dropdown"
          value={kategorija}
          onChange={(e) => setKategorija(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="biceps">Biceps</option>
          <option value="back">Back</option>
          <option value="legs">Legs</option>
          <option value="chest">Chest</option>
          <option value="triceps">Triceps</option>
          <option value="calves">Calves</option>
          <option value="shoulders">Shoulders</option>
          <option value="glutes">Glutes</option>
          <option value="abdominals">Abdominals</option>
          <option value="quadriceps">Quadriceps</option>
          <option value="forearms">Forearms</option>
          <option value="obliques">Obliques</option>
          <option value="hamstrings">Hamstrings</option>
        </select>
      </div>
      <div className="filter-container">
        <label htmlFor="difficulty-select" className="filter-label">
          Filter by Difficulty:
        </label>
        <select
          id="difficulty-select"
          className="filter-dropdown"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy Difficulty</option>
          <option value="medium">Medium Difficulty</option>
          <option value="hard">Hard Difficulty</option>
        </select>
      </div>
      <div className="filter-container">
        <label htmlFor="duration-input" className="filter-label">
          Duration (in minutes):
        </label>
        <input
          id="duration-input"
          type="number"
          name="duration"
          className="filter-dropdown"
          value={duration}
          onChange={(e)=> setDuration(e.target.value)}
          min="0"
        />
      </div>
      <div className="home-container">
        {filteredTraining.map((training) => (
          <TrainingItem
            key={training.id || training.name} // Use unique key
            trainingName={training.name}
            difficulty={training.difficulty}
            muscleGroup={training.muscleGroup}
            duration={training.duration}
            description={training.description}
            favourites={userFavourites}
            exercises={training.exercises}
          />
        ))}
      </div>
    </>
  );
}

export default Training;