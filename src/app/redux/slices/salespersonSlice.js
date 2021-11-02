import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSalespersons } from '../../../api/salespersonApi';

const initialState = {
	isLoading: false,
	salespersons: [],
	error: '',
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
		approveSuccess: (state, { payload }) => {
			state.salespersons = state.salespersons.map((sp) =>
				sp.id === payload ? { ...sp, ...{ is_approved: true } } : sp
			);
		},
		rejectSuccess: (state, { payload }) => {
			state.salespersons = state.salespersons.filter((d) => d.id !== payload);
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

export const { approveSuccess, rejectSuccess, setListViewFilter } =
	salespersonSlice.actions;

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
