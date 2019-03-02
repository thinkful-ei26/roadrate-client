import React, { useState, useEffect } from 'react'; 
import { Link, Redirect } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export const RegistrationForm = () => {
  // split state into different declarations
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [authToken, setAuthToken] = useState("") 
  const [loggedIn, setLoggedIn] = useState(true)
  const [validUsername, SetValidUsername] = useState('')
  const [validPassword, SetValidPassword] = useState('')
  const [modalOpen, setModalOpen] = useState(true);

  
  const logIn = data => {
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
        return res.json();
      })
      .then( ( auth ) => {  
        if (auth.hasOwnProperty("authToken")){
          localStorage.setItem("user", username);
          localStorage.setItem("loggedIn", loggedIn);
          localStorage.setItem("authToken", auth.authToken);
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
      });
  }

  const validateUsername = async (username) => {
    // send username to server on Change of `username` state
    // server should check if username exists 

    const res = await fetch(
      `${API_BASE_URL}/users/?search=${username}`
    );

    // Pull out the data from response
    const _username = await res.json();
   
    // if the username already exists in the DB
    if(_username.length > 0 && validUsername !== '') {
      localStorage.setItem('validUsername', `Username "${_username[0].username}" taken. Pick another.`)
      SetValidUsername(false)
      console.log(_username)
      return _username
    } 
    
    localStorage.setItem('validUsername', 'Valid Username')
    SetValidUsername(true)
    return _username;
  }

  const validatePassword = (password) => {
    if(password.length < 10) {
      return (
        <p>Password is invalid. Must contain at least one number and one uppercase and lowercase letter, and at least 10 or more characters</p>
      )
    } 
  }

  useEffect(() => {
    validatePassword(password);
    validateUsername(username);
  }, [username]) 
  
  const handleSubmit = e => {
    e.preventDefault(e); 
   
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
      localStorage.setItem("registered", true)
      return res.json();
      })
      .then(data => {
        logIn(data)
      })
      .catch(err => {
        if(err === 'TypeError: Failed to fetch'){
          return Promise.reject(err)
        }
      })
      };

  let usernameValidation;

  if(validUsername === ''){
    usernameValidation = <p></p>
  } else if (!validUsername) {
    usernameValidation = <p>{localStorage.validUsername}</p>
  }

  let passwordValidation;

  if(validPassword === ''){
    passwordValidation = <p></p>
  } else if (!passwordValidation) {
    passwordValidation = <p>Username is taken. Choose another.</p>
  }

  return (
    <div className="registration">
    {
      localStorage.loggedIn ? (
        <Redirect to="/dashboard" />
      ) : (
      <div className="registration-form">
        <form className="registration-form"
          onSubmit={handleSubmit}
        >
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="optional nickname"
            type="text"
            name="name"
            aria-labelledby="name"      
          />

          {usernameValidation}

          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="enter username"
            type="text"
            name="username"
            id="register-username"
            required
            aria-labelledby="username"    
          />
          {/* <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="enter password"
            type="password"
            name="password"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$" 
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 10 or more characters"
            aria-labelledby="password"  
          /> */}
          <fieldset className="registration-form-group">
            <input 
              className="registration-form-group-control" 
              type="password" 
              name="password" 
              autocomplete="new-password" 
              id="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="enter password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$" 
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 10 or more characters"
              aria-labelledby="password"  
            />
            <div className="registration-form-password-feedback min-length">
              <i className="registration-form-password-feedback-icon registration-form-password-feedback-icon-satisfied"></i>
                <span className="registration-form-password-feedback-criterion registration-form-password-feedback-criterion-satisfied">
                  8 characters minimum
                </span>
            </div>

            <div className="registration-form-password-feedback has-digit">
              <i className="registration-form-password-feedback-icon registration-form-password-feedback-icon-satisfied"></i>
                <span className="registration-form-password-feedback-criterion registration-form-password-feedback-criterion-satisfied">
                  One number
                </span>
            </div>
            
            <div className="registration-form-password-feedback has-letter">
              <i className="registration-form-password-feedback-icon registration-form-password-feedback-icon-satisfied"></i>
              <span className="registration-form-password-feedback-criterion registration-form-password-feedback-criterion-satisfied">
                One letter
              </span>
            </div>
            
            <div className="registration-form-password-feedback has-other">
              <span>
                <span 
                  data-for="tooltip_1" 
                  data-place="right" 
                  data-class="" 
                  data-tip="~!@#$%^&amp;*()-_=+[]{}|;:,\.<>/?" 
                  currentitem="false" 
                  // style="display: inline-block;"
                >
                  <i className="registration-form-password-feedback-icon"></i>
                  
                  <span className="registration-form-password-feedback-criterion">
                    One special character
                  </span>
                </span>
                
                <div 
                className="__react_component_tooltip place-top type-dark " 
                id="tooltip_1" 
                data-id="tooltip" 
                // style="left: 287px; top: 386px;"
                >
                  ~!@#$%^&amp;*()-_=+[]{}|;:,\.&lt;&gt;/?
                </div>
              </span>
            </div>
        </fieldset>

          <input
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
            type="password"
            name="passwordConfirm"
            required
            pattern={password} 
            title={`password: "${password}" & confirmPassword: "${confirmPassword}" must match`}
            aria-labelledby="confirm Password"  
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="enter email"
            type="email"
            name="email"
            pattern="^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$"
            required
            aria-labelledby="email"  
          />
          <input
            value={confirmEmail}
            onChange={e => setConfirmEmail(e.target.value)}
            placeholder="confirm email"
            type="email"
            name="emailConfirm"
            pattern={email}
            title={`email: "${email}" & confirmEmail: "${confirmEmail}" must match`}
            required
            aria-labelledby="confirm email"  
          />
          <button 
            waves="light "
            type="submit" 
            aria-labelledby="submit button registration form"  
            className="registration-submit"
            disabled={ !username || !password || !validUsername }
          >
            Submit
          </button>
          <Link to="/" className="registration-link" aria-labelledby="go back link to landing page"  >Go Back</Link>
        </form>
      </div>
      )}
      
    </div>
  );
}

export default RegistrationForm;