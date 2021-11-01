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
				mobile_number: payload.mobile_number,
				user_role:
					payload.user_role === 'MANAGER'
						? 'Operation Manager'
						: 'Distribution Officer',
				profile_picture: payload.profile_picture,
			};
			state.error = '';
		},
		getUserFail: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
	},
});

export const { getUserPending, getUserSuccess, getUserFail } =
	userSlice.actions;

export const selectUserRole = (state) => state.user.user.user_role;
export const selectUser = (state) => state.user.user;
export const selectIsLoading = (state) => state.user.isLoading;

export default userSlice.reducer;
