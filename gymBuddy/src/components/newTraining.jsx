import React, { useState } from 'react';
import './home.css';
import './newTraining.css';
import { addTraining } from '../config/firebase-config';
import { auth } from '../config/firebase-config';

const NewTraining = (props) => {
  const [training, setTraining] = useState({
    name: '',
    description: '',
    duration: 0,
    exercises: [{ exerciseName: '', measure: '', repetition: 0, sets: 0 }],
    muscleGroup: [],
    difficulty: '',
    userId: ''
  });

  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const availableMuscleGroups = [
    'biceps', 'back', 'legs', 'chest', 'triceps', 'calves', 
    'shoulders', 'glutes', 'abdominals', 'quadriceps', 'forearms', 
    'obliques', 'hamstrings'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTraining({
      ...training,
      [name]: name === 'duration' ? parseInt(value) : value
    });
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
      exercises: [...training.exercises, { exerciseName: '', measure: '', repetition: 0, sets: 0 }],
    });
  };

  const removeExercise = (index) => {
    const updatedExercises = training.exercises.filter((_, i) => i !== index);
    setTraining({ ...training, exercises: updatedExercises });
  };

  const handleMuscleGroupSelect = (e) => {
    const value = e.target.value;
    if (availableMuscleGroups.includes(value) && !training.muscleGroup.includes(value)) {
      setTraining({
        ...training,
        muscleGroup: [...training.muscleGroup, value]
      });
      setSelectedMuscleGroup('');
    } else {
      setSelectedMuscleGroup(value);
    }
  };

  const removeMuscleGroup = (group) => {
    setTraining({
      ...training,
      muscleGroup: training.muscleGroup.filter((g) => g !== group)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTraining = { ...training, userId: auth.currentUser?.uid };
    try {
      await addTraining(updatedTraining);
      console.log('Training Submitted:');
      props.closeWindow();
      props.fetch();
    } catch (error) {
      console.error('Error submitting training:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-group">
        <label htmlFor="name"><h3>Name:</h3></label>
        <input type="text" name="name" id="name" value={training.name} placeholder='Name...' onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label htmlFor="description"><h3>Description:</h3></label>
        <textarea name="description" id="description" value={training.description} placeholder='Description...' onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label htmlFor="duration"><h3>Duration (minutes):</h3></label>
        <input type="number" name="duration" id="duration" value={training.duration} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label htmlFor="difficulty"><h3>Difficulty:</h3></label>
        <select name="difficulty" id="difficulty" value={training.difficulty} onChange={handleChange} required>
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="muscleGroup"><h3>Select Muscle Groups:</h3></label>
        <input
          type="text"
          id="muscleGroup"
          list="muscle-group-options"
          value={selectedMuscleGroup}
          onChange={handleMuscleGroupSelect}
          placeholder="Type or select a muscle group"
        />
        <datalist id="muscle-group-options">
          {availableMuscleGroups.map((group, index) => (
            <option key={index} value={group} />
          ))}
        </datalist>

        <div className="selected-trainings">
          {training.muscleGroup.map((group, index) => (
            <div key={index} className="training-item">
              <div>{group}</div> 
              <button type="button" onClick={() => removeMuscleGroup(group)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label><h3>Exercises:</h3></label>
        {training.exercises.map((exercise, index) => (
          <div key={index} className='exercise-container'>
            <div className="exercise-group">
            <div>
              <label>Exercise Name:</label>
              <input type="text" name="exerciseName" placeholder="Exercise Name" value={exercise.exerciseName} onChange={(e) => handleExerciseChange(index, e)} />
            </div>
            <div>
              <label>Measure:</label>
              <input type="text" name="measure" placeholder="Measure" value={exercise.measure} onChange={(e) => handleExerciseChange(index, e)} />
            </div>
            <div>
              <label>Repetitions:</label>
              <input type="number" name="repetition" placeholder="Repetitions" value={exercise.repetition} onChange={(e) => handleExerciseChange(index, e)} />
            </div>
            <div>
              <label>Sets:</label>
              <input type="number" name="sets" placeholder="Sets" value={exercise.sets} onChange={(e) => handleExerciseChange(index, e)} />
            </div> 
            </div>      
            <button type="button" onClick={() => removeExercise(index)} className="remove">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addExercise} className="add-btn">Add Exercise</button>
      </div>
      <button type="submit" className="submit-btn">Submit Training</button>
    </form>
  );
};

export default NewTraining;
