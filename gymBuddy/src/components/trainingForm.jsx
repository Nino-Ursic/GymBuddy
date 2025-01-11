import React, { useState } from 'react';

const TrainingForm = () => {
  const [training, setTraining] = useState({
    name: '',
    description: '',
    duration: '',
    exercises: [{ exerciseName: '', measure: '', repetition: '', sets: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTraining({ ...training, [name]: value });
  };

  const handleExerciseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExercises = [...training.exercises];
    updatedExercises[index][name] = value;
    setTraining({ ...training, exercises: updatedExercises });
  };

  const addExercise = () => {
    setTraining({
      ...training,
      exercises: [...training.exercises, { exerciseName: '', measure: '', repetition: '', sets: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Training Submitted:', training);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={training.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="description" value={training.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Duration:</label>
        <input type="text" name="duration" value={training.duration} onChange={handleChange} required />
      </div>
      <div>
        <label>Exercises:</label>
        {training.exercises.map((exercise, index) => (
          <div key={index}>
            <input
              type="text"
              name="exerciseName"
              placeholder="Exercise Name"
              value={exercise.exerciseName}
              onChange={(e) => handleExerciseChange(index, e)}
              required
            />
            <input
              type="text"
              name="measure"
              placeholder="Measure"
              value={exercise.measure}
              onChange={(e) => handleExerciseChange(index, e)}
              required
            />
            <input
              type="number"
              name="repetition"
              placeholder="Repetitions"
              value={exercise.repetition}
              onChange={(e) => handleExerciseChange(index, e)}
              required
            />
            <input
              type="number"
              name="sets"
              placeholder="Sets"
              value={exercise.sets}
              onChange={(e) => handleExerciseChange(index, e)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addExercise}>Add Exercise</button>
      </div>
      <button type="submit">Submit Training</button>
    </form>
  );
};

export default TrainingForm;
