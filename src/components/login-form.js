import React, { useState } from 'react'; 
import { API_BASE_URL } from '../config';
import { Link, Redirect } from 'react-router-dom';
import { Button, Icon } from 'react-materialize';

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState("")
  const [loggedIn, SetLoggedIn] = useState(true)

  const handleSubmit = e => {
    e.preventDefault(); 
    if (!username || !username) return;
    if (!password || !password) return;

    localStorage.setItem("user", username);
    setUsername(username)
    localStorage.setItem("loggedIn", loggedIn);
    SetLoggedIn(loggedIn)
    localStorage.removeItem("logout")
    
    return fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
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
      .then( ( auth ) => {  
        localStorage.setItem("authToken", auth);
        setAuthToken(auth)
      return auth;
      })
      .catch(err => {
        const { code } = err;
        const message = code === 401 ? 'Incorrect username or password' : 'Unable to login, please try again';
        
        return Promise.reject(
          new Error({
            _error: message
          })
        )
      })
  };

  return(
    <div className="login-container">
      {
        localStorage.loggedIn ? (
          <Redirect to="/dashboard" />
        ) : (
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
    
            <Button waves="teal" type="submit" className="login-submit">
              <Icon>thumb_up</Icon>
              Submit
            </Button>
            <Link to="/">Back</Link>
          </form>
        )
        }
    </div>
  );
}

export default LoginForm;



// import React, { useState } from 'react'; 

// export function LoginForm() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   return(
//     <form className="login">
//       <label htmlFor="username">Username: </label>
//       <input
//         value={username}
//         onChange={e => setUsername(e.target.value)}
//         placeholder="Username"
//         type="text"
//         name="username"
//         required
//       />
//       <label htmlFor="password">Password: </label>
//       <input
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         placeholder="Password"
//         type="password"
//         name="password"
//         required
//       />
//       <button type="submit">
//         Submit
//       </button>
//     </form>
//   );
// }

// export default LoginForm;