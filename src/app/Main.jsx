import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	HashRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { PrivateRoute } from './components/common/PrivateRoute';
import LoginPage from './components/pages/login/LoginPage';
import RegisterPage from './components/pages/register/RegisterPage';
import { privateRoutes } from './privateRoutes';
import { getUserProfile } from '../app/redux/actions/userActions';
import { selectIsLoading } from './redux/slices/userSlice';

const Main = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUserProfile());
	}, [dispatch]);
	const isLoading = useSelector(selectIsLoading);
	if (isLoading) {
		return <>Loading</>;
	}
	return (
		<div>
			<Router>
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
					<Route path='/register' component={RegisterPage} />
					<Redirect from='*' to='/' />
				</Switch>
			</Router>
		</div>
	);
};

Main.propTypes = {};

export default Main;
