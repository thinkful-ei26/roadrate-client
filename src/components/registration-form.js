import React, { useState, /* useEffect */ } from 'react'; 
import { Link, Redirect } from 'react-router-dom';
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
  const [authToken, setAuthToken] = useState("")
  const [loggedIn, SetLoggedIn] = useState(true)

  const logIn = (data) => {
    if (!username || username === '') return;
    if (!password || password === '') return;

    console.log('LOGIN', data)
    localStorage.setItem("user", username);
    localStorage.setItem("loggedIn", loggedIn);
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
  };

  const handleSubmit = e => {
    e.preventDefault(); 
    if (!username || username === '') return;
    if (!password || password === '') return;
    if (!confirmPassword || confirmPassword === '') return;
    if (!email || email === '') return;
    if (!confirmEmail || confirmEmail === '') return;
   
    console.log(`username: ${username}, password: ${password}, confirmPassword: ${confirmPassword}, email: ${email}, confirmEmail: ${confirmEmail}`)

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
      localStorage.setItem("registered", true)
      return res.json();
      })
      .then(data => {  
        console.log(data)
      return data
      })
      .then(data => {
        console.log('line 104: ', data)
        logIn(data)
      })
      .catch(err => console.log(err))
      };


      
  return (
    <div className="registration">
    {
        localStorage.loggedIn ? (
          <Redirect to="/dashboard" />
        ) : (
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
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
          <label htmlFor="passwordConfirm">Confirm Password: </label>
          <input
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            name="passwordConfirm"
            required
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
          <label htmlFor="email">E-mail: </label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            name="email"
            required
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
          <label htmlFor="emailConfirm">Confirm Email: </label>
          <input
            value={confirmEmail}
            onChange={e => setConfirmEmail(e.target.value)}
            placeholder="Confirm Email"
            type="email"
            name="emailConfirm"
            required
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
          <Button waves="light "type="submit" className="login-submit">
              <Icon>thumb_up</Icon>
              Submit
          </Button>
          <Link to="/">Go Back</Link>
        </form>
        )}
    </div>
  );
}

export default RegistrationForm;


// import React, {useEffect} from 'react'
// import ReactDOM from 'react-dom'
// import useValitedForm from './form-validation'
// import '../styles/registration-form.css';

// const initialState = {
//   name: '',
//   username: '',
//   password: '',
//   email: ''
// }

// //hold all validations fields
// const validations = [
//   {
//     name: 'name',
//     type: 'required',
//     stateMap: 'name'
//   },
//   {
//     name: 'username',
//     type: 'required',
//     stateMap: 'username'
//   },
//   {
//     name: 'password',
//     type: 'required',
//     stateMap: 'password'
//   },
//   {
//     name: 'email',
//     type: 'required',
//     stateMap: 'email'
//   },
//   {
//     name: 'email',
//     type: 'isEmail',
//     stateMap: 'email'
//   }
// ]

// function RegistrationForm () {
//   const [formData, validation, validateForm, getData] = useValitedForm(initialState, validations)

//   const submit = (event) => {
//     event.preventDefault()
    
//     const valid = validateForm()
//     console.log(getData())  // returns the data from the submit
//   }

//   const hasError = (field) => validation.errors[field].length > 0
//   return (
//     <form 
//       className='validated-form' 
//       noValidate={true} 
//       onSubmit={submit}
//     >
//       <div className={ hasError('name') ? 'validated-form__control error': 'validated-form__control' }>
//         <label htmlFor='name'>Name</label>
//         <input 
//           name='name' 
//           id='name' { ...formData.name.input } 
//         />
//         <div className='validated-form__errors'>
//           { validation.errors.name.join(', ')}
//         </div>
//       </div>
//       <div className={ hasError('username') ? 'validated-form__control error': 'validated-form__control' }>
//         <label htmlFor='username'>Username</label>
//         <input name='username' id='username' { ...formData.username.input } />
//         <div className='validated-form__errors'>
//           { validation.errors.username.join(', ')}
//         </div>
//       </div>
//       <div className={ hasError('password') ? 'validated-form__control error': 'validated-form__control' }>
//         <label htmlFor='password'>Password</label>
//         <input name='password' id='password' { ...formData.password.input } />
//         <div className='validated-form__errors'>
//           { validation.errors.password.join(', ')}
//         </div>
//       </div>
//       <div className={ hasError('email') ? 'validated-form__control error': 'validated-form__control' }>
//         <label htmlFor='email'>Email</label>
//         <input name='email' id='email' { ...formData.email.input } />
//         <div className='validated-form__errors'>
//           { validation.errors.email.join(', ')}
//         </div>
//       </div>
//       <div className='validated-form__actions'>
//         <input disabled={!validation.valid} className='btn' type="submit" value="Submit" />
//       </div>
//     </form>
//   )
// }

