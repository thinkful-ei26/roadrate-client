import React, { useReducer, useRef, useState } from "react";
import { Link } from 'react-router-dom';
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


  const handleSubmit = e => {
    e.preventDefault(); 
    if (!username || !username) return;
    if (!password || !password) return;
    if (!confirmPassword || !confirmPassword) return;
    if (!email || !email) return;
    if (!confirmEmail || !confirmEmail) return;
   
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
      return res.json();
      })
      .then(data => {  
      return data.name && data.username && data.password && data.email;
      })
      .catch(err => console.log(err))
      };

  return (
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
      />
       <label htmlFor="passwordConfirm">Confirm Password: </label>
      <input
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        type="password"
        name="passwordConfirm"
        required
      />
      <label htmlFor="email">E-mail: </label>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        name="email"
        required
      />
       <label htmlFor="emailConfirm">Confirm Email: </label>
      <input
        value={confirmEmail}
        onChange={e => setConfirmEmail(e.target.value)}
        placeholder="Confirm Email"
        type="email"
        name="emailConfirm"
        required
      />
      <Button waves="light "type="submit" className="login-submit">
          <Icon>thumb_up</Icon>
          Submit
      </Button>
      <Link to="/">Go Back</Link>
    </form>
  );
}

export default RegistrationForm;





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