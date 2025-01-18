import "./home.css";
import "./newTraining.css";
import "./myTraining.css";
import React, { useState, useEffect } from "react";
import { auth, getTrainingPlan, removePlan } from '../config/firebase-config.js';
import { getTraining, addTrainingHistory, removeTrainingHistory, getUser, addNewPlan, updateTrainingPlanProgress } from '../config/firebase-config';


function Training() {
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState("");
  const [history, setHistory] = useState([]);

  const [trainingPlans, setTrainingPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [myPlans, setMyPlans] = useState([]);
  
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
  
  const fetchPlans = async () => {
    try {
      const plans = await getTrainingPlan();
      const filteredItems = plans.filter( (item) =>{
              if(item.userId){
                return(item.userId == auth.currentUser?.uid);
              }else{
                return true;
              }
            })
      setTrainingPlans(filteredItems);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  }

  const fetchMyPlans = async () => {
    try {
      const user = await getUser();
      
      const temp = user.trainingPlans
      
      setMyPlans(temp);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  }
  

  useEffect(() => {

    fetchHistory();
    fetchTrainings();
    fetchPlans();
    fetchMyPlans();

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
      console.error('Error submitting training:', error);
    }
  };

  

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  }

  const handlePlanSubmit = async (e) => {
    e.preventDefault();
  
    const PlanExists = trainingPlans.some(plan => plan.name === selectedPlan);
  
    if (!PlanExists) {
      alert("Please select a valid training from the options.");
      return;
    }
  
    const newPlan = {
      name: selectedPlan,
      progress: 0,
    };
  
    try {
      await addNewPlan(newPlan);
      console.log('Plan Submitted:');
      closeModalTP();
      fetchPlans();
      setSelectedPlan("");
      fetchMyPlans();
    } catch (error) {
      console.error('Error submitting training plan:', error);
    }
  }
  

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

  const completeTraining = async (tp, training) => {
    
    const completedTraining = {
      date: new Date(),
      trainingName: training
    };

    try {
      await updateTrainingPlanProgress(tp.name, tp.progress+1);
      console.log('Training Submitted:');
      fetchPlans();
      fetchMyPlans();
    } catch (error) {
      console.error('Error submitting training:', error);
    }
    if(training != "Rest day"){
    try {
      await addTrainingHistory(completedTraining);
      console.log('Training Submitted:');
      fetchTrainings();
      fetchHistory();
    } catch (error) {
      console.error('Error submitting training:', error);
    }
    }
  }

  const handleNext = async (tp) => {

    try {
      await updateTrainingPlanProgress(tp.name, tp.progress+1);
      fetchPlans();
      fetchMyPlans();
      console.log('progress changed:');
    } catch (error) {
      console.error('Error progress change:', error);
    }
  }

  const handlePrev = async (tp) => {
    try {
      await updateTrainingPlanProgress(tp.name, tp.progress-1);
      fetchPlans();
      fetchMyPlans();
      console.log('progress changed:');
    } catch (error) {
      console.error('Error progress change:', error);
    }
  }

  const removeTrainingPlan = async (tp) => {
    const rPlan = {
      name: tp.name,
      progress: tp.progress
    };
  
    try {
      await removePlan(rPlan);
      console.log('Plan removed:');
      fetchPlans();
      fetchMyPlans();
    } catch (error) {
      console.error('Error removing training plan:', error);
    }
  }
  
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
                    <form onSubmit={handlePlanSubmit} className="form-container">
                        <div className="input-group">
                          <label htmlFor="plan"><h3>Select training plan:</h3></label>
                          <input
                            type="text"
                            id="plan"
                            list="trainingPlan-options"
                            value={selectedPlan}
                            onChange={handlePlanChange}
                            placeholder="Type or select a training"
                          />
                          <datalist id="trainingPlan-options">
                            {trainingPlans.map((plan) => (
                              <option key={`${plan.id}${plan.name}`} value={plan.name} />
                            ))}
                          </datalist>
                        </div>
                        <button type="submit" className="submit-training">Submit training plan</button>
                      </form>
                    </div>
                    <button className="close-button" onClick={closeModalTP}>Back</button>
                  </div>
                </div>
                )}
              </div>
              {myPlans.map((tp) => (
                <div className="completed-trainings-container">
                <div className="trainingPlan-title">
                  <h2>{tp.name}</h2>
                  <button type="button" className="remove" onClick={() => removeTrainingPlan(tp)}>Remove</button>
                </div>
                <div className="plan-navigation">
                  <h3>Day: {tp.progress+1}</h3>
                  <button type="button" className="submit-training" onClick={() => handlePrev(tp)}>Prev</button>
                  <button type="button" className="submit-training" onClick={() => handleNext(tp)}>Next</button>
                </div>
                <p>Upcoming trainings:</p>
                <div className="completed-trainings">
                  {trainingPlans.find(plan => plan.name === tp.name).trainings.map((training, index) => (
                    <>{ index >= tp.progress &&
                    <div key={index} className="item">
                      <h4>{`${index+1}. ${training}`}</h4>
                      {index == tp.progress && <button type="button" className="submit-training complete" onClick={() => completeTraining(tp, training)}>Complete</button>}
                    </div>
                    }</>
                  ))}
                </div>
              </div>
              ))
              }
              <div className="completed-trainings-container history">
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