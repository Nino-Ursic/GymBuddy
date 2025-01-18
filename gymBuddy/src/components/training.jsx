import React, { useState, useEffect } from "react";
import "./home.css";
import TrainingItem from "./trainingItem.jsx";
import { getTraining, getUser } from "../config/firebase-config";
import { auth } from '../config/firebase-config.js';
import NewTraining from "./newTraining.jsx";

function Training() {
  const [training, setTraining] = useState([]);  // Original exercises
  const [filteredTraining, setFilteredTraining] = useState([]);  // Filtered exercises
  const [kategorija, setKategorija] = useState(""); 
  const [difficulty, setDifficulty] = useState(""); // Selected difficulty
  const [duration, setDuration] = useState(null);
  const [userFavourites, setUserFavourites] = useState(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        setIsLoading(false);
      });
  
      // Cleanup the listener when the component is unmounted
      return () => unsubscribe();
    }, []);

    const fetchTraining = async () => {
      try {
        const ex = await getTraining();

        const filtered = ex.filter( (item) =>{
          if(item.userId){
            return(item.userId == auth.currentUser?.uid);
          }else{
            return true;
          }
        })

        setTraining(filtered);
        setFilteredTraining(filtered); // Initially set filteredExercises to all exercises
      } catch (error) {
        console.error("Error fetching training:", error);
      }
    };

  useEffect(() => {
    fetchTraining();

    const fetchUser = async () => {
      try {
        const user = await getUser();
        setUserFavourites(user.favourite);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();

  }, []);

  useEffect(() => {
    let filteredItems = training;
    

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
        (item) => {
          return item.duration <= duration
        }
        );
    }}

    if(search){
      filteredItems = filteredItems.filter(
        (item) => item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredTraining(filteredItems); // Update filtered exercises
  }, [kategorija, difficulty, training, duration, search]); // This effect runs when filters or exercises change

  return (
    <>
      <div className="filter-container spacing">
        <label htmlFor="exercise-search" className="filter-label">
          Search training by Name:
        </label>
        <input
          type="text"
          id="exercise-search"
          className="filter-dropdown"
          placeholder="Enter training name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="filter-container">
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
      <div className="filter-container">
        {auth.currentUser && <button className="filter-dropdown details" onClick={openModal}>+ Add training</button>}
        {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>New Training</h2>
            <div className="training-container">
                <NewTraining closeWindow={closeModal} fetch={fetchTraining}></NewTraining>
            </div>
            <button className="close-button" onClick={closeModal}>Back</button>
          </div>
        </div>
      )}
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