import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import RegistrationPage from './registration-page';
import LandingPage from './landing-page';
import '../styles/app.css';

export const App = () => {

	return (
		<div className="app">
			<h1>RoadRate</h1>
			<Route exact path="/" component={LandingPage} />
			{/* <Route exact path="/dashboard" component={Dashboard} /> */}
      <Route exact path="/register" component={RegistrationPage} />
		</div>
	)
}

export default withRouter(App);
