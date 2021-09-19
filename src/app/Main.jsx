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
import { privateRoutes } from './privateRoutes';

const Main = (props) => {
	history.listen((location, action) => {
		this.props.clearAlerts();
	});
	return (
		<div>
			<Router>
				<Switch>
					{privateRoutes.map((pr) => (
						<PrivateRoute path={pr.path} component={pr.component} />
					))}
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
