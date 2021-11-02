import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDistributionOfficers } from '../../../api/staffApi';

const initialState = {
	isLoading: false,
	distributionOfficers: [],
	error: '',
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
		approveSuccess: (state, { payload }) => {
			state.distributionOfficers = state.distributionOfficers.map((d) =>
				d.id === payload ? { ...d, ...{ is_approved: true } } : d
			);
		},
		rejectSuccess: (state, { payload }) => {
			state.distributionOfficers = state.distributionOfficers.filter(
				(d) => d.id !== payload
			);
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

export const { approveSuccess, rejectSuccess, setListViewFilter } =
	distributionOfficersSlice.actions;

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
