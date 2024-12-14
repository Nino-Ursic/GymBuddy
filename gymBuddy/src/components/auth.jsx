// Auth Component CSS
import React, { useState } from "react";
import { signIn, signInWithGoogle, logIn, logOut } from "../config/firebase-config";
import "./Auth.css"; // Ensure this file exists
import { useNavigate } from "react-router-dom";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

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
            <div className="auth-btn-container">
                <button className="auth-btn signin-btn" onClick={() => {signIn(email, password, navigate)}}>
                    Register
                </button>
            </div>
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
        </div>
    );
}

export default Auth;
