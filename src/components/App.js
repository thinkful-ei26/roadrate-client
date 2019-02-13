import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import '../styles/app.css';
import RegistrationPage from './registration-page';
import LoginForm from './login-form';
import LandingPage from './landing-page';

export const App = () => {
	return (
		<div className="app">
			<h1>RoadRate</h1>
			<Route exact path="/" component={LandingPage} />
			{/* <Route exact path="/dashboard" component={Dashboard} /> */}
      <Route exact path="/register" component={RegistrationPage} />

			{/* <div className="registration-form">
				<h2>Register</h2>
				<RegistrationForm/>
			</div>
			<div className="login-form">
				<h2>Login</h2>
				<LoginForm />
			</div>
			
			< LandingPage /> 
			<AddUserForm /> */}
		</div>
	)
}

export default withRouter(App);
