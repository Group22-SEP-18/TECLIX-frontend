import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	status: null,
	message: '',
};

const assignToVehicleSlice = createSlice({
	name: 'assigntoVehicle',
	initialState,
	reducers: {
		assigningPending: (state) => {
			state.isLoading = true;
		},
		assigningSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.status = true;
			state.message = payload;
		},
		assigningError: (state, { payload }) => {
			state.isLoading = false;
			state.status = false;
			state.message = payload;
		},
	},
});

const { reducer, actions } = assignToVehicleSlice;

export const { assigningPending, assigningSuccess, assigningError } = actions;

export default reducer;
