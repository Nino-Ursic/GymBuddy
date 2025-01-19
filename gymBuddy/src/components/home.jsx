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

    setFilteredExercises(filteredItems); 
  }, [kategorija, difficulty, exercises, search]); 


  // Function to handle muscle selection
  const handleMuscleClick = (muscle) => {
    setKategorija(muscle);
  };


  return (
    <>
      {/* Muscle Map */}
      <div style={{ textAlign: "center", marginBottom: "20px", marginTop: "50px" }}>
        <h3>Click on a muscle to filter exercises</h3>

        <svg
          viewBox="0 0 400 400"
          width="400" // Responsive width
          height="400"
          y="200"
        //preserveAspectRatio="xMidYMid meet"
        >
          {/* Muscle Map Image */}
          <image href="/male-muscle-anatomy.jpg"
            width="100%"
            height="100%"

            preserveAspectRatio="xMidYMid meet" />

          {/* Abdominal Region */}
          <path
            d="m 70.507976,160.1605 -1.867761,-28.01641 6.070223,-12.14045 13.541267,-3.26858 16.342905,-1.40082 14.94209,10.73962 0.93388,12.60739 0.93388,19.14455 -7.93798,11.20657 -6.07023,7.0041 -14.475143,0.46694 -11.673506,-0.93388
z"
            fill="transparent"
            stroke="black"
            strokeWidth="1"
            y="200"
            onClick={() => handleMuscleClick("abdominals")}
          />
          {/* left biceps */}
          <path
            d="m 45.29,107.4 -6.54,-0.47 -4.2,11.21 1.87,16.34 9.34,7 7.94,1.4 6.54,-19.14 -1.87,-12.14z"
            fill="transparent"
            stroke="black"
            strokeWidth="1"
            y="200"
            onClick={() => handleMuscleClick("biceps")}
          />
          {/*right biceps*/}
          <path
            d="m 131.68,106 11.21,-2.8 5.6,3.27
                c 0,0 4.67,18.68 5.14,20.55 0.47,1.87 -6.07,9.81 -6.07,9.81
                l -11.67,3.27 -5.6,-20.55
                z"
            fill="transparent"
            stroke="black"
            strokeWidth="1"
            y="200"
            onClick={() => handleMuscleClick("biceps")}
          />
          {/*chest*/}
          <path
            d="m 59.3,100.39 5.6,-14.94 17.74,-5.14 21.95,0.47 16.81,1.87 12.14,15.88 -6.07,10.74 -22.88,5.6 -19.14,-0.93 -20.55,-0.93z"
            fill="transparent"
            stroke="black"
            strokeWidth="1"
            y="200"
            onClick={() => handleMuscleClick("chest")}
          />
          {/*left shoulder*/}
          <path
            d="m 52.3,73.31 -6.54,6.54 -6.07,11.21 0.93,7.94 0.93,7 8.87,1.87 9.81,-10.74 4.67,-16.81 -1.87,-4.2z"
            fill="transparent"
            stroke="black"
            strokeWidth="1"
            y="200"
            onClick={() => handleMuscleClick("shoulders")}
          />
          {/*right shoulder*/}
          <path
            d="m 119.54,80.78 6.07,-6.07 9.34,0.93 10.27,6.54 4.2,11.67 -0.93,10.27 -14.94,-3.27 -8.4,-15.41 z"
            fill="transparent"
            stroke="black"
            strokeWidth="1"
            y="200"
            onClick={() => handleMuscleClick("shoulders")}
          />

          {/*legs*/}
          <path
            d="m 49.96,189.11 -2.33,153.62 93.39,-0.47 1.4,-159.23 -94.32,-1.87 z"
            fill="transparent"
            stroke="black"
            strokeWidth="1"
            y="200"
            onClick={() => handleMuscleClick("legs")}
          />

        {/*back */}
        <path
            d="m 286.7,156.42 46.23,-0.47 11.67,-43.89 -1.4,-24.28 -10.74,-11.67 -44.83,-0.93 -12.14,27.55 1.87,18.21 z"
            fill="transparent"
            stroke="black"
            strokeWidth="1"
            y="200"
            onClick={() => handleMuscleClick("back")}
          />
           {/*calves */}
        <path
            d="m 274.09392,274.09392 69.10715,-1.40082
                v 69.10715
                l -68.17,-0.47
                z"
            fill="transparent"
            stroke="black"
            strokeWidth="1"
            y="200"
            onClick={() => handleMuscleClick("calves")}
          />
            {/*left tri */}
        <path
            d="m 259.15,100.86 -6.07,6.54 -1.4,9.34 0.47,13.54 4.67,9.81 6.54,0.47 8.4,-4.67 4.2,-14.48
                v -14.01
                l -7.94,-7
                z"
            fill="transparent"
            stroke="black"
            strokeWidth="1"
            y="200"
            onClick={() => handleMuscleClick("triceps")}
          />
            {/*right tri */}
        <path
            d="m 352.07,102.26 -5.14,16.34
                v 15.88
                l 11.67,4.67 9.81,-0.93 1.4,-15.41 -0.93,-9.81 -7.94,-10.27
                z"
            fill="transparent"
            stroke="black"
            strokeWidth="1"
            y="200"
            onClick={() => handleMuscleClick("triceps")}
          />



        </svg>

      </div>

      {/* Category Filter */}
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
          {[
            "biceps", "back", "legs", "chest", "triceps", "calves", "shoulders",
            "glutes", "abdominals", "quadriceps", "forearms", "obliques", "hamstrings"
          ].map((muscle) => (
            <option key={muscle} value={muscle}>{muscle.charAt(0).toUpperCase() + muscle.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Difficulty Filter */}
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
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
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
