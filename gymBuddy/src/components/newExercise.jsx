import React, { useState } from 'react';
import './home.css';
import './newTraining.css';
import { addExercise, addTraining } from '../config/firebase-config';
import { auth } from '../config/firebase-config';

const NewExercise = (props) => {
  const [exercise, setExercise] = useState({
    name: '',
    description: '',
    muscleGroup: [],
    difficulty: '',
    pictureURL: ''
  });

  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const availableMuscleGroups = [
    'biceps', 'back', 'legs', 'chest', 'triceps', 'calves', 
    'shoulders', 'glutes', 'abdominals', 'quadriceps', 'forearms', 
    'obliques', 'hamstrings'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise({
      ...exercise,
      [name] : value
    });
  };

  const handleMuscleGroupSelect = (e) => {
    const value = e.target.value;
    if (availableMuscleGroups.includes(value) && !exercise.muscleGroup.includes(value)) {
      setExercise({
        ...exercise,
        muscleGroup: [...exercise.muscleGroup, value]
      });
      setSelectedMuscleGroup('');
    } else {
      setSelectedMuscleGroup(value);
    }
  };

  const removeMuscleGroup = (group) => {
    setExercise({
      ...exercise,
      muscleGroup: exercise.muscleGroup.filter((g) => g !== group)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExercise(exercise);
      console.log('Exercise Submitted:');
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
        <input type="text" name="name" id="name" value={exercise.name} placeholder='Name...' onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label htmlFor="description"><h3>Description:</h3></label>
        <textarea name="description" id="description" value={exercise.description} placeholder='Description...' onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label htmlFor="difficulty"><h3>Difficulty:</h3></label>
        <select name="difficulty" id="difficulty" value={exercise.difficulty} onChange={handleChange} required>
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
          {exercise.muscleGroup.map((group, index) => (
            <div key={index} className="training-item">
              <div>{group}</div> 
              <button type="button" onClick={() => removeMuscleGroup(group)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="pictureURL"><h3>Picture URL:</h3></label>
        <input type="text" name="pictureURL" id="pictureURL" value={exercise.pictureURL} placeholder='Picture URL...' onChange={handleChange} required />
      </div>
      <button type="submit" className="submit-btn">Submit Exercise</button>
    </form>
  );
};

export default NewExercise;
