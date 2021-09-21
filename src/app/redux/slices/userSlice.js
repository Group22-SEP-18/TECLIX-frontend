import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {},
	isLoading: false,
	error: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getUserPending: (state) => {
			state.isLoading = true;
		},
		getUserSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.user = payload;
			state.error = '';
		},
		getUserFail: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
		setUser: (state, { payload }) => {
			state.isLoading = false;
			state.user = {
				email: payload.email,
				employee_no: payload.employee_no,
				first_name: payload.first_name,
				last_name: payload.last_name,
				user_role: payload.user_role || 'Distribution Officer', // 'Operation Manager'
			};
			state.error = '';
		},
	},
});

export const { getUserPending, getUserSuccess, getUserFail, setUser } =
	userSlice.actions;

export default userSlice.reducer;
