import React, { useState, useEffect } from 'react'; 
import { API_BASE_URL } from '../config';

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState("")

  const handleSubmit = e => {
    e.preventDefault(); 
    if (!username || !username) return;
    if (!password || !password) return;

    setUsername(username)
   
    return fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'BEARER-TOKEN': setAuthToken
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(res => {
      console.log('res', res)
      return res.json();
      })
      .then(auth => {  
        console.log('authToken: ',auth)
        setAuthToken(auth)
      return auth;
      })
      .catch(err => console.log(err))
      };
  return(
    <div>
      <div>{authToken.authToken}</div>
      
      <form className="login-form"
            onSubmit={handleSubmit}
      >
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
        <button type="submit" className="login-submit">
          Submit
        </button>
      </form>
    </div>
    
  );
}

export default LoginForm;