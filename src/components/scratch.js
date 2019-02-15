import React, { useReducer, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { Button, Icon } from 'react-materialize';
import "../styles/App.css";

export const RegistrationForm = () => {
  // split state into different declarations
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")


  const handleSubmit = e => {
    e.preventDefault(); 
   
    setUsername(username);
    setPassword(password);
    setConfirmPassword(confirmPassword);
    setEmail(email);
    setConfirmEmail(confirmEmail);

    return fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        username,
        password,
        confirmPassword,
        email,
        confirmEmail
      })
    })
    .then(res => {
      console.log('res', res)
      return res.json();
      })
      .then(data => {  
        console.log('data from registration', data)
      })
      .catch(err => console.log(err))
      };

  return (
    <form className="registration-form"
      onSubmit={handleSubmit}
    >
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
      <label htmlFor="email">E-mail: </label>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        name="email"
        required
      />
       <label htmlFor="emailConfirm">Confirm Email: </label>
      <input
        value={confirmEmail}
        onChange={e => setConfirmEmail(e.target.value)}
        placeholder="Confirm Email"
        type="email"
        name="emailConfirm"
        required
      />
      <Button waves="light "type="submit" className="login-submit">
          <Icon>thumb_up</Icon>
          Submit
      </Button>
      <Link to="/">Go Back</Link>
    </form>
  );
}

export default RegistrationForm;