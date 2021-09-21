import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	isAuth: false,
	error: '',
};

const loginSlice = createSlice({
	name: 'login',
	initialState: initialState,
	reducers: {
		loginPending: (state, action) => {
			state.isLoading = true;
		},
		loginSuccess: (state, action) => {
			state.isLoading = false;
			state.isAuth = true;
			state.error = '';
		},
		loginFail: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
	},
});

export const { loginPending, loginSuccess, loginFail } = loginSlice.actions;

export default loginSlice.reducer;
