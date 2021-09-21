import {
	getUserPending,
	getUserSuccess,
	getUserFail,
} from '../slices/userSlice';
import {
	registrationPending,
	registrationSuccess,
	registrationError,
} from '../slices/registrationSlice';
import { fetchUser, userRegistration } from '../../../api/userApi';

export const getUserProfile = () => async (dispatch) => {
	try {
		dispatch(getUserPending());

		const result = await fetchUser();

		if (result.email && result.token) {
			return dispatch(getUserSuccess(result));
		}

		dispatch(getUserFail('User is not found'));
	} catch (error) {
		dispatch(getUserFail(error));
	}
};

export const UserRegistration = (formData) => async (dispatch) => {
	try {
		dispatch(registrationPending());

		const result = await userRegistration(formData);
		result.status === 'success'
			? dispatch(registrationSuccess(result.message))
			: dispatch(registrationError(result.message));

		console.log(result);
	} catch (error) {
		dispatch(registrationError(error.message));
	}
};
