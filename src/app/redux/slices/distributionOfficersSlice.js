import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDistributionOfficers } from '../../../api/staffApi';

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
	listViewFilter: '',
};

export const getDistributionOfficersAsync = createAsyncThunk(
	'distributionOfficers/getDistributionOfficersAsync',
	async () => {
		const response = await fetchDistributionOfficers();
		const customers = response;
		return customers;
	}
);

export const distributionOfficersSlice = createSlice({
	name: 'distributionOfficers',
	initialState: initialState,
	reducers: {
		approvePending: (state, { payload }) => {
			state.approve.isLoading = true;
			state.approve.id = payload.id;
			state.approve.error = '';
			state.approve.success = '';
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
			state.reject.error = '';
			state.reject.success = '';
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
		setListViewFilter: (state, { payload }) => {
			state.listViewFilter = payload.filter;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getDistributionOfficersAsync.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			getDistributionOfficersAsync.fulfilled,
			(state, { payload }) => {
				state.isLoading = false;
				state.distributionOfficers = payload;
				state.error = '';
			}
		);
		builder.addCase(getDistributionOfficersAsync.rejected, (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing distribution officers informations';
		});
	},
});

export const {
	approvePending,
	approveFail,
	approveSuccess,
	rejectPending,
	rejectFail,
	rejectSuccess,
	setListViewFilter,
} = distributionOfficersSlice.actions;

export const selectFilteredDistributionOfficers = (state) => {
	const all = state.distributionOfficers.distributionOfficers;
	const filterId = state.distributionOfficers.listViewFilter;
	if (filterId === null) {
		return all;
	} else {
		return all.filter(
			(d) =>
				`${d.first_name}${d.last_name}${d.employee_no}${d.email}`
					.toLowerCase()
					.indexOf(filterId) >= 0
		);
	}
};

export const selectDistributionOfficers = (state) => state.distributionOfficers;

export default distributionOfficersSlice.reducer;
