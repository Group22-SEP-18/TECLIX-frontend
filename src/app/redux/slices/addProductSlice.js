import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	status: '',
	message: '',
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
			state.message = payload;
		},
		productRegistrationError: (state, { payload }) => {
			state.isLoading = false;
			state.status = 'error';
			state.message = payload;
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
