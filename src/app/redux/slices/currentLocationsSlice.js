import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	currentLocations: [],
	error: '',
};

const currentLocationsSlice = createSlice({
	name: 'currentLocations',
	initialState: initialState,
	reducers: {
		currentLocationsPending: (state, action) => {
			state.isLoading = true;
		},
		currentLocationsSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.currentLocations = payload;
			state.error = '';
		},
		currentLocationsFail: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
	},
});

export const {
	currentLocationsPending,
	currentLocationsSuccess,
	currentLocationsFail,
} = currentLocationsSlice.actions;

export default currentLocationsSlice.reducer;
