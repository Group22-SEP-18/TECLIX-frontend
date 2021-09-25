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
			state.user = {
				email: payload.email,
				employee_no: payload.employee_no,
				first_name: payload.first_name,
				last_name: payload.last_name,
				user_role:
					payload.user_role === 'OFFICER'
						? 'Distribution Officer'
						: 'Operation Manager',
				profile_picture:
					payload.profile_picture ||
					'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
			};
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
				mobile_number: payload.mobile_number,
				user_role: payload.user_role || 'Operation Manager', //'Distribution Officer', //
				profile_picture:
					payload.profile_picture ||
					'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
			};
			state.error = '';
		},
	},
});

export const { getUserPending, getUserSuccess, getUserFail, setUser } =
	userSlice.actions;

export default userSlice.reducer;
