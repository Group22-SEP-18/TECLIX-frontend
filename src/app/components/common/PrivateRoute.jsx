import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
	component: Component,
	acceptable_user_roles,
	...rest
}) => {
	// const user_role = useSelector((state) => state.user.user.user_role);
	return (
		<Route
			{...rest}
			render={(props) =>
				!localStorage.getItem('token') ? (
					// &&
					// acceptable_user_roles.includes(user_role) ?
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
};
