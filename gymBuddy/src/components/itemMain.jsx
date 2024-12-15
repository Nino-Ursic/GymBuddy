function ItemMain(props) {
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
      <h3 className="exerciseNameItem">
        {formatExerciseName(props.exerciseName)}
      </h3>
      
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
