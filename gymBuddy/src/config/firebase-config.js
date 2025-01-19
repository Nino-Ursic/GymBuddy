import { initializeApp } from "firebase/app";
// Autentifikacija
import { 
    getAuth, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from "firebase/auth";
import { useAuth } from "../components/authContext";
// Baza podataka 
import { 
    getFirestore, 
    getDoc, 
    getDocs, 
    collection, 
    setDoc, 
    addDoc, 
    deleteDoc, 
    updateDoc, 
    doc, 
    query, 
    where, 
    Timestamp, 
    arrayUnion,
    arrayRemove
} from "firebase/firestore";
import { useState } from "react";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBdWI8vvnrJsh9iuD_dkD9-FJ8rAZCyfYE",
    authDomain: "gymbuddy-bcc1f.firebaseapp.com",
    projectId: "gymbuddy-bcc1f",
    storageBucket: "gymbuddy-bcc1f.firebasestorage.app",
    messagingSenderId: "679236557954",
    appId: "1:679236557954:web:d02de967e2760de5dae89b",
    measurementId: "G-B4Q7HYZDZ7"
};

const app = initializeApp(firebaseConfig);

// Autentifikacija
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signIn = (email, password, navigate, data) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User created successfully:", user);

            const completeData = {
                ...data,
                favourite: [],
                isAdmin: false,
                createdAt: Timestamp.fromDate(new Date()),
                history: [],
                trainingPlans: [],
                email: user.email
            };

            return addUser(user.uid, completeData);
        })
        .then(() => {
            console.log("User added to Firestore successfully");
            navigate('/home');
        })
        .catch((err) => {
            console.error("Error during sign-in:", err);
            alert(err.message);
        });
};

export const signInWithGoogle = (navigate) => {
    signInWithPopup(auth, googleProvider)
        .then(() => {
            console.log("User signed in with Google");
            navigate('/home');
        })
        .catch((err) => {
            console.error("Error during Google sign-in:", err);
            alert(err.message);
        });
};

export const logIn = (email, password, navigate) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("User logged in successfully");
            navigate('/home');
        })
        .catch((err) => {
            console.error("Error during log-in:", err);
            alert(err.message);
        });
};

export const logOut = () => {
    signOut(auth)
        .then(() => {
            console.log("User logged out successfully");
        })
        .catch((err) => {
            console.error("Error during log-out:", err);
            alert(err.message);
        });
};

// Baza podataka
const db = getFirestore(app);
const Exercise = collection(db, "Exercise");
const Training = collection(db, "Training");
const TrainingPlan = collection(db, "TrainingPlan");
const User = collection(db, "User");

export const addUser = (uid, data) => {
    console.log("addUser called with UID:", uid, "and Data:", data);
    return setDoc(doc(User, uid), data)
        .then(() => {
            console.log("User added to Firestore successfully");
        })
        .catch((err) => {
            console.error("Error adding user to Firestore:", err);
            throw err; 
        });
};

export const addExercise = (data) => {
    return addDoc(Exercise, data)
        .then(() => {
            console.log("Exercise added successfully");
        })

        .catch((err) => {
            console.error("Error adding exercise:", err);
        });
};

export const addTraining = (data) => {
    return addDoc(Training, data)
        .then(() => {
            console.log("Training added successfully");
        })
        .catch((err) => {
            console.error("Error adding training:", err);
        });
};

export const removeFavourites = async (exerciseName) => {
    try {
      const userDocRef = doc(db, "User", auth.currentUser.uid);
  
      await updateDoc(userDocRef, {
        favourite: arrayRemove(exerciseName)
      });
    } catch (err) {
      console.error("Error removing from favourites:", err);
    }
  };

export const addFavourites = (exercise) => {
    return updateDoc(doc(User, auth.currentUser.uid), {
        favourite: arrayUnion(exercise)
    })
        .then(() => {
            console.log("Favourite exercise added successfully");
        })
        .catch((err) => {
            console.error("Error adding favourite exercise:", err);
        });
};

export const addTrainingHistory = (training) => {
    return updateDoc(doc(User, auth.currentUser.uid), {
        history: arrayUnion(training)
    })
        .then(() => {
            console.log("Training added successfully to history");
        })
        .catch((err) => {
            console.error("Error adding training to history:", err);
        });
};

export const addNewPlan = (plan) => {
    return updateDoc(doc(User, auth.currentUser.uid), {
        trainingPlans: arrayUnion(plan)
    })
        .then(() => {
            console.log("Training added successfully to history");
        })
        .catch((err) => {
            console.error("Error adding training to history:", err);
        });
};

