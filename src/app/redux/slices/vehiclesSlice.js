import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	vehicles: [],
	error: '',
};

const vehiclesSlice = createSlice({
	name: 'vehicles',
	initialState: initialState,
	reducers: {
		vehiclesPending: (state, action) => {
			state.isLoading = true;
		},
		vehiclesSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.vehicles = payload;
			state.error = '';
		},
		vehiclesFail: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
	},
});

export const { vehiclesPending, vehiclesSuccess, vehiclesFail } =
	vehiclesSlice.actions;

export default vehiclesSlice.reducer;
