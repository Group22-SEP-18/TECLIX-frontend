import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	distributionOfficers: [],
	error: '',
	approve: {
		isLoading: false,
		success: null,
		error: null,
		id: '',
	},
	reject: {
		isLoading: false,
		success: null,
		error: null,
		id: '',
	},
};

export const distributionOfficersSlice = createSlice({
	name: 'distributionOfficers',
	initialState: initialState,
	reducers: {
		distributionOfficersPending: (state) => {
			state.isLoading = true;
		},
		distributionOfficersSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.error = '';
			state.distributionOfficers = payload;
		},
		distributionOfficersFail: (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing distribution officers informations';
		},
		approvePending: (state, { payload }) => {
			state.approve.isLoading = true;
			state.approve.id = payload.id;
		},
		approveSuccess: (state, { payload }) => {
			state.approve.isLoading = false;
			state.approve.error = null;
			state.approve.success = payload;
			state.distributionOfficers = state.distributionOfficers.map((d) =>
				d.id === state.approve.id ? { ...d, ...{ is_approved: true } } : d
			);
		},
		approveFail: (state, { payload }) => {
			state.approve.isLoading = false;
			state.approve.success = null;
			state.approve.error = payload;
		},
		rejectPending: (state, { payload }) => {
			state.reject.isLoading = true;
			state.reject.id = payload.id;
		},
		rejectSuccess: (state, { payload }) => {
			state.reject.isLoading = false;
			state.reject.error = null;
			state.reject.success = payload;
			state.distributionOfficers = state.distributionOfficers.filter(
				(d) => d.id !== state.reject.id
			);
		},
		rejectFail: (state, { payload }) => {
			state.reject.isLoading = false;
			state.reject.success = null;
			state.reject.error = payload;
		},
	},
});

export const {
	distributionOfficersPending,
	distributionOfficersFail,
	distributionOfficersSuccess,
	approvePending,
	approveFail,
	approveSuccess,
	rejectPending,
	rejectFail,
	rejectSuccess,
} = distributionOfficersSlice.actions;

export const selectAllSalespersons = (state) => state.distributionOfficers;

export const selectApprovedSalespersons = (state) =>
	state.distributionOfficers.filter((sp) => sp.is_approved !== false);

export default distributionOfficersSlice.reducer;
