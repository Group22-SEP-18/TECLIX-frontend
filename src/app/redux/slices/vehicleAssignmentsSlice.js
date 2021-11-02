import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	vehiclesAssignments: [],
	error: '',
	unassign: {
		isLoading: false,
		success: false,
	},
};

const vehiclesAssignmentsSlice = createSlice({
	name: 'vehiclesAssignments',
	initialState: initialState,
	reducers: {
		vehiclesAssignmentsPending: (state, action) => {
			state.isLoading = true;
		},
		vehiclesAssignmentsSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.vehiclesAssignments = payload;
			state.error = '';
		},
		vehiclesAssignmentsFail: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
		vehiclesUnassignPending: (state) => {
			state.unassign.isLoading = true;
		},
		vehiclesUnassignSuccess: (state) => {
			state.unassign.isLoading = false;
			state.unassign.success = true;
		},
		vehiclesUnassignFail: (state) => {
			state.unassign.isLoading = false;
			state.unassign.success = false;
		},
	},
});

export const {
	vehiclesAssignmentsPending,
	vehiclesAssignmentsSuccess,
	vehiclesAssignmentsFail,
	vehiclesUnassignPending,
	vehiclesUnassignSuccess,
	vehiclesUnassignFail,
} = vehiclesAssignmentsSlice.actions;

export default vehiclesAssignmentsSlice.reducer;
