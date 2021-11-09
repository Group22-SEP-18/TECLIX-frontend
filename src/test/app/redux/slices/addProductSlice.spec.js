import reducer, {
	productRegistrationPending,
	productRegistrationSuccess,
	productRegistrationError,
} from '../../../../app/redux/slices/addProductSlice';

const initialState = {
	isLoading: false,
	status: null,
};

describe('addProductSlice', () => {
	describe('reducers', () => {
		it('1) returns the initial state', () => {
			expect(reducer(undefined, {})).toEqual(initialState);
		});
		it('2) should set the loading state', () => {
			const previousState = initialState;
			const nextState = reducer(previousState, productRegistrationPending());
			expect(nextState.isLoading).toEqual(true);
		});
		it('3) should set the success state', () => {
			const previousState = initialState;
			const nextState = reducer(previousState, productRegistrationSuccess());
			expect(nextState.isLoading).toEqual(false);
			expect(nextState.status).toEqual('success');
		});
		it('4) should set the fail state', () => {
			const previousState = initialState;
			const nextState = reducer(previousState, productRegistrationError());
			expect(nextState.isLoading).toEqual(false);
			expect(nextState.status).toEqual('fail');
		});
	});
});
