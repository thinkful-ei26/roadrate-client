import React, {useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import RegistrationPage from './registration-page';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import LoginForm from './login-form';
import ClaimPlate from './claim-plate';
import PublicPlate from './public-plate';
import MyPlatesList from './my-plates-list';
import MyPlate from './my-plate';
import About from './about';
import MyReviews from './my-reviews'
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
		<section className="app">
        { localStorage.user ? (
          <Route 
          exact path="/dashboard" 
          render={(props) => <Dashboard {...props} storeUser={storeUser} user={user.username} logout={logout} isAuthed={true} />}
          /> 
        ) : (
          <Route exact path="/register" component={RegistrationPage} />
        )}
			<Route exact path="/" component={LandingPage} />
      {/* <Route exact path="/create-plate" component={CreatePlatePage} /> */}
      <Route path="/plate" component={PublicPlate} />
			<Route exact path="/login" component={LoginForm} storeUser={storeUser} />
			<Route exact path="/about" component={About} storeUser={storeUser} />
      <Route exact path="/claim-plate" component={ClaimPlate} storeUser={storeUser} />
      <Route exact path="/my-plates" component={MyPlatesList} storeUser={storeUser} /> 
      <Route path="/my-plates/id" component={MyPlate} storeUser={storeUser} />
      <Route exact path="/my-reviews" component={MyReviews} />
		</section>
	)
}

export default withRouter(App);
