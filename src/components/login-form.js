import React, { useState, setState } from 'react'; 
import { API_BASE_URL } from '../config';
import { Link, Redirect } from 'react-router-dom';
import { Button, Icon } from 'react-materialize';
import decode from 'jwt-decode';
import Input from 'react-materialize/lib/Input';


export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState("")
  const [loggedIn, setLoggedIn] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const authenticated = () => {
    setIsAuthenticated(isAuthenticated)
    const token = getToken()

    if (localStorage.token === undefined){
      localStorage.loggedIn = false
    }

    return !!token && !isTokenExpired(token)
  }

  const isTokenExpired = (token) => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000){
        return true;
      }
      else 
        return false;
    }
    catch (err) {
      return false;
    }
  }

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const noEntry = () => {
    return (
      <div>
        <p>Not a registered user</p>
      </div>
    )
  }

  const handleSubmit = e => {
    e.preventDefault(); 

    localStorage.setItem("user", username);
    setUsername(username)
    localStorage.setItem("loggedIn", loggedIn);
    setLoggedIn(loggedIn)
    localStorage.removeItem("logout")

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    if (authenticated()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    if (localStorage.authToken === undefined) {
      return noEntry
    }

    else {
      return fetch(`${API_BASE_URL}/login`, {
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
        localStorage.setItem("authToken", auth.authToken);
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
    }
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
            <label htmlFor="username">Username:
            <Input
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
            <Input
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
              type="password"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
            </label>
            <Button waves="teal" type="submit" className="login-submit">
              <Icon>thumb_up</Icon>
              Submit
            </Button>
            <Link to="/">Back</Link>
          </form>
        )
        }
    </div>
    )};

export default LoginForm;