export const removePlan = (plan) => {
    return updateDoc(doc(User, auth.currentUser.uid), {
        trainingPlans: arrayRemove(plan)
    })
        .then(() => {
            console.log("Training removed successfully to history");
        })
        .catch((err) => {
            console.error("Error removing training to history:", err);
        });
};

export const addTrainingPlan = (data) => {
    return addDoc(TrainingPlan, data)
        .then(() => {
            console.log("Training plan added successfully");
        })
        .catch((err) => {
            console.error("Error adding training plan:", err);
        });
};

export const removeTrainingHistory = async (training) => {
    try {
      const userDocRef = doc(db, "User", auth.currentUser.uid);
  
      await updateDoc(userDocRef, {
        history: arrayRemove({
          trainingName: training.trainingName,
          date: training.date,
        }),
      });
  
      console.log("Training removed from history successfully");
    } catch (err) {
      console.error("Error removing from history:", err);
    }
  };


export const getUser = () => {
    return getDoc(doc(db, 'User', auth.currentUser.uid))
        .then((data) => {
            console.log("User data retrieved:");
            return data.data();
        })
        .catch((err) => {
            console.error("Error retrieving user data:", err);
        });
};

export const getExercises = () => {
    return getDocs(Exercise)
        .then((data) => {
            const dataReturn = [];
            data.forEach((doc) => {
                dataReturn.push(doc.data());
            });
            console.log("Exercises retrieved successfully:");
            return dataReturn;
        })
        .catch((err) => {
            console.error("Error retrieving exercises:", err);
        });
};

export const getTraining = () => {
    return getDocs(Training)
        .then((data) => {
            console.log("Training data retrieved successfully");
            return data.docs.map(doc => doc.data());
        })
        .catch((err) => {
            console.error("Error retrieving training data:", err);
        });
};

export const getTrainingPlan = () => {
    return getDocs(TrainingPlan)
        .then((data) => {
            console.log("Training plans retrieved successfully");
            return data.docs.map(doc => doc.data());
        })
        .catch((err) => {
            console.error("Error retrieving training plans:", err);
        });
};

export const changeHeight = (h) => {
    return updateDoc(doc(User, auth.currentUser.uid), {
        height: h
    })
        .then(() => {
            console.log("height updated successfully");
        })
        .catch((err) => {
            console.error("Error updating height :", err);
        });
};

export const changeAge = (a) => {
    return updateDoc(doc(User, auth.currentUser.uid), {
        age: a
    })
        .then(() => {
            console.log("age updated successfully");
        })
        .catch((err) => {
            console.error("Error updating age :", err);
        });
};
export const changeUsername = (u) => {
    return updateDoc(doc(User, auth.currentUser.uid), {
        username: u
    })
        .then(() => {
            console.log("username updated successfully");
        })
        .catch((err) => {
            console.error("Error updating username:", err);
        });
};

export const changePassword = async (newPassword) => {
    try {
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error("No user is currently signed in.");
      }
      await updatePassword(user, newPassword);
      console.log("Password updated successfully.");
    } catch (error) {
      console.error("Error changing password:", error.message);
    }
  };


export const updateTrainingPlanProgress = async (trainingName, newProgress) => {
    try {
      const userDocRef = doc(User, auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
  
        // Update the progress for the matching training plan
        const updatedTrainingPlans = userData.trainingPlans.map((plan) => {
          if (plan.name === trainingName) {
            return { ...plan, progress: newProgress };
          }
          return plan;
        });
  
        // Save the updated array back to Firestore
        await updateDoc(userDocRef, {
          trainingPlans: updatedTrainingPlans,
        });
  
        console.log(`Progress for '${trainingName}' updated to ${newProgress}%`);
      } else {
        console.error("User document does not exist.");
        alert("User data not found.");
      }
    } catch (error) {
      console.error("Error updating training progress:", error);
      alert(`Error updating progress: ${error.message}`);
    }
  };
  

export const updateExercise = async (oldExercise, exercise) => {
    const exercisesRef = Exercise;

    const q = query(exercisesRef, where("name", "==", oldExercise.name));

  try {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];  
      const docId = docSnapshot.id;

      const exerciseDocRef = doc(db, "Exercise", docId);

      await updateDoc(exerciseDocRef, {
        name: exercise.name,
        description: exercise.description,
        muscleGroup: exercise.muscleGroup,
        difficulty: exercise.difficulty,
        pictureURL: exercise.pictureURL
      });

      console.log("Exercise updated successfully!");
    } else {
      console.log("No matching exercise found!");
    }
  } catch (error) {
    console.error("Error updating exercise:", error);
  }
};