import React, { useState, useEffect } from 'react';
import './newTraining.css';
import './home.css';
import { addTrainingPlan, getTraining } from '../config/firebase-config';
import { auth } from '../config/firebase-config';

const NewTrainingPlan = (props) => {
  const [trainingPlan, setTrainingPlan] = useState({
    name: '',
    description: '',
    difficulty: '',
    duration: null,
    trainings: [],
    userId: ''
  });

  const [availableTrainings, setAvailableTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState('');

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const trainings = await getTraining();
        const filteredItems = trainings.filter( (item) =>{
                      if(item.userId){
                        return(item.userId == auth.currentUser?.uid);
                      }else{
                        return true;
                      }
                    })
        setAvailableTrainings(filteredItems);
      } catch (error) {
        console.error('Error fetching trainings:', error);
      }
    };
    fetchTrainings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainingPlan({
      ...trainingPlan,
      [name]: name === 'duration' ? parseInt(value) : value
    });
  };

  const handleTrainingSelect = (e) => {
    const value = e.target.value;
    setSelectedTraining(value);

    if (availableTrainings.some(training => training.name.toLowerCase() === value.toLowerCase()) || value === "Rest Day") {
      if (value !== "") {
        setTrainingPlan({
          ...trainingPlan,
          trainings: [...trainingPlan.trainings, value]
        });
        setSelectedTraining(''); // Clear input after adding
      }
    }
  };

  const removeTraining = (trainingName) => {
    setTrainingPlan({
      ...trainingPlan,
      trainings: trainingPlan.trainings.filter(name => name !== trainingName)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPlan = { ...trainingPlan, userId: auth.currentUser?.uid };
    try {
      await addTrainingPlan(updatedPlan);
      console.log('Training Plan Submitted:', updatedPlan);
      props.closeWindow();
      props.fetch();
    } catch (error) {
      console.error('Error submitting training plan:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-group">
        <label htmlFor="name"><h3>Name:</h3></label>
        <input type="text" name="name" id="name" value={trainingPlan.name} placeholder='Name...' onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label htmlFor="description"><h3>Description:</h3></label>
        <textarea name="description" id="description" value={trainingPlan.description} placeholder='Description...' onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label htmlFor="duration"><h3>Duration (days):</h3></label>
        <input type="number" name="duration" id="duration" value={trainingPlan.duration} onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label htmlFor="difficulty"><h3>Difficulty:</h3></label>
        <select name="difficulty" id="difficulty" value={trainingPlan.difficulty} onChange={handleChange} required>
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="trainings"><h3>Select Trainings or Rest Day:</h3></label>
        <input
          type="text"
          id="trainings"
          list="training-options"
          value={selectedTraining}
          onChange={handleTrainingSelect}
          placeholder="Type or select a training or Rest Day"
        />
        <datalist id="training-options">
          <option value="Rest Day" />
          {availableTrainings.map((training) => (
            <option key={`${training.id}${training.name}`} value={training.name} />
          ))}
        </datalist>

        <div className="selected-trainings">
          {trainingPlan.trainings.map((training, index) => (
            <div key={index} className="training-item">
              <div>{training}</div>
              <button type="button" onClick={() => removeTraining(training)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-btn">Submit Training Plan</button>
    </form>
  );
};

export default NewTrainingPlan;
