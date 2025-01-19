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
      <div
  style={{
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "-300px", // This will remove the extra gap and move it down
    transform: "translateY(350px) translateX(0px)", // This will move the SVG down
  }}
>
  <h3>Click on a muscle to filter exercises</h3>

  <svg
    viewBox="0 0 400 400"
    width="400" // Responsive width
    height="400"
  >
    {/* Muscle Map Image */}
    <image href="/male-muscle-anatomy.jpg"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet" />

    {/* Abdominal Region */}
    <path
      d="m 81.25,177.67 7.24,3.74 8.64,1.17 8.4,-0.93 5.6,-3.27 2.1,-5.14 5.6,-4.44 3.27,-4.2 3.27,-3.04 0.93,-6.77 -2.8,-5.14 -0.7,-8.17 2.1,-7 3.97,-6.07 2.33,-5.37 -0.23,-5.84 -0.7,-7.94 0.23,-3.97 -3.74,3.97 -4.9,3.74 -7.24,1.63 -7.94,-1.4 -4.67,-1.63
h -3.74
l -6.07,-0.23 -1.87,1.87 -4.9,1.17 -5.84,0.47
h -5.37
l -5.6,-1.63 -2.33,-3.97 -4.44,-2.1 -1.4,4.2
v 8.87 3.97
l 1.17,3.97 2.8,3.5 3.27,3.97
c 0,0 1.87,3.97 1.87,5.14 0,1.17 0.7,4.9 0.7,4.9
l -1.63,3.74 -1.63,6.3 -0.23,6.3 3.74,4.2 3.74,1.63 3.74,3.04
z"
      fill="transparent"
      stroke="black"
      strokeWidth="0"
      onClick={() => handleMuscleClick("abdominals")}
    />
    {/* Left biceps */}
    <path
      d="m 45.29,107.4 -6.54,-0.47 -4.2,11.21 1.87,16.34 9.34,7 7.94,1.4 6.54,-19.14 -1.87,-12.14z"
      fill="transparent"
      stroke="black"
      strokeWidth="0"
      onClick={() => handleMuscleClick("biceps")}
    />
    {/* Right biceps */}
    <path
      d="m 131.68,106 11.21,-2.8 5.6,3.27 c 0,0 4.67,18.68 5.14,20.55 0.47,1.87 -6.07,9.81 -6.07,9.81 l -11.67,3.27 -5.6,-20.55 z"
      fill="transparent"
      stroke="black"
      strokeWidth="0"
      onClick={() => handleMuscleClick("biceps")}
    />
    {/* Chest */}
    <path
      d="m 59.3,100.39 5.6,-14.94 17.74,-5.14 21.95,0.47 16.81,1.87 12.14,15.88 -6.07,10.74 -22.88,5.6 -19.14,-0.93 -20.55,-0.93z"
      fill="transparent"
      stroke="black"
      strokeWidth="0"
      onClick={() => handleMuscleClick("chest")}
    />
    {/* Left shoulder */}
    <path
      d="m 52.3,73.31 -6.54,6.54 -6.07,11.21 0.93,7.94 0.93,7 8.87,1.87 9.81,-10.74 4.67,-16.81 -1.87,-4.2z"
      fill="transparent"
      stroke="black"
      strokeWidth="0"
      onClick={() => handleMuscleClick("shoulders")}
    />
    {/* Right shoulder */}
    <path
      d="m 119.54,80.78 6.07,-6.07 9.34,0.93 10.27,6.54 4.2,11.67 -0.93,10.27 -14.94,-3.27 -8.4,-15.41 z"
      fill="transparent"
      stroke="black"
      strokeWidth="0"
      onClick={() => handleMuscleClick("shoulders")}
    />
    {/* Legs */}
    <path
      d="m 83.35,187.24 6.77,14.01 10.04,4.9 2.57,-3.97 3.27,-8.17 3.97,-7.24 3.5,-12.14 8.17,-8.64 3.04,1.17 6.3,16.81
