import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLeaderboard } from '../../../api/salespersonApi';

const initialState = {
	isLoading: false,
	leaderboard: [],
	todayLeaderboard: [],
	monthLeaderboard: [],
	alltimeLeaderboard: [],
	error: '',
};

export const getLeaderboardAsync = createAsyncThunk(
	'leaderboard/getLeaderboardAsync',
	async () => {
		const response = await fetchLeaderboard();
		const leaderboard = response;
		return leaderboard;
	}
);

export const leaderboradSlice = createSlice({
	name: 'leaderboard',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getLeaderboardAsync.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getLeaderboardAsync.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.leaderboard = payload;
			state.alltimeLeaderboard = payload
				.slice()
				.sort(
					(a, b) =>
						parseFloat(a.points_all_time) - parseFloat(b.points_all_time)
				)
				.reverse();
			state.monthLeaderboard = payload
				.slice()
				.sort(
					(a, b) =>
						parseFloat(a.points_current_month) -
						parseFloat(b.points_current_month)
				)
				.reverse();
			state.todayLeaderboard = payload
				.slice()
				.sort((a, b) => parseFloat(a.points_today) - parseFloat(b.points_today))
				.reverse();
			state.error = '';
		});
		builder.addCase(getLeaderboardAsync.rejected, (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing salesperson leaderboard';
		});
	},
});

export const selectLeaderboard = (state) => ({
	todayLeaderboard: state.leaderboard.todayLeaderboard,
	monthLeaderboard: state.leaderboard.monthLeaderboard,
	alltimeLeaderboard: state.leaderboard.alltimeLeaderboard,
});

export default leaderboradSlice.reducer;
