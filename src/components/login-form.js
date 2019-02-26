import React, { useState } from 'react'; 
import { API_BASE_URL } from '../config';
import { Link, Redirect } from 'react-router-dom';

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState("")
  const [loggedIn, setLoggedIn] = useState(true)
  const [authError, setAuthError] = useState(false)
 
  const handleSubmit = e => {
    e.preventDefault(e); 

    setUsername(username)
    setLoggedIn(loggedIn)
    localStorage.removeItem("logout")

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

      return fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          username,
          password
        })
      })
      .then(res => {
        console.log('res', res.body)
        return res.json();
      })
      .then( ( auth ) => {  
        const { message, code, name } = auth;
        console.log(auth)

        if(code === 401 || message === 'Unauthorized' || name === 'AuthenticationError') {
          setAuthError(true)
          localStorage.setItem("error", name)
        }

        if (auth.hasOwnProperty("authToken")){
          localStorage.setItem("user", username);
          localStorage.setItem("loggedIn", loggedIn);
          localStorage.setItem("authToken", auth.authToken);
          localStorage.removeItem("error")
          setAuthToken(auth)
        }
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

  /* ==== RENDER VALIDATION ERROR MESSAGE ==== */
  let errorMessage;
  // console.log('errorMessage: ',errorMessage)
  if(authError && username.length > 0 ){
    errorMessage = <p>Login Failed. Check your credentials and resubmit.</p>
    setInterval(function(){ localStorage.removeItem('error') }, 2000);
  } else if (localStorage.error){
    errorMessage = <p>Login Failed. Check your credentials and resubmit.</p>
    setInterval(function(){ localStorage.removeItem('error') }, 2000);
  } else {
    errorMessage = <p></p>
  }

  return(
    <div className="login-container">
      {errorMessage}
      {
        localStorage.loggedIn ? (
          <Redirect to="/dashboard" />
        ) : (
          <form className="login-form"
            onSubmit={handleSubmit}
          >
            <label htmlFor="username">Username:
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="username"
              type="text"
              name="username"
              pattern="[A-Za-z0-9_]{1,15}"
              title="Username should only contain letters, numbers and underscores; no more than 15 characters e.g. Jojo_123"
              id="username"
              required
            />
            </label>
            <label htmlFor="password">Password:
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
              type="password"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$" 
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
            </label>
            <button waves="teal" type="submit" className="login-submit">
              {/* <Icon>thumb_up</Icon> */}
              Submit
            </button>
            <Link to="/">Back</Link>
          </form>
        )
        }
    </div>
    )};

export default LoginForm;