import React, { useState, useEffect } from "react";
import "./home.css";
import ItemMain from "./itemMain.jsx";
import { getExercises, getUser } from "../config/firebase-config";

function Home() {
  const [exercises, setExercises] = useState([]);  // Original exercises
  const [filteredExercises, setFilteredExercises] = useState([]);  // Filtered exercises
  const [kategorija, setKategorija] = useState(""); // Selected category
  const [difficulty, setDifficulty] = useState(""); // Selected difficulty
  const [userFavourites, setUserFavourites] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const ex = await getExercises();
        setExercises(ex);
        setFilteredExercises(ex); // Initially set filteredExercises to all exercises
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();

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

    setFilteredExercises(filteredItems); // Update filtered exercises
  }, [kategorija, difficulty, exercises]); // This effect runs when filters or exercises change

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
      <div className="home-container">
        {filteredExercises.map((exercise) => (
          <ItemMain
            key={exercise.id || exercise.name} // Use unique key
            exerciseName={exercise.name}
            difficulty={exercise.difficulty}
            muscleGroup={exercise.muscleGroup}
            favourites={userFavourites}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
