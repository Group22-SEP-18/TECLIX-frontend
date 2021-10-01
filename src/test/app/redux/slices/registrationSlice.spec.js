import reducer, {
	registrationPending,
	registrationSuccess,
	registrationError,
} from '../../../../app/redux/slices/registrationSlice';

const initialState = {
	isLoading: false,
	status: '',
	message: '',
};

const mockedPayload = {
	user_role: 'OFFICER',
	email: 'payload.email',
	employee_no: 'payload.employee_no',
	first_name: 'payload.first_name',
	last_name: 'payload.last_name',
	contact_no: 'payload.mobile_number',
	password: 'password',
	confirm_password: 'confirm_password',
	profile_picture: '/avatars/default.png',
};

describe('customerSlice', () => {
	describe('reducers', () => {
		it('1) returns the initial state', () => {
			expect(reducer(undefined, {})).toEqual(initialState);
		});
		it('2) should set the loading state', () => {
			const previousState = initialState;
			const nextState = reducer(previousState, registrationPending());
			expect(nextState.isLoading).toEqual(true);
		});
		it('3) should set the succes state', () => {
			const previousState = initialState;
			const nextState = reducer(
				previousState,
				registrationSuccess(mockedPayload)
			);
			expect(nextState.isLoading).toEqual(false);
			expect(nextState.status).toEqual('success');
		});
		it('4) should set the failed state', () => {
			const previousState = initialState;
			const error = 'Error';
			const nextState = reducer(previousState, registrationError(error));
			expect(nextState.isLoading).toEqual(false);
			expect(nextState.message).toEqual(error);
			expect(nextState.status).toEqual('error');
		});
	});
});
