import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
	component: Component,
	acceptable_user_roles,
	...rest
}) => {
	const user_role = useSelector((state) => state.user.user.user_role);
	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem('token') ? (
					user_role ? (
						acceptable_user_roles.includes(user_role) ? (
							<Component {...props} />
						) : null
					) : (
						<Redirect to='/login' />
					)
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
};
