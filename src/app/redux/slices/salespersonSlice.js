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
} = salespersonSlice.actions;

export const selectAllSalespersons = (state) => state.salespersons;

export const selectApprovedSalespersons = (state) =>
	state.salespersons.filter((sp) => sp.is_approved !== false);

export default salespersonSlice.reducer;
