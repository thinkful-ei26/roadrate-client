import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';

export const Dashboard = (props) => {
  const [username, setUsername] = useState("");
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (!localStorage.authToken && !localStorage.loggedIn) {
      setLogout(false)
      return <Redirect to="/" /> 
    }
    setUsername(localStorage.user)
  }, [logout])

  return (
    <div className="dashboard">
    <div className="dashboard-greeting">
      <h2>Hello @{username}!</h2>
      <button onClick={() => {
        props.logout()
        setLogout(false)
        }
      }>
        Logout
      </button>
    </div>
    </div> 
  )
}

export default Dashboard;

