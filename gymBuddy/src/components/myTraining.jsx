import "./home.css";
import "./newTraining.css";
import "./myTraining.css";
import React, { useState, useEffect } from "react";
import { auth } from '../config/firebase-config.js';
import { getTraining, addTrainingHistory, removeTrainingHistory, getUser } from '../config/firebase-config';


function Training() {
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState("");
  const [trainingPlans, setTrainingPlans] = useState([]);
  const [history, setHistory] = useState([]);
  const [weight, setWeight] = useState([]);
  const [isModalOpenTP, setIsModalOpenTP] = useState(false);
  const [isModalOpenT, setIsModalOpenT] = useState(false);
    
    
  const openModalTP = () => setIsModalOpenTP(true);
  const closeModalTP = () => setIsModalOpenTP(false);
    
  const openModalT = () => setIsModalOpenT(true);
  const closeModalT = () => setIsModalOpenT(false);

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
      setTrainings(filteredItems);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const user = await getUser();
      
      const temp = user.history.map((training) => ({
        ...training,
        date: training.date.toDate(), 
      }));
      
      const sortedTemp = temp.sort((a, b) => b.date - a.date);
      
      setHistory(sortedTemp);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  }
  
  
  

  useEffect(() => {

    fetchHistory();
    fetchTrainings();

  }, [])

  const handleTrainingChange = (e) => {
    setSelectedTraining(e.target.value);
  }

  const handleTrainingSubmit = async (e) => {
    e.preventDefault();
  
    const trainingExists = trainings.some(training => training.name === selectedTraining);
  
    if (!trainingExists) {
      alert("Please select a valid training from the options.");
      return;
    }
  
    const completedTraining = {
      date: new Date(),
      trainingName: selectedTraining
    };
  
    try {
      await addTrainingHistory(completedTraining);
      console.log('Training Submitted:');
      closeModalT();
      fetchTrainings();
      setSelectedTraining("");
      fetchHistory();
    } catch (error) {
      console.error('Error submitting training plan:', error);
    }
  };
  

  const removeTraining = async (training) => {
    try {
      const trainingToRemove = {
        trainingName: training.trainingName,
        date: training.date.toDate ? training.date.toDate() : training.date
      };
  
      await removeTrainingHistory(trainingToRemove);
  
      fetchHistory();
  
      console.log("Training removed successfully");
    } catch (error) {
      console.error("Error removing training:", error);
    }
  };
  



  
  return (
    <>
        <div className="myTraining-container spacing">
          <div className="myTraining-data">
            <div className="myTraining-trainings">
              <div className="training-title">
                <h1>Training</h1>
              </div>
              <div className="new-trainingPlan">
                {auth.currentUser && <button className="filter-dropdown" onClick={openModalTP}>+ Add training plan</button>}
                {isModalOpenTP && (
                <div className="modal-overlay" onClick={closeModalTP}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>New Training Plan</h2>
                    <div className="training-container">
                    </div>
                    <button className="close-button" onClick={closeModalTP}>Back</button>
                  </div>
                </div>
                )}
              </div>
              
              <div className="completed-trainings-container">
                <h2>Completed</h2>
                <div className="new-trainingPlan">
                  {auth.currentUser && <button className="filter-dropdown" onClick={openModalT}>+ Add training</button>}
                  {isModalOpenT && (
                  <div className="modal-overlay" onClick={closeModalT}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                      <h2>Completed training</h2>
                      <div className="training-container">
                      <form onSubmit={handleTrainingSubmit} className="form-container">
                        <div className="input-group">
                          <label htmlFor="trainings"><h3>Select Training:</h3></label>
                          <input
                            type="text"
                            id="trainings"
                            list="training-options"
                            value={selectedTraining}
                            onChange={handleTrainingChange}
                            placeholder="Type or select a training"
                          />
                          <datalist id="training-options">
                            {trainings.map((training) => (
                              <option key={`${training.id}${training.name}`} value={training.name} />
                            ))}
                          </datalist>
                        </div>
                        <button type="submit" className="submit-training">Submit Training</button>
                      </form>
                      </div>
                      <button className="close-button" onClick={closeModalT}>Back</button>
                    </div>
                  </div>
                  )}
                </div>
                <div className="completed-trainings">
                  {history.map((training, index) => (
                    <div key={index} className="item">
                      <h4>{training.trainingName}</h4>
                      <p>{training.date?.toLocaleDateString()}</p>
                      <button type="button" className="remove" onClick={() => removeTraining(training)}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="trainingPlans">

              </div>
            </div>
            <div className="myTraining-stats">
              <div className="stats-title">
                <h1>Stats</h1>
              </div>
                <div className="new-weight">

                </div>
                <div className="weight-chart">

                </div>
                <div className="trainings-number">

                </div>
                <div className="trainings-minutes">

                </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Training;