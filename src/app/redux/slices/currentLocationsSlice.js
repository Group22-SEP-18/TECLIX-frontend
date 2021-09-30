import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCurrentLocations } from '../../../api/salespersonApi';

const initialState = {
	isLoading: false,
	currentLocations: [],
	error: '',
};

export const fetchCurrentLocationsAsync = createAsyncThunk(
	'currentLocations/getCurentLocationsAsync',
	async () => {
		const response = await fetchCurrentLocations();
		const locations = response;
		return locations;
	}
);

const currentLocationsSlice = createSlice({
	name: 'currentLocations',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCurrentLocationsAsync.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			fetchCurrentLocationsAsync.fulfilled,
			(state, { payload }) => {
				state.isLoading = false;
				state.currentLocations = payload;
				state.error = '';
			}
		);
		builder.addCase(fetchCurrentLocationsAsync.rejected, (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing locations data';
		});
	},
});

export const selectAllCurrentLocations = (state) => state.currentLocations;

export default currentLocationsSlice.reducer;
