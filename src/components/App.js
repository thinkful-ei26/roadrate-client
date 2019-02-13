import React from 'react';
import '../styles/app.css';
import RegistrationForm from './registration-form';
// import AddUserForm from './AddUserForm';
import LoginForm from './login-form';
// import LandingPage from './landing-page';

export const App = () => {
	return (
		<div className="container">
			<h1>RoadRate</h1>
			<div className="registration-form">
				<h2>Register</h2>
				<RegistrationForm/>
			</div>
			<div className="login-form">
				<h2>Login</h2>
				<LoginForm />
			</div>
			
			{/* < LandingPage /> */}
			{/* <AddUserForm /> */}
		</div>
	)
}

export default App
