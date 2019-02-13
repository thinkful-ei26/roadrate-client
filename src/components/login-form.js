import React, { useState, useEffect } from 'react'; 

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    console.log('e', e.target.value);
    const { username, password } = e.target;
    e.preventDefault(); 
    if (!username || !username) return
    console.log(`user info: ${username} and ${password}`)
    //call a fn that posts the userinputs to the db
    // call setUsername with that value
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