// export default RegistrationForm;


/* ==== VALIDATION EXAMPLE ===== */

// import React, {useEffect} from 'react'
// import ReactDOM from 'react-dom'
// import useValitedForm from './form-validation'

// const initialState = {
//   firstName: '',
//   lastName: '',
//   email: ''
// }

// const validations = [
//   {
//     name: 'firstName',
//     type: 'required',
//     stateMap: 'firstName'
//   },
//   {
//     name: 'lastName',
//     type: 'required',
//     stateMap: 'lastName'
//   },
//   {
//     name: 'email',
//     type: 'required',
//     stateMap: 'email'
//   },
//   {
//     name: 'email',
//     type: 'isEmail',
//     stateMap: 'email'
//   }
// ]

// function RegistrationForm () {
//   const [formData, validation, validateForm, getData] = useValitedForm(initialState, validations)
//   const submit = (event) => {
//     event.preventDefault()
//     const valid = validateForm()
//     console.log(getData())  // returns the data from the submit
//   }
//   const hasError = (field) => validation.errors[field].length > 0
//   return (
//     <form className='validated-form' noValidate={true} onSubmit={submit}>
//       <div className={ hasError('firstName') ? 'validated-form__control error': 'validated-form__control' }>
//         <label htmlFor='first-name'>First name</label>
//         <input name='first-name' id='first-name' { ...formData.firstName.input } />
//         <div className='validated-form__errors'>
//           { validation.errors.firstName.join(', ')}
//         </div>
//       </div>
//       <div className={ hasError('lastName') ? 'validated-form__control error': 'validated-form__control' }>
//         <label htmlFor='last-name'>Last name</label>
//         <input name='last-name' id='last-name' { ...formData.lastName.input } />
//         <div className='validated-form__errors'>
//           { validation.errors.lastName.join(', ')}
//         </div>
//       </div>
//       <div className={ hasError('email') ? 'validated-form__control error': 'validated-form__control' }>
//         <label htmlFor='email'>Email</label>
//         <input name='email' id='email' { ...formData.email.input } />
//         <div className='validated-form__errors'>
//           { validation.errors.email.join(', ')}
//         </div>
//       </div>
//       <div className='validated-form__actions'>
//         <input disabled={!validation.valid} className='btn' type="submit" value="Submit" />
//       </div>
//     </form>
//   )
// }

// export default RegistrationForm;


/* ====== WORKING VERSION ====== */

// import React, { useReducer, useRef, useState } from "react";
// import { Link } from 'react-router-dom';
// import { API_BASE_URL } from '../config';
// import { Button, Icon } from 'react-materialize';
// import "../styles/App.css";

// export const RegistrationForm = () => {
//   // split state into different declarations
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [email, setEmail] = useState("")
//   const [confirmEmail, setConfirmEmail] = useState("")


//   const handleSubmit = e => {
//     e.preventDefault(); 
//     if (!username || !username) return;
//     if (!password || !password) return;
//     if (!confirmPassword || !confirmPassword) return;
//     if (!email || !email) return;
//     if (!confirmEmail || !confirmEmail) return;
   
//     console.log(`username: ${username}, password: ${password}, confirmPassword: ${confirmPassword}, email: ${email}, confirmEmail: ${confirmEmail}`)

//     setUsername(username);
//     setPassword(password);
//     setConfirmPassword(confirmPassword);
//     setEmail(email);
//     setConfirmEmail(confirmEmail);

//     return fetch(`${API_BASE_URL}/users`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify({
//         name,
//         username,
//         password,
//         confirmPassword,
//         email,
//         confirmEmail
//       })
//     })
//     .then(res => {
//       console.log('res', res)
//       return res.json();
//       })
//       .then(data => {  
//       return data.name && data.username && data.password && data.email;
//       })
//       .catch(err => console.log(err))
//       };

