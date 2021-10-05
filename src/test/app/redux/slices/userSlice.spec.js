import reducer, {
	getUserPending,
	getUserFail,
	getUserSuccess,
} from '../../../../app/redux/slices/userSlice';

const initialState = {
	user: {},
	isLoading: false,
	error: '',
};

const mockUser = {
	email: 'payload.email',
	employee_no: 'payload.employee_no',
	first_name: 'payload.first_name',
	last_name: 'payload.last_name',
	mobile_number: 'payload.mobile_number',
	user_role: 'MANAGER',
	profile_picture: 'payload.profile_picture',
};

describe('userSlice', () => {
	describe('reducers', () => {
		it('1) returns the initial state', () => {
			expect(reducer(undefined, {})).toEqual(initialState);
		});
		it('2) should set the loading state', () => {
			const previousState = initialState;
			const nextState = reducer(previousState, getUserPending());
			expect(nextState.isLoading).toEqual(true);
		});
		it('3) should set the succes state', () => {
			const previousState = initialState;
			const expectedUser = {
				email: 'payload.email',
				employee_no: 'payload.employee_no',
				first_name: 'payload.first_name',
				last_name: 'payload.last_name',
				mobile_number: 'payload.mobile_number',
				user_role: 'Operation Manager',
				profile_picture: 'payload.profile_picture',
			};
			const nextState = reducer(previousState, getUserSuccess(mockUser));
			expect(nextState.isLoading).toEqual(false);
			expect(nextState.user).toEqual(expectedUser);
			mockUser.user_role = 'OFFICER';
			expectedUser.user_role = 'Distribution Officer';
			const nextStateDOCheck = reducer(previousState, getUserSuccess(mockUser));
			expect(nextStateDOCheck.isLoading).toEqual(false);
			expect(nextStateDOCheck.user).toEqual(expectedUser);
		});
		it('4) should set the failed state', () => {
			const previousState = initialState;
			const error = 'Error';
			const nextState = reducer(previousState, getUserFail(error));
			expect(nextState.isLoading).toEqual(false);
			expect(nextState.error).toEqual(error);
			expect(nextState.user).toEqual({});
		});
	});
});
