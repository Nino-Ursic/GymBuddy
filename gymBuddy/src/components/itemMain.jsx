import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addFavourites, removeFavourites } from "../config/firebase-config";
import EditExercise from "./editExercise";
import { auth } from "../config/firebase-config";

function ItemMain(props) {

  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [exercise, setExercise] = useState({});
    
    
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (props.favourites && props.favourites.includes(props.exercise.name)) {
      setIsFavorite(true);
    }
    setIsAdmin(props.isAdmin);
    setExercise(props.exercise);
  }, [props.favourites, props.exercise]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavourites(props.exercise.name);
    } else {
      addFavourites(props.exercise.name);
    }
    setIsFavorite(!isFavorite);
  };

  const formatMuscleGroup = (muscleGroup) => {
    if (Array.isArray(muscleGroup) && muscleGroup.length > 0) {
      return muscleGroup
        .filter((mg) => mg.trim() !== "") 
        .map((mg) => mg.charAt(0).toUpperCase() + mg.slice(1))
        .join(" i ");
    }
    return "";
  };

  
  const formatExerciseName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };


  return (  
    <>
    <div className="item">
      <img src={exercise.pictureURL} alt="Item" />
      <div className="title-container">
        <h3 className="exerciseNameItem">
          {formatExerciseName(props.exercise.name)}
        </h3>

        <button
          className="heart-icon"
          onClick={handleFavoriteClick}
          aria-label="Toggle Favorite"
        >
          {isFavorite ? (
            <AiFillHeart size={24} color="red" />
          ) : (
            <AiOutlineHeart size={24} color="gray" />
          )}
        </button>
      </div>
      
      <div className="title-container">
        <div className="exercise-details">
          {formatMuscleGroup(props.exercise.muscleGroup) && (
            <p className="muscleGroupItem">
              {formatMuscleGroup(props.exercise.muscleGroup)}
            </p>
          )}
          <p className="difficultyItem">{formatExerciseName(props.exercise.difficulty)}</p>
        </div>
        {auth.currentUser && isAdmin && <button className="edit filter-dropdown details " onClick={openModal}>Edit</button>}
      </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Exercise</h2>
            <div className="training-container">
                <EditExercise closeWindow={closeModal} fetch={props.fetch} exercise={exercise}></EditExercise>
            </div>
            <button className="close-button" onClick={closeModal}>Back</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemMain;
