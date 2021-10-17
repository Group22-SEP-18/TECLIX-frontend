import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	status: false,
};

const addVehicleSlice = createSlice({
	name: 'vehicleRegistration',
	initialState,
	reducers: {
		vehicleRegistrationPending: (state) => {
			state.isLoading = true;
		},
		vehicleRegistrationSuccess: (state) => {
			state.isLoading = false;
			state.status = true;
		},
		vehicleRegistrationError: (state) => {
			state.isLoading = false;
			state.status = false;
		},
	},
});

const { reducer, actions } = addVehicleSlice;

export const {
	vehicleRegistrationPending,
	vehicleRegistrationSuccess,
	vehicleRegistrationError,
} = actions;

export default reducer;
