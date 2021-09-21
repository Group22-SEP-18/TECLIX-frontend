import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	isAuth: false,
	user: {},
	error: '',
};

const loginSlice = createSlice({
	name: 'login',
	initialState: initialState,
	reducers: {
		loginPending: (state, action) => {
			state.isLoading = true;
		},
		loginSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.isAuth = true;
			state.user = {
				email: payload.email,
				employee_no: payload.employee_no,
				first_name: payload.first_name,
				last_name: payload.last_name,
				user_role: payload.user_role || 'Distribution Officer', // 'Operation Manager'
				profile_picture:
					payload.profile_picture ||
					'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
			};
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
