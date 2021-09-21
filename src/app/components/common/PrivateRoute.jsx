import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			// TODO:
			!localStorage.getItem('user') ? (
				<Component {...props} />
			) : (
				<Redirect to='/login' />
			)
		}
	/>
);
