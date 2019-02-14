import React, {useState} from 'react';
import { Route, withRouter } from 'react-router-dom';
import RegistrationPage from './registration-page';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import LoginForm from './login-form';
import About from './about';
import '../styles/App.css';

export const App = () => {

	const [username, setUsername] = useState({ username: null });

	const storeUser = user => {
		localStorage.setItem("userId", username.username);
		setUsername(user);
	}
   
	return (
		<div className="app">
			<h1>RoadRate</h1>
			<Route exact path="/" component={LandingPage} />
			<Route exact path="/dashboard" component={Dashboard} user={username.username} /> 
			<Route exact path="/register" component={RegistrationPage} storeUser={storeUser} />
			<Route exact path="/login" component={LoginForm} storeUser={storeUser} />
			<Route exact path="/about" component={About} storeUser={storeUser} />
		</div>
	)
}

export default withRouter(App);
