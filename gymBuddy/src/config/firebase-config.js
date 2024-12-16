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
                trainingId: "",
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
            throw err; // Propagate error
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

export const getUser = async () => {
    try{
        const data = await getDoc(doc(db, 'User', auth.currentUser.uid));
        console.log("User data");
        console.log(data.data());
        return data.data();
    } catch(err){
        console.error(err);
    }
}

export const getExercises = async () => {
    try{
        const data = await getDocs(Exercise);
        const dataReturn = [];
        data.forEach((doc)=>{
            dataReturn.push(doc.data());
        })
        console.log("Exer");
        console.log(dataReturn);
        return dataReturn;
    } catch(err){
        console.error(err);
    }
}

export const getTraining = async () => {
    try{
        const data = await getDocs(Training);
        return data.data();
    } catch(err){
        console.error(err);
    }
}

export const getTrainingPlan = async () => {
    try{
        const data = await getDocs(TrainingPlan);
        return data.data();
    } catch(err){
        console.error(err);
    }
}


export const addTrainingPlan = (data) => {
    return addDoc(doc(TrainingPlan), data)
        .then(() => {
            console.log("Training plan added successfully");
        })
        .catch((err) => {
            console.error("Error adding training plan:", err);
        });
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

export const getUser = () => {
    return getDoc(doc(db, 'User', auth.currentUser.uid))
        .then((data) => {
            console.log("User data retrieved:", data.data());
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
            console.log("Exercises retrieved successfully:", dataReturn);
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
