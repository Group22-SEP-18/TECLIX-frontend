import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	vehiclesAssignments: [],
	error: '',
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
	},
});

export const {
	vehiclesAssignmentsPending,
	vehiclesAssignmentsSuccess,
	vehiclesAssignmentsFail,
} = vehiclesAssignmentsSlice.actions;

export default vehiclesAssignmentsSlice.reducer;
