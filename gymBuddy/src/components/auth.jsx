// Auth Component CSS
import React, { useState } from "react";
import { signIn, signInWithGoogle, logIn, logOut } from "../config/firebase-config";
import "./Auth.css"; // Ensure this file exists

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                <button className="auth-btn signin-btn" onClick={() => signIn(email, password)}>
                    Sign in
                </button>
            </div>
            <div className="auth-btn-container">
                <button className="auth-btn google-btn" onClick={signInWithGoogle}>
                    Sign in with Google
                </button>
            </div>
            <div className="auth-btn-container">
                <button className="auth-btn login-btn" onClick={() => logIn(email, password)}>
                    Log in
                </button>
            </div>
            <div className="auth-btn-container">
                <button className="auth-btn logout-btn" onClick={logOut}>
                    Log out
                </button>
            </div>
        </div>
    );
}

export default Auth;
