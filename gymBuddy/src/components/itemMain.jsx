import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addFavourites, removeFavourites } from "../config/firebase-config";

function ItemMain(props) {

  const [isFavorite, setIsFavorite] = useState(false);


  useEffect(() => {
    if (props.favourites && props.favourites.includes(props.exerciseName)) {
      setIsFavorite(true);
    }
  }, [props.favourites, props.exerciseName]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavourites(props.exerciseName);
    } else {
      addFavourites(props.exerciseName);
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
    <div className="item">
      <img src="https://picsum.photos/500" alt="Item" />
      <div className="title-container">
        <h3 className="exerciseNameItem">
          {formatExerciseName(props.exerciseName)}
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
      
      
      {formatMuscleGroup(props.muscleGroup) && (
        <p className="muscleGroupItem">
          {formatMuscleGroup(props.muscleGroup)}
        </p>
      )}
      <p className="difficultyItem">{formatExerciseName(props.difficulty)}</p>
    </div>
  );
}

export default ItemMain;
