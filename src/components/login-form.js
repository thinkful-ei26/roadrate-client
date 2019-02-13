import React, { useState, useEffect } from 'react'; 
import { API_BASE_URL } from '../config';

console.log(API_BASE_URL);

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputValue, setValue] = useState("userInput placeholder");
  const [ user, setUser ] = useState(inputValue)
   
    // Use an async function so that we can await the fetch
    useEffect(async () => {
      // Call fetch as usual
      const res = await fetch(
        `${API_BASE_URL}/users`
      );
  
      // Pull out the data as usual
      const users = await res.json();
      console.log('USERS : ', users)
      setUser(users);
    }, [setUsername]); 
  
  const handleSubmit = e => {
    e.preventDefault(); 
    if (!username || !username) return;
    console.log(`user info: ${username} and ${password}`)
    setUsername(username)
    setPassword(password)
  }

  return(
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
  );
}

export default LoginForm;