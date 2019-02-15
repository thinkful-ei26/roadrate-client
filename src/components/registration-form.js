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
        )}
    </div>
  );
}

export default RegistrationForm;



// import React, { useState } from 'react'; 
// //useState allows you to access and manipulate state components
// import "../styles/App.css";

// export function RegistrationForm() {
//   // split state into different declarations
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   return (
//     <form className="registration">
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
//       <button type="submit">
//         Submit
//       </button>
//     </form>
//   );
// }

// export default RegistrationForm;