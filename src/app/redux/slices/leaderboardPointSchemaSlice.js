import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLeaderboardPointSchema } from '../../../api/salespersonApi';

const initialState = {
	isLoading: false,
	leaderboardPointSchema: [],
	error: '',
};

export const getLeaderboardPointSchemaAsync = createAsyncThunk(
	'leaderboardPointSchema/getLeaderboardPointSchemaAsync',
	async () => {
		const response = await fetchLeaderboardPointSchema();
		const leaderboardPointSchema = response;
		return leaderboardPointSchema;
	}
);

export const leaderboradPointSchemaSlice = createSlice({
	name: 'leaderboardPointSchema',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getLeaderboardPointSchemaAsync.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			getLeaderboardPointSchemaAsync.fulfilled,
			(state, { payload }) => {
				state.isLoading = false;
				state.leaderboardPointSchema = payload;
				state.error = '';
			}
		);
		builder.addCase(getLeaderboardPointSchemaAsync.rejected, (state) => {
			state.isLoading = false;
			state.error =
				'Error while accessing salesperson leaderboard point schema';
		});
	},
});

export const selectLeaderboardPointSchema = (state) =>
	state.leaderboardPointSchema.leaderboardPointSchema;

export default leaderboradPointSchemaSlice.reducer;
