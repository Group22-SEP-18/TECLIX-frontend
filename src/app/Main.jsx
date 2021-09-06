import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { history } from './utils';
import { LoginPage } from './components/login/LoginPage';
import HomePage from './components/homepage/HomePage';

const Main = (props) => {
	history.listen((location, action) => {
		this.props.clearAlerts();
	});
	return (
		<div>
			<Router>
				<Switch>
					<PrivateRoute exact path='/' component={HomePage} />
					<Route path='/login' component={LoginPage} />
					{/* <Route path='/register' component={RegisterPage} /> */}
					<Redirect from='*' to='/' />
				</Switch>
			</Router>
		</div>
	);
};

Main.propTypes = {};

export default Main;
