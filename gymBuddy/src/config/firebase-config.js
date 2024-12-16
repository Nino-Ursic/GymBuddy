import { initializeApp } from "firebase/app";
// Autentifikacija
import {getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { useAuth } from "../components/authContext";
// Baza podataka 
import { getFirestore, getDoc, getDocs, collection, setDoc, addDoc, deleteDoc, updateDoc, doc, query, where, Timestamp, arrayUnion } from "firebase/firestore";
import { useState } from "react";


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
        const completeData = {...data, favourite: [], isAdmin:false, createdAt: Timestamp.fromDate(new Date()), history: [], trainingId: "", email: auth.currentUser.identifier};
        addUser(completeData);
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


export const addUser = async (data) => {
    try{
        await setDoc(doc(User, auth.currentUser.uid), data);
    } catch(err){
        console.error(err);
    }
}

export const addExercise = async (data)  => {
    try{
        await addDoc(Exercise, data);
    } catch(err){
        console.error(err);
    }
}

export const addTraining = async (data)  => {
    try{
        await addDoc(Training, data);
    } catch(err){
        console.error(err);
    }
}

export const addTrainingPlan = async (data)  => {
    try{
        await addDoc(doc(TrainingPlan), data);
    } catch(err){
        console.error(err);
    }
}

export const addFavourites = async (exercise) => {
    try{
        await updateDoc(doc(User, auth.currentUser.uid), {
            favourite: arrayUnion(exercise)
        })
    } catch(err){
        console.error(err);
    }
}

export const getUser = async () => {
    try{
        const data = await getDoc(doc(db, 'User', auth.currentUser.uid));
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

