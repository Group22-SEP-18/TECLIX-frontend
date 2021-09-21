import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
	initialState: [],
	reducers: {},
	extraReducers: {
		[getLocationsAsync.fulfilled]: (state, action) => {
			return action.payload.locations;
		},
	},
});

// export const {} = locationSlice.actions;

export const selectAllLocations = (state) => state.locations;

export default locationSlice.reducer;
