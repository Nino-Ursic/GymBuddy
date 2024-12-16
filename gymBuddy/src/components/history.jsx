import { useState } from "react";
import { getExercises, getUser, addExercise, addTraining } from "../config/firebase-config";

function History(){

    function handleClick() {
        getUser();
    }

    return(
        <>
        <h1>HISTORY</h1>
        <button onClick={handleClick}>getUserData</button>
        </>
    );
}

export default History;