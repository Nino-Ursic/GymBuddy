import React, { useState, useEffect } from "react";
import "./settings.css";
import { changeHeight, changeAge, changeUsername, changePassword, getUser } from '../config/firebase-config.js';

function Settings() {
  const [showHeightPrompt, setShowHeightPrompt] = useState(false);
  const [showAgePrompt, setShowAgePrompt] = useState(false);
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [currentHeight, setCurrentHeight] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser();
        setCurrentUsername(user.username);
        setCurrentHeight(user.height);
        setCurrentAge(user.age);
        setCurrentEmail(user.email);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };
    fetchUserData();
  }, []);

  const handleHeightChange = () => setShowHeightPrompt(true);
  const handleAgeChange = () => setShowAgePrompt(true);
  const handleUsernameChange = () => setShowUsernamePrompt(true);
  const handlePasswordChange = () => setShowPasswordPrompt(true);

  const submitHeight = async () => {
    if (height) {
      if(height < 0 || height > 300){
        alert("Height must be between 0 and 300");
      }else{
        try {
          await changeHeight(height);
          setCurrentHeight(height);
        } catch (err) {
          alert("Failed to update height.");
        }
        setShowHeightPrompt(false);
      }
    }
  };

  const submitAge = async () => {
    if (age) {
      if(age < 0 || age > 150){
        alert("Age must be between 0 and 150");
      }else{
        try {
          await changeAge(age);
          setCurrentAge(age);
        } catch (err) {
          alert("Failed to update age.");
        }
        setShowAgePrompt(false);
      }
    }
  };

  const submitUsername = async () => {
    if (username) {
      try {
        await changeUsername(username);
        setCurrentUsername(username);
      } catch (err) {
        alert("Failed to update username.");
      }
    }
    setShowUsernamePrompt(false);
  };

  const submitPassword = async () => {
    if (newPassword) {
      if(newPassword === repeatPassword){
        try {
          await changePassword(newPassword);
          alert("Password updated successfully!");
        } catch (err) {
          alert("Failed to update password.");
        }
      }else{
        alert("Passwords do not match!");
      }
    }
    setShowPasswordPrompt(false);
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="info-row email-row">
        <span>Email: {currentEmail}</span>
      </div>
      <div className="info-row">
        <span>Height: {currentHeight}</span>
        <button className="icon-button" onClick={handleHeightChange}>✎</button>
      </div>

      <div className="info-row">
        <span>Age: {currentAge}</span>
        <button className="icon-button" onClick={handleAgeChange}>✎</button>
      </div>

      <div className="info-row">
        <span>Username: {currentUsername}</span>
        <button className="icon-button" onClick={handleUsernameChange}>✎</button>
      </div>

      <button className="settings-button" onClick={handlePasswordChange}>Change Password</button>

      {showHeightPrompt && (
        <div className="prompt-container">
          <h3>Change Height</h3>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter new height"
          />
          <button onClick={submitHeight}>Submit</button>
          <button onClick={() => setShowHeightPrompt(false)}>Cancel</button>
        </div>
      )}

      {showAgePrompt && (
        <div className="prompt-container">
          <h3>Change Age</h3>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter new age"
          />
          <button onClick={submitAge}>Submit</button>
          <button onClick={() => setShowAgePrompt(false)}>Cancel</button>
        </div>
      )}

      {showUsernamePrompt && (
        <div className="prompt-container">
          <h3>Change Username</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter new username"
          />
          <button onClick={submitUsername}>Submit</button>
          <button onClick={() => setShowUsernamePrompt(false)}>Cancel</button>
        </div>
      )}

      {showPasswordPrompt && (
        <div className="prompt-container">
          <h3>Change Password</h3>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repeat Password"
          />
          <button onClick={submitPassword}>Submit</button>
          <button onClick={() => setShowPasswordPrompt(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Settings;
