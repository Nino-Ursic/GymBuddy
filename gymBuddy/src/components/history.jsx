import { useState } from "react";
import { getExercises, getUser } from "../config/firebase-config";

function History(){

    const [exercises, setExercises] = useState([]);
    
    function handleClick(){
        setExercises(getExercises());
    }

    return(
        <>
        <h1>HISTORY</h1>
        <button onClick={handleClick}>getUserData</button>
        </>
    );
}

export default History;