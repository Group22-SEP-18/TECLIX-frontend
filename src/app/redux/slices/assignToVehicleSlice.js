import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	status: '',
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
			state.status = 'success';
			state.message = payload;
		},
		assigningError: (state, { payload }) => {
			state.isLoading = false;
			state.status = 'error';
			state.message = payload;
		},
	},
});

const { reducer, actions } = assignToVehicleSlice;

export const { assigningPending, assigningSuccess, assigningError } = actions;

export default reducer;