//   return (
//     <form className="registration-form"
//       onSubmit={handleSubmit}
//     >
//       <label htmlFor="name">Name: </label>
//       <input
//         value={name}
//         onChange={e => setName(e.target.value)}
//         placeholder="Name"
//         type="text"
//         name="name"
//         required
//       />
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
//        <label htmlFor="passwordConfirm">Confirm Password: </label>
//       <input
//         value={confirmPassword}
//         onChange={e => setConfirmPassword(e.target.value)}
//         placeholder="Confirm Password"
//         type="password"
//         name="passwordConfirm"
//         required
//       />
//       <label htmlFor="email">E-mail: </label>
//       <input
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         placeholder="Email"
//         type="email"
//         name="email"
//         required
//       />
//        <label htmlFor="emailConfirm">Confirm Email: </label>
//       <input
//         value={confirmEmail}
//         onChange={e => setConfirmEmail(e.target.value)}
//         placeholder="Confirm Email"
//         type="email"
//         name="emailConfirm"
//         required
//       />
//       <Button waves="light "type="submit" className="login-submit">
//           <Icon>thumb_up</Icon>
//           Submit
//       </Button>
//       <Link to="/">Go Back</Link>
//     </form>
//   );
// }

// export default RegistrationForm;





/* ======= VALIDATOR COMPONENT TEST ====== */

// import React, { useReducer, useRef, useState } from "react";
// import { Validation, Validator, ValidationHelper } from "./validation";
// import { Link } from 'react-router-dom';
// import { API_BASE_URL } from '../config';
// import { Button, Icon } from 'react-materialize';
// import "../styles/App.css";

// const initialFrom = () => ({
//   name: "",
//   phoneNumber: ""
// });

// const formReducer = (state, action) => {
//   let newValue = {};
//   newValue[action.name] = action.value;
//   return Object.assign({}, state, newValue);
// };

// const errorReducer = (allError, error) => {
//   return Object.assign({}, allError, error);
// };

// export const RegistrationForm = () => {
//   // split state into different declarations
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [email, setEmail] = useState("")
//   const [confirmEmail, setConfirmEmail] = useState("")
  
//   let validationRef = useRef(null);
//   let [form, dispatch] = useReducer(formReducer, {}, initialFrom);
//   let [error, dispatchError] = useReducer(errorReducer, {});

//   const handleChange = evt => {
//     dispatch({
//       name: evt.target.name,
//       value: evt.target.value
//     });
//   };

//   const onValidate = err => {
//     console.log("onvalidate error", err, error);
//     dispatchError(err);
//   };

//   const submitForm = () => {
//     validationRef.current.validate();
//     console.log("over all errors ", error);
//   };

//   const numberValidation = value => {
//     return isNaN(value.trim()) ? "Value should be number" : "";
//   };

//   const phoneNumberValidation = value => {
//     return /[0-9]{10}/.test(value.trim()) ? "" : "Invalid phone number";
//   };

//   const handleSubmit = e => {
//     e.preventDefault(); 
//     if (!username || !username) return;
//     if (!password || !password) return;
//     // if (!confirmPassword || !confirmPassword) return;
//     // if (!email || !email) return;
//     // if (!confirmEmail || !confirmEmail) return;
   
//     console.log(`username: ${username}, password: ${password}, confirmPassword: ${confirmPassword}, email: ${email}, confirmEmail: ${confirmEmail}`)

//     setUsername(username);
//     setPassword(password);
//     setConfirmPassword(confirmPassword);
//     setEmail(email);
//     setConfirmEmail(confirmEmail);

//     return fetch(`${API_BASE_URL}/users`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify({
//         name,
//         username,
//         password,
//         confirmPassword,
//         email,
//         confirmEmail
//       })
//     })
//     .then(res => {
//       console.log('res', res)
//       return res.json();
//       })
//       .then(data => {  
//       return data.name && data.username && data.password && data.email;
//       })
//       .catch(err => console.log(err))
//       };

// return (
//   <div className="registerForm">
//     <h4>Register Form</h4>
//     <Validation ref={validationRef}>
//       <InputControl>
//         <label htmlFor="">Name</label>
//         <Validator
//           name="name"
//           value={form.name}
//           validations={[ValidationHelper.required("Name is required")]}
//           onValidate={onValidate}
//         >
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//           />
//         </Validator>
//         {error.name && <span className="error">{error.name}</span>}
//       </InputControl>

//       <InputControl>
//         <label htmlFor="">Phone Number</label>
//         <Validator
//           name="phoneNumber"
//           value={form.phoneNumber}
//           validations={[
//             ValidationHelper.required("phoneNumber is required"),
//             phoneNumberValidation
//           ]}
//           onValidate={onValidate}
//         >
//           <input
//             type="text"
//             name="phoneNumber"
//             value={form.phoneNumber}
//             onChange={handleChange}
//           />
//         </Validator>
//         {error.phoneNumber && (
//           <span className="error">{error.phoneNumber}</span>
//         )}
//       </InputControl>
//     </Validation>
//     <button onClick={submitForm}>Submit</button>
//   </div>
// );
// }

// function InputControl(props) {
// return <div className="input-control" {...props} />;
// }

// export default RegistrationForm;