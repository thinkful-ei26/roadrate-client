import React, { useState, useEffect } from 'react'; 
import { API_BASE_URL } from '../config';

console.log(API_BASE_URL);

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const initialFormState = { id: null, name: '', username: '' }
  const [ user, setUser ] = useState(initialFormState)
   
    // Use an async function so that we can await the fetch
    useEffect(async () => {
      // Call fetch as usual
      const res = await fetch(
        `${API_BASE_URL}/users`
      );
  
      // Pull out the data as usual
      const json = await res.json();
  
      console.log('JSON: ', json)
      setUser(json);
    }, []); // <-- we didn't pass a value. what do you think will happen?
  

  // const useFetch = url => {
  //   const [data, setData] = useState(null);
  //   const [loading, setLoading] = useState(true);
  
  //   // Similar to componentDidMount and componentDidUpdate:
  //   useEffect(async () => {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     const [item] = data.results;
  //     setData(item);
  //     setLoading(false);
  //   }, []);
  
  //   return { data, loading };
  // };

  // const { data, loading } = useFetch(`${API_BASE_URL}/users`);

  // console.log('data', data);

  // fetchComment(commentId) {
  //   // You can await here
  // }
  
  // useEffect(() => {
  //   fetchComment(commentId);
  // }, [commentId]);
  
  const handleSubmit = e => {
    const { username, password } = e.target;
    e.preventDefault(); 
    if (!username || !username) return
    console.log(`user info: ${username} and ${password}`)
    //call a fn that posts the userinputs to the db
    // call setUsername with that value
    setUsername()
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