import React, { useState, useEffect } from "react";
import "./home.css";
import TrainingPlanItem from "./trainingPlanItem.jsx";
import { getTrainingPlan, getUser } from "../config/firebase-config";
import { auth } from '../config/firebase-config.js';

function TrainingPlan() {
  const [trainingPlans, setTrainingPlans] = useState([]);  // Original exercises
  const [filteredTrainingPlans, setFilteredTrainingPlans] = useState([]);  // Filtered exercises
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
    const fetchTrainingPlans = async () => {
      try {
        const ex = await getTrainingPlan();
        setTrainingPlans(ex);
        setFilteredTrainingPlans(ex); // Initially set filteredExercises to all exercises
      } catch (error) {
        console.error("Error fetching training:", error);
      }
    };

    fetchTrainingPlans();

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
    let filteredItems = trainingPlans;

    
      filteredItems = filteredItems.filter( (item) =>{
        if(item.userId){
          return(item.userId == auth.currentUser?.uid);
        }else{
          return true;
        }
      })

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

    setFilteredTrainingPlans(filteredItems); // Update filtered exercises
  }, [ difficulty, trainingPlans, duration]); // This effect runs when filters or exercises change

  return (
    <>
      <div className="filter-container spacing">
        
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
          Duration (in days):
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
        {filteredTrainingPlans.map((trainingPlan) => (
          <TrainingPlanItem
            key={trainingPlan.id || trainingPlan.name} 
            description={trainingPlan.description}
            difficulty={trainingPlan.difficulty}
            duration={trainingPlan.duration}
            name={trainingPlan.name}
            favourites={userFavourites}
            trainings={trainingPlan.trainings}
          />
        ))}
      </div>
    </>
  );
}

export default TrainingPlan;