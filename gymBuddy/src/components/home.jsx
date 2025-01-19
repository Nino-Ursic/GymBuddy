import React, { useState, useEffect } from "react";
import "./home.css";
import ItemMain from "./itemMain.jsx";
import { getExercises, getUser } from "../config/firebase-config";
import { auth } from "../config/firebase-config";
import NewExercise from "./newExercise.jsx";

function Home() {
  const [exercises, setExercises] = useState([]);  
  const [filteredExercises, setFilteredExercises] = useState([]);  
  const [kategorija, setKategorija] = useState(""); 
  const [difficulty, setDifficulty] = useState(""); 
  const [userFavourites, setUserFavourites] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchExercises = async () => {
    try {
      const ex = await getExercises();
      setExercises(ex);
      setFilteredExercises(ex); 
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const user = await getUser();
      console.log(user);
      console.log(user.favourite);
      setUserFavourites(user.favourite);
      setIsAdmin(user.isAdmin);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  useEffect(() => {

    fetchExercises();
    fetchUser();
  }, []);

  useEffect(() => {
    let filteredItems = exercises;

    if (kategorija) {
      filteredItems = filteredItems.filter(
        (item) => {
           return (item.muscleGroup === kategorija || item.muscleGroup.includes(kategorija));
        }
      );
    }

    if (difficulty) {
      filteredItems = filteredItems.filter(
        (item) => item.difficulty === difficulty
      );
    }

    if(search){
      filteredItems = filteredItems.filter(
        (item) => item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredExercises(filteredItems); // Update filtered exercises
  }, [kategorija, difficulty, exercises, search]); // This effect runs when filters or exercises change

  return (
    <>
      <div className="filter-container spacing">
        <label htmlFor="exercise-search" className="filter-label">
          Search Exercises by Name:
        </label>
        <input
          type="text"
          id="exercise-search"
          className="filter-dropdown"
          placeholder="Enter exercise name..."
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
        {auth.currentUser && isAdmin && <button className="filter-dropdown details" onClick={openModal}>+ Add exercise</button>}
        {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>New Training</h2>
            <div className="training-container">
                <NewExercise closeWindow={closeModal} fetch={fetchExercises}></NewExercise>
            </div>
            <button className="close-button" onClick={closeModal}>Back</button>
          </div>
        </div>
      )}
      </div>
      <div className="home-container">
        {filteredExercises.map((exercise) => (
          <ItemMain
            key={exercise.id || exercise.name}
            favourites={userFavourites}
            fetch = {fetchExercises}
            isAdmin = {isAdmin}
            exercise = {exercise}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
