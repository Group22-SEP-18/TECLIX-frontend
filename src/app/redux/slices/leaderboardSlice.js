import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	leaderborad: [],
	error: '',
};

export const leaderboradSlice = createSlice({
	name: 'leaderborad',
	initialState: initialState,
	reducers: {
		leaderboradPending: (state) => {
			state.isLoading = true;
		},
		leaderboradSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.error = '';
			state.leaderborad = payload;
		},
		leaderboradFail: (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing salesperson leaderboard';
		},
	},
});

export const { leaderboradPending, leaderboradFail, leaderboradSuccess } =
	leaderboradSlice.actions;
export default leaderboradSlice.reducer;
