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
import ProductPage from './components/productpage/ProductPage';
import VehiclePage from './components/vehiclepage/VehiclePage';

const Main = (props) => {
	history.listen((location, action) => {
		this.props.clearAlerts();
	});
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
						/>
					))}
					<Route path='/login' component={LoginPage} />
					{/* <PrivateRoute path='/products' component={ProductPage} />
					<PrivateRoute path='/vehicles' component={VehiclePage} /> */}
					{/* <Route path='/register' component={RegisterPage} /> */}
					<Redirect from='*' to='/' />
				</Switch>
			</Router>
		</div>
	);
};

Main.propTypes = {};

export default Main;
