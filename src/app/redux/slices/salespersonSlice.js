import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSalespersons } from '../../../api/salespersonApi';

const initialState = {
	isLoading: false,
	salespersons: [],
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

export const getSalespersonsAsync = createAsyncThunk(
	'salespersons/getSalespersonsAsync',
	async () => {
		const response = await fetchSalespersons();
		const salespersons = response;
		return salespersons;
	}
);

export const salespersonSlice = createSlice({
	name: 'salespersons',
	initialState: initialState,
	reducers: {
		approvePending: (state, { payload }) => {
			state.approve.isLoading = true;
			state.approve.id = payload.id;
			state.reject.error = null;
			state.reject.success = null;
		},
		approveSuccess: (state) => {
			state.approve.isLoading = false;
			state.approve.error = null;
			state.approve.success = 'Successfully approved the account';
			state.salespersons = state.salespersons.map((sp) =>
				sp.id === state.approve.id ? { ...sp, ...{ is_approved: true } } : sp
			);
		},
		approveFail: (state) => {
			state.approve.isLoading = false;
			state.approve.success = null;
			state.approve.error = 'Account activation failed';
		},
		rejectPending: (state, { payload }) => {
			state.reject.isLoading = true;
			state.reject.id = payload.id;
			state.reject.error = null;
			state.reject.success = null;
		},
		rejectSuccess: (state, { payload }) => {
			state.reject.isLoading = false;
			state.reject.error = null;
			state.reject.success = payload;
			state.salespersons = state.salespersons.filter(
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
		builder.addCase(getSalespersonsAsync.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getSalespersonsAsync.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.salespersons = payload;
			state.error = '';
		});
		builder.addCase(getSalespersonsAsync.rejected, (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing salesperson informations';
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
} = salespersonSlice.actions;

export const selectAllSalespersons = (state) => state.salespersons;

export const selectApprovedSalespersons = (state) =>
	state.salespersons.filter((sp) => sp.is_approved !== false);

export const selectFilteredSalespersons = (state) => {
	const all = state.salespersons.salespersons;
	const filterId = state.salespersons.listViewFilter;
	if (filterId === null) {
		return all;
	} else {
		return all.filter(
			(sp) =>
				`${sp.first_name}${sp.last_name}${sp.employee_no}${sp.email}`
					.toLowerCase()
					.indexOf(filterId) >= 0
		);
	}
};

export default salespersonSlice.reducer;
