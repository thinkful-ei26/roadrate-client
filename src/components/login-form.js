import React, { useState } from 'react'; 

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return(
    <form className="login">
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
      <button type="submit">
        Submit
      </button>
    </form>
  );
}

export default LoginForm;