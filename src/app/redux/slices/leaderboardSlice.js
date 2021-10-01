import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLeaderboard } from '../../../api/salespersonApi';
import { reverseSortArrayOfObjectsByFloat } from '../../utils';

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
			state.alltimeLeaderboard = reverseSortArrayOfObjectsByFloat(
				payload,
				'points_all_time'
			);
			state.monthLeaderboard = reverseSortArrayOfObjectsByFloat(
				payload,
				'points_current_month'
			);
			state.todayLeaderboard = reverseSortArrayOfObjectsByFloat(
				payload,
				'points_today'
			);
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
