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
import ProductPage from './components/productpage/ProductPage';
import VehiclePage from './components/vehiclepage/VehiclePage';

const Main = (props) => {
	history.listen((location, action) => {
		this.props.clearAlerts();
	});
	return (
		<div>
			<Router>
				<Switch>
					<PrivateRoute exact path='/' component={HomePage} />
					<PrivateRoute exact path='/products' component={ProductPage} />
					<PrivateRoute exact path='/vehicles' component={VehiclePage} />
					<Route path='/login' component={HomePage} />
					{/* <Route path='/register' component={RegisterPage} /> */}
					<Redirect from='*' to='/' />
				</Switch>
			</Router>
		</div>
	);
};

Main.propTypes = {};

export default Main;
