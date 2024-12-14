import { initializeApp } from "firebase/app";
// Autentifikacija
import {getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { useAuth } from "../components/authContext";
// Baza podataka 
import { getFirestore, getDoc, getDocs, collection, setDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

//Initialize Firebase
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


export const signIn = async (email, password, navigate,data)=>{
    try{
        await createUserWithEmailAndPassword(auth, email, password);
        addUser({});
        navigate('/home');
    } catch(err){
        console.error(err);
        alert(err);
    }

};

export const signInWithGoogle = async (navigate)=>{
    try{
        await signInWithPopup(auth, googleProvider);
        navigate('/home');
    } catch(err){
        console.error(err);
        alert(err);
    }

};

export const logIn = async (email, password, navigate)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/home');
    } catch(err){
        console.error(err);
        alert(err);
    }

};

export const logOut = async ()=>{
    try{
        await signOut(auth);
    } catch(err){
        console.error(err);
        alert(err);
    }

};


//Baza podataka

const db = getFirestore(app);
const Exercise = collection(db, "Exercise");
const Training = collection(db, "Training");
const TrainingPlan = collection(db, "TrainingPlan");
const User = collection(db, "User");

const addUser = async (data) => {
    try{
        await setDoc(doc(db, "User", auth.currentUser.uid), data);
    } catch(err){
        console.error(err);
    }
}

const getUsers = async () => {
    try{
        const data = await getDocs(User);
        const filteredData = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
    } catch(err){
        console.error(err);
    }
}
const getExercise = async () => {
    try{
        const data = await getDocs(Exercise);
        const filteredData = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
    } catch(err){
        console.error(err);
    }
}
const getTraining = async () => {
    try{
        const data = await getDocs(Training);
        const filteredData = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
    } catch(err){
        console.error(err);
    }
}
const getTrainingPlan = async () => {
    try{
        const data = await getDocs(TrainingPlan);
        const filteredData = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
    } catch(err){
        console.error(err);
    }
}


onAuthStateChanged(auth, (user)=>{
    
})