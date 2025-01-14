import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addFavourites, removeFavourites } from "../config/firebase-config";
import TrainingExercise from "./trainingExercise.jsx";
import PlanItem from "./planItem.jsx";

function TrainingPlanItem(props) {
  const [isFavorite, setIsFavorite] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (props.favourites && props.favourites.includes(props.name)) {
      setIsFavorite(true);
    }
  }, [props.favourites, props.name]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavourites(props.name);
    } else {
      addFavourites(props.name);
    }
    setIsFavorite(!isFavorite);
  };

  
  const formatTrainingName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (  
    <>
    <div className="item">
      <img src="data:image/jpeg;base64,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" alt="Item" />
      <div className="title-container">
        <h3 className="exerciseNameItem">
          {formatTrainingName(props.name)}
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
      
      
      
        <p className="muscleGroupItem">
          Duration: {props.duration} days
        </p>
      <p className="difficultyItem">{formatTrainingName(props.difficulty)}</p>

      <button className="filter-dropdown details" onClick={openModal}>Details</button>
    </div>
    {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{props.name} Details</h2>
            <p>{props.description}</p>
            <p>Duration: {props.duration} days</p>
            <div className="training-container trainingPlan-container">
                {props.trainings.map((training, index) => (
                    <PlanItem
                    key={`${training.id || training}-${index}`}
                    trainingName={training}
                    trainingIndex={index+1}
                    ></PlanItem>
                ))}
            </div>
            <button className="close-button" onClick={closeModal}>Back</button>
          </div>
        </div>
      )}
    </>
  );
}

export default TrainingPlanItem;