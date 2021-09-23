import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	locations: [],
	filteredlocations: [],
	error: '',
};

export const getLocationsAsync = createAsyncThunk(
	'locations/getLocationsAsync',
	async () => {
		const resp = await fetch(
			'https://run.mocky.io/v3/ed1ce291-8127-429b-a0e0-a78de5f423de'
		);
		if (resp.ok) {
			const response = await resp.json();
			const locations = response.data;
			return { locations: locations };
		}
	}
);

export const locationSlice = createSlice({
	name: 'locations',
	initialState,
	reducers: {
		locationsPending: (state) => {
			state.isLoading = true;
		},
		locationsSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.error = '';
			state.locations = payload;
		},
		locationsFail: (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing salesperson locations';
		},
		filterLocations: (state, { payload }) => {
			const ed = payload.from
				? new Date(`${payload.from}T00:00:00.000Z`).getTime()
				: new Date('0001-01-01T00:00:00Z').getTime();
			const sd = payload.to
				? new Date(`${payload.to}T00:00:00.000Z`).getTime()
				: new Date().getTime();
			state.filteredlocations = state.locations.filter((row) => {
				var time = new Date(row.date).getTime();
				return sd < time && time < ed;
			});
		},
	},
	extraReducers: {
		[getLocationsAsync.fulfilled]: (state, action) => {
			return action.payload.locations;
		},
	},
});

export const { locationsPending, locationsSuccess, locationsFail } =
	locationSlice.actions;

export const selectAllLocations = (state) => state.locations;

export default locationSlice.reducer;