c 0,0 2.57,17.04 2.8,18.21 0.23,1.17 0.7,21.71 0.7,21.71 0,0 -2.1,18.68 -2.1,19.84 0,1.17 -2.33,13.07 -2.33,13.07 0,0 -1.17,7 -1.63,8.17 -0.47,1.17 -1.4,4.44 -1.4,4.44
l 0.7,6.3
v 6.77
l 4.44,12.14 1.63,11.91 -2.1,10.97 -2.33,14.71 -1.4,8.17 -2.8,12.14 2.33,5.84 0.47,6.3 4.2,6.3 5.37,4.44 3.5,2.1 1.17,4.67
c 0,0 -10.74,0.23 -12.61,0.47 -1.87,0.23 -9.34,-0.23 -9.34,-0.23
l -4.2,-3.04 -2.8,-2.33 0.93,-7.24 0.23,-6.3
c 0,0 -2.33,-0.47 -0.7,-4.9 1.63,-4.44 1.63,-9.81 1.63,-9.81
l -0.47,-9.11 -1.87,-11.91 -3.5,-6.3 -3.74,-5.6 -0.23,-11.21 2.57,-12.14 0.47,-6.54 -2.57,-7.47 -1.63,-15.18 -1.17,-12.14 -2.33,-15.18 -3.97,-12.14 -2.1,4.44 -5.14,18.91
c 0,0 -0.7,8.64 -0.93,9.57 -0.23,0.93 -0.47,12.84 -0.47,12.84
l -3.27,10.97 -2.8,6.54 2.57,11.67 1.87,10.51 -3.74,9.57 -5.84,8.4 -1.87,14.71
c 0,0 -1.63,10.04 -0.93,10.97 0.7,0.93 3.27,6.07 3.27,6.07
l -0.7,3.27 -0.93,4.9 2.33,6.07 -1.63,4.44 -5.6,0.93 -3.04,3.27 -7,1.4 -3.74,-2.1 -8.4,0.23 -0.47,-5.14 5.84,-2.33 6.77,-7 3.27,-5.6 -2.8,-3.97 1.4,-5.37
c 0,0 0.7,-8.87 0.47,-9.81 -0.23,-0.93 -3.27,-15.64 -3.27,-15.64
l -3.04,-12.84 -0.47,-9.34 2.33,-10.97 5.6,-10.51 -1.87,-6.77 0.93,-6.54 -0.47,-5.14 -1.87,-4.67 -3.5,-6.77 -0.47,-9.81 -0.47,-7.94
v -8.4 -7.7
l 0.7,-11.44 1.17,-6.77 1.17,-6.07 3.04,-9.57
v -4.67
l 3.04,-7.24 2.1,-6.54
h 3.04
l 5.14,3.27 3.5,7.24
z"
      fill="transparent"
      stroke="black"
      strokeWidth="0"
      onClick={() => handleMuscleClick("legs")}
    />
    {/* Back */}
    <path
      d="m 279.46,73.54 6.07,-5.6 7,-3.5 8.17,-2.8 3.27,-2.1 17.04,-0.23 6.77,3.74 6.77,3.04 8.4,4.9 2.1,3.5 1.17,4.44 2.1,5.6 2.1,5.84 0.93,9.11
v 6.3
l -1.87,11.67 -1.87,7.47 -4.2,5.14 -1.4,7.47 -1.87,5.84 -0.7,4.67 2.33,5.84 -1.63,3.97 -0.12,4.09 1.4,2.92 -8.52,-2.68 -5.14,1.28 -5.95,1.28 -2.8,3.15
h -8.05
l -3.04,0.23 -1.87,-0.82 -5.37,-3.04 -7.94,-1.4 -7.24,1.05 -2.1,1.05 1.17,-3.04 0.12,-3.5 -0.93,-4.79 1.05,-6.19 0.12,-3.5 -1.75,-7.7
c 0,0 -1.52,-5.02 -1.75,-5.49 -0.23,-0.47 -3.74,-5.49 -3.74,-5.49
l -0.58,-8.05 -1.28,-5.14 -1.05,-7.47 -2.33,-4.67 -0.35,-3.85 1.05,-5.37 1.17,-4.09 2.1,-5.49
z"
      fill="transparent"
      stroke="black"
      strokeWidth="0"
      onClick={() => handleMuscleClick("back")}
    />
    {/*Left Calves */}
    <path
      d="m 281.33,275.03 5.6,-2.8 4.44,-0.93 4.9,1.4 2.1,5.37 -0.7,5.84 0.7,6.54 0.93,7.47 1.4,5.14 0.47,6.07 -0.23,4.2
c 0,0 -2.8,3.97 -3.74,4.67 -0.93,0.7 -3.04,1.63 -3.04,1.63
l -0.7,3.74 -0.23,2.8 -3.74,-1.63 -5.37,-2.8 -3.97,-3.5 -3.5,-4.9 -1.87,-4.67 -0.7,-4.44
v -7.94
l 3.27,-7.24 2.8,-8.64
z"
      fill="transparent"
      stroke="black"
      strokeWidth="0"
      onClick={() => handleMuscleClick("calves")}
    />

    {/*Right Calves */}
    <path
      d="m 327.09,286.7
v -9.11
l 0.47,-3.04 4.67,-3.27
h 6.07
l 3.5,3.04 1.87,4.44 2.1,6.77 3.04,8.17 2.33,8.87 -1.17,9.57 -3.74,6.77 -4.67,4.67 -6.3,2.8 -5.37,1.4 -1.4,-5.6 -1.4,-2.57 -3.04,-3.97 -1.87,-7.94 1.17,-7.24 1.17,-5.14 1.17,-5.37
z"
      fill="transparent"
      stroke="black"
      strokeWidth="0"
      onClick={() => handleMuscleClick("calves")}
    />
    {/* Left triceps */}
    <path
      d="m 259.15,100.86 -6.07,6.54 -1.4,9.34 0.47,13.54 4.67,9.81 6.54,0.47 8.4,-4.67 4.2,-14.48 v -14.01 l -7.94,-7 z"
      fill="transparent"
      stroke="black"
      strokeWidth="0"
      onClick={() => handleMuscleClick("triceps")}
    />
    {/* Right triceps */}
    <path
      d="m 352.07,102.26 -5.14,16.34 v 15.88 l 11.67,4.67 9.81,-0.93 1.4,-15.41 -0.93,-9.81 -7.94,-10.27 z"
      fill="transparent"
      stroke="black"
      strokeWidth="0"
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
