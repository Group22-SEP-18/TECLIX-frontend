import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { PrivateRoute } from './components/common/PrivateRoute';
import { history } from './utils';
import LoginPage from './components/pages/login/LoginPage';
import { privateRoutes } from './privateRoutes';

const Main = (props) => {
	return (
		<div>
			<Router history={history}>
				<Switch>
					{privateRoutes.map((pr, i) => (
						<PrivateRoute
							key={i}
							exact
							path={pr.path}
							component={pr.component}
							acceptable_user_roles={pr.acceptable_user_roles}
						/>
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
