import React, {useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import RegistrationPage from './registration-page';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import '../styles/App.css';

export const App = () => {
   const [user, setUser] = useState({username: null})
 
   const storeUser = user => {
    localStorage.getItem("user");
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setUser({ username: null });
  };
  
	return (
		<div className="app">
			<h1>RoadRate</h1>
        { localStorage.user ? (
          <Route 
          exact path="/dashboard" 
          render={(props) => <Dashboard {...props} storeUser={storeUser} user={user.username} logout={logout} isAuthed={true} />}
          /> 
        ) : (
          <Route exact path="/register" component={RegistrationPage} />
        )}
			<Route exact path="/" component={LandingPage} />
		</div>
	)
}

export default withRouter(App);
