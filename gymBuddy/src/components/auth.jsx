// Auth Component CSS
import React, { useState } from "react";
import { signIn, signInWithGoogle, logIn, logOut } from "../config/firebase-config";
import "./Auth.css"; // Ensure this file exists
import { useNavigate } from "react-router-dom";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [gender, setGender] = useState('');

    const navigate = useNavigate();


    const [register, setRegister] = useState(false);
    const [user, setUser] = useState({
        username: '',
        age: 0,
        height: 0,
        weight: 0,
        gender: ''
    })
    
    function handleRegister(){
        if(!register){
            setRegister(true);
        }
        else{
            const novi = {
                username: username,
                age: age,
                height: height,
                weight: weight,
                gender: gender
            }
            setUser(novi);
            console.log(user);
            setRegister(false);
            signIn(email, password, navigate, {...novi});
        }
    }

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <div className="auth-input-container">
                <input
                    className="auth-input"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="auth-input-container">
                <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {register &&
            <>                
            <div className="auth-input-container">
                <input
                    className="auth-input"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="auth-input-container">
                <input
                    className="auth-input"
                    type="number"
                    placeholder="Age"
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <div className="auth-input-container">
                <input
                    className="auth-input"
                    type="number"
                    placeholder="Height (cm)"
                    onChange={(e) => setHeight(e.target.value)}
                />
            </div>
            <div className="auth-input-container">
                <input
                    className="auth-input"
                    type="number"
                    placeholder="Weight (kg)"
                    onChange={(e) => setWeight(e.target.value)}
                />
            </div>
            <div className="auth-input-container">
                <div className='auth-radio-group'>
                <label className="auth-radio-label">
                <input
                    className="auth-input"
                    type="radio"
                    name="gender"
                    value="M"
                    checked={gender==="M"}
                    onChange={(e) => setGender(e.target.value)}
                />
                <span className="auth-radio-custom"></span>
                M
                </label>
                <label className="auth-radio-label">
                <input
                    className="auth-input"
                    type="radio"
                    name="gender"
                    value="F"
                    checked={gender==="F"}
                    onChange={(e) => setGender(e.target.value)}
                />
                <span className="auth-radio-custom"></span>
                F
                </label>
                </div>
            </div>
            </>
            }
            <div className="auth-btn-container">
                <button className="auth-btn signin-btn" onClick={() => {handleRegister()}}>
                    Register
                </button>
            </div>
            {!register &&
            <>
            <div className="auth-btn-container">
                <button className="auth-btn google-btn" onClick={() => {signInWithGoogle(navigate)}}>
                    Sign in with Google
                </button>
            </div>
            <div className="auth-btn-container">
                <button className="auth-btn login-btn" onClick={() => {logIn(email, password, navigate)}}>
                    Log in
                </button>
            </div>
            <div className="auth-btn-container">
                <button className="auth-btn logout-btn" onClick={()=> navigate('/home')}>
                    continue without
                </button>
            </div>
            </>
            }
        </div>
    );
}

export default Auth;
