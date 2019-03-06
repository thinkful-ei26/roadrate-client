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
  // eslint-disable-next-line no-unused-vars
  const [authToken, setAuthToken] = useState("") 
  const [loggedIn, setLoggedIn] = useState(true)
  // const [modalOpen, setModalOpen] = useState(true);
  const [validUsername, SetValidUsername] = useState('')
  const [validPasswordLength, SetValidPasswordLength] = useState(false)
  const [validPasswordCharacters, SetValidPasswordCharacters] = useState(false)

  /* ====== LOGIN USER AFTER SUCCESSFUL REGISTRATION ====== */
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

   /* ====== USERNAME VALIDATION ====== */
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
      return _username
    } 
    
    localStorage.setItem('validUsername', 'Valid Username')
    SetValidUsername(true)
    return _username;
  }

  /* ====== PASSWORD VALIDATION ====== */
  const re = /\w*[A-Z]\w*[A-Za-z0-9]\w*/g;
  const validatePassword = (password) => {

    if(password.length && !password.length > 8) { //length is greater than 8
     localStorage.setItem("validPasswordLength", false);
    } else if (password.length && password.length >= 8 && password.length <= 72) {
      SetValidPasswordLength(true)
      localStorage.setItem("validPasswordLength", true)
    } else if (re.test(password)) {
      SetValidPasswordCharacters(true)
      localStorage.setItem("validPasswordCharacters", true);
    }
    else {
      SetValidPasswordLength(false)
      SetValidPasswordCharacters(false)
      localStorage.setItem("validPasswordLength", false)
      localStorage.setItem("validPasswordCharacters", false);
    }
  }

  /* ====== USEEFFECT ====== */
  useEffect(() => {
    validatePassword(password);
    validateUsername(username);
  }, [username, password]) 
  
   /* ====== HANDLE FORM SUBMIT ====== */
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

  /* ====== JSX USERNAME VALIDATION ====== */
  let usernameValidation;

  if(validUsername === ''){
    usernameValidation = <p></p>
  } else if (!validUsername) {
    usernameValidation = <p>{localStorage.validUsername}</p>
  }

  /* ====== JSX PASSWORD VALIDATION ====== */
  let passwordValidation;
  console.log(password)
  if(password === '') {
    passwordValidation = null
  } else if (validPasswordLength && validPasswordCharacters) {
    passwordValidation = (
      <div>
        <p className="valid-password">
          <span><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>8 characters minimum</span>
        </p>
        <p className="valid-password test1">
          <span><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>Atleast 1 capital letter</span>
        </p>
      </div>
    )
  } else if (!validPasswordLength && validPasswordCharacters) {
    passwordValidation = (
      <div>
        <p className="invalid-password">
        8 characters minimum
        </p>
        <p className="valid-password test2">
          <span><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>Atleast 1 capital letter</span>
        </p>
      </div>
    )
  } else if (validPasswordLength && !validPasswordCharacters) {
    passwordValidation = (
      <div>
        <p className="valid-password">
        8 characters minimum
        </p>
        <p className="invalid-password test3">
          Atleast 1 Capital Letter
        </p>
      </div>
    )
  } else if (validPasswordLength) {
    passwordValidation = (
      <div>
        <p className="valid-password">
           <span><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>8 characters minimum</span>
        </p>
      </div>
    )
  } else if (validPasswordCharacters) {
    passwordValidation = (
      <div>
        <p className="valid-password test4">
           <span><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>Atleast 1 capital letter</span>
        </p>
      </div>
    )
  } else {
    passwordValidation = (
      <div>
        <p className="invalid-password">
          8 characters minimum
        </p>
        <p className="invalid-password">
          Atleast 1 capital letter
        </p>
      </div>
    )
  }

  /* ====== RENDER JSX ====== */
  return (
    <section className="registration">
    {
      localStorage.loggedIn ? (
        <Redirect to="/dashboard" />
      ) : (
      <article className="registration-form">
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

          {/* ====== USERNAME VALIDATION ====== */}
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
          <fieldset className="registration-form-group">
            <input 
              className="registration-password-input" 
              type="password" 
              name="password" 
              autoComplete="new-password" 
              id="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="enter password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$" 
              title="Must contain at least one number and one uppercase letter and at least 8 or more characters"
              aria-labelledby="password"  
            />

            {/* ====== PASSWORD VALIDATION ====== */}
            {passwordValidation}

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
          <Link 
            to="/" 
            className="registration-link" 
            aria-labelledby="go back link to landing page"
          >
            Go Back
          </Link>
        </form>
      </article>
      )}   
    </section>
  );
}

export default RegistrationForm;