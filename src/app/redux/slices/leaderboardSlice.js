import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	leaderboard: [],
	todayLeaderboard: [],
	monthLeaderboard: [],
	alltimeLeaderboard: [],
	error: '',
};

export const leaderboradSlice = createSlice({
	name: 'leaderboard',
	initialState: initialState,
	reducers: {
		leaderboradPending: (state) => {
			state.isLoading = true;
		},
		leaderboradSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.error = '';
			state.leaderboard = payload;
		},
		leaderboradFail: (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing salesperson leaderboard';
		},
		getTodayLeaderboard: (state) => {
			state.todayLeaderboard = state.leaderboard
				.slice()
				.sort((a, b) => parseFloat(a.points_today) - parseFloat(b.points_today))
				.reverse();
		},
		getMonthlyLeaderboard: (state) => {
			state.monthLeaderboard = state.leaderboard
				.slice()
				.sort(
					(a, b) =>
						parseFloat(a.points_current_month) -
						parseFloat(b.points_current_month)
				)
				.reverse();
		},
		getAllTimeLeaderboard: (state) => {
			state.alltimeLeaderboard = state.leaderboard
				.slice()
				.sort(
					(a, b) =>
						parseFloat(a.points_all_time) - parseFloat(b.points_all_time)
				)
				.reverse();
		},
	},
});

export const {
	leaderboradPending,
	leaderboradFail,
	leaderboradSuccess,
	getTodayLeaderboard,
	getMonthlyLeaderboard,
	getAllTimeLeaderboard,
} = leaderboradSlice.actions;
export default leaderboradSlice.reducer;
