import React, { useState } from 'react'; 
//useState allows you to access and manipulate state components
import "../styles/app.css";

export const RegistrationForm = () => {
  // split state into different declarations
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <form className="registration">
      <label htmlFor="name">Name: </label>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        type="text"
        name="name"
        required
      />
      <label htmlFor="username">Username: </label>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        type="text"
        name="username"
        required
      />
      <label htmlFor="password">Password: </label>
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        name="password"
        required
      />
       <label htmlFor="passwordConfirm">Confirm Password: </label>
      <input
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        type="password"
        name="passwordConfirm"
        required
      />
      <button type="submit" className="register-submit">
        Submit
      </button>
    </form>
  );
}

export default RegistrationForm;