import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	status: null,
};

const addProductSlice = createSlice({
	name: 'productRegistration',
	initialState,
	reducers: {
		productRegistrationPending: (state) => {
			state.isLoading = true;
		},
		productRegistrationSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.status = 'success';
		},
		productRegistrationError: (state, { payload }) => {
			state.isLoading = false;
			state.status = 'fail';
		},
	},
});

const { reducer, actions } = addProductSlice;

export const {
	productRegistrationPending,
	productRegistrationSuccess,
	productRegistrationError,
} = actions;

export default reducer;
