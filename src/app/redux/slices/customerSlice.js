import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCustomers } from '../../../api/customersApi';

export const getCustomersAsync = createAsyncThunk(
	'customers/getCustomersAsync',
	async () => {
		const response = await fetchCustomers();
		const customers = response.data;
		return customers;
	}
);

const initialState = {
	isLoading: false,
	customers: [],
	error: '',
	listViewFilter: '',
};

export const customerSlice = createSlice({
	name: 'customers',
	initialState,
	reducers: {
		setListViewFilter: (state, { payload }) => {
			state.listViewFilter = payload.filter;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCustomersAsync.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getCustomersAsync.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.customers = payload;
			state.error = '';
		});
		builder.addCase(getCustomersAsync.fulfilled, (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing customer data';
		});
	},
});

export const { setListViewFilter } = customerSlice.actions;

export const selectAllCustomers = (state) => state.customers;

export const filteredCustomers = (state) => {
	const all = state.customers.customers;
	const filterId = state.customers.listViewFilter;
	if (filterId === null) {
		return all;
	} else {
		return all.filter(
			(c) =>
				`${c.owner_first_name}${c.owner_last_name}${c.shop_name}${c.street}${c.city}${c.district}`
					.toLowerCase()
					.indexOf(filterId) >= 0
		);
	}
};

export default customerSlice.reducer;
