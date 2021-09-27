import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
		const resp = await fetch(
			'https://run.mocky.io/v3/5e62ad6b-2f4e-4ec8-9073-280b63cb8798'
		);
		if (resp.ok) {
			const response = await resp.json();
			const salespersons = response.data;
			return { salespersons: salespersons };
		}
	}
);

export const salespersonSlice = createSlice({
	name: 'salespersons',
	initialState: initialState,
	reducers: {
		salespersonPending: (state) => {
			state.isLoading = true;
		},
		salespersonSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.error = '';
			state.salespersons = payload;
		},
		salespersonFail: (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing salesperson informations';
		},
		approvePending: (state, { payload }) => {
			state.approve.isLoading = true;
			state.approve.id = payload.id;
			state.reject.error = '';
			state.reject.success = '';
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
			state.reject.error = '';
			state.reject.success = '';
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
	extraReducers: {
		[getSalespersonsAsync.fulfilled]: (state, action) => {
			return action.payload.salespersons;
		},
	},
});

export const {
	salespersonPending,
	salespersonFail,
	salespersonSuccess,
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

export const filteredSalespersons = (state) => {
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
