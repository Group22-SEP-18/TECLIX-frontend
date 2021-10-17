import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	vehicles: [],
	error: '',
	deletevehicle: {
		isLoading: false,
		success: false,
		error: null,
	},
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
		deletePending: (state) => {
			state.deletevehicle.isLoading = true;
		},
		deleteSuccess: (state) => {
			state.deletevehicle.isLoading = false;
			state.deletevehicle.success = true;
			state.deletevehicle.error = '';
		},
		deleteFail: (state, { payload }) => {
			state.deletevehicle.isLoading = false;
			state.deletevehicle.error = payload;
			state.deletevehicle.success = false;
		},
		addnewvehicle: (state, { payload }) => {
			state.vehicles.push(payload);
		},
		deletevehicle: (state, { payload }) => {
			state.vehicles = state.vehicles.filter((x) => x.id !== payload);
		},
	},
});

export const {
	vehiclesPending,
	vehiclesSuccess,
	vehiclesFail,
	addnewvehicle,
	deletevehicle,
	deletePending,
	deleteSuccess,
	deleteFail,
} = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
