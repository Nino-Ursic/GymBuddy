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
    const [weight, setWeight] = useState({
        date: null,
        weight: 0
    });
    const [gender, setGender] = useState('');

    const navigate = useNavigate();


    const [register, setRegister] = useState(false);
    const [user, setUser] = useState({
        username: '',
        age: 0,
        height: 0,
        weight: {},
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
            };
            
            if (username.trim() === "") {
                alert("Username cannot be empty");
                return; 
            }
            
            if (age < 0 || age > 150) {
                alert("Age must be between 0 and 150");
                return; 
            }
            
            if (height < 0 || height > 300) {
                alert("Height must be between 0 and 300 cm");
                return; 
            }
            if (password === "") {
                alert("Password cannot be empty");
                return;
            }

            if (password.length < 6) {
                alert("Password must be at least 6 characters long");
                return;
            }

            if (!email.includes('@')) {
                alert("Email must contain '@'");
                return;
            }

            if (gender === "") {
                alert("Must choose gender");
                return;
            }
            
            setUser(novi);
            console.log(user); 
            setRegister(false);
            signIn(email, password, navigate, {...novi});
            
        }
    }

    function handleWeight(w){
        const temp = {
            date: new Date(),
            weight: w
        };
        setWeight(temp);
    }

    return (
        <div className="auth-container">
            <h2>GymBuddy</h2>
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
                    onChange={(e) => handleWeight(e.target.value)}
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
            <div className="auth-btn-container">
                <button className="auth-btn login-btn" onClick={() => {handleRegister()}}>
                    Log in
                </button>
            </div>
            </>
            }
            
            {!register &&
            <>
            <div className="auth-btn-container">
                <button className="auth-btn login-btn" onClick={() => {logIn(email, password, navigate)}}>
                    Log in
                </button>
            </div>
            <div className="google-btn-container">
                <button className="google-btn" onClick={() => {signInWithGoogle(navigate)}}>
                    <img className="googleImage" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"/>
                </button>
            </div>
            <div className="register-btn-container">
                <p className="register-text">Don't have an Account?</p>
                <button className="register-btn" onClick={() => {handleRegister()}}>
                    Sign up!
                </button>
            </div>
            <div className="auth-btn-container">
                <button className="guest-btn" onClick={()=> navigate('/home')}>
                    Continue without
                </button>
            </div>
            </>
            }
        </div>
    );
}

export default Auth;
