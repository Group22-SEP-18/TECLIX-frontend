import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectUserRole } from '../../redux/slices/userSlice';

export const PrivateRoute = ({
	component: Component,
	acceptable_user_roles,
	...rest
}) => {
	const user_role = useSelector(selectUserRole);
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
						<Component {...props} />
					)
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
};
