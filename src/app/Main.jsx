import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './utils';
import { alertActions } from './redux/actions';
import { PrivateRoute } from './components/PrivateRoute';
import { LoginPage } from './components/login/LoginPage';
import HomePage from './components/homepage/HomePage';

const Main = (props) => {
	history.listen((location, action) => {
		this.props.clearAlerts();
	});
	return (
		<div>
			<Router history={history}>
				<Switch>
					<Route exact path='/' component={HomePage} />
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
