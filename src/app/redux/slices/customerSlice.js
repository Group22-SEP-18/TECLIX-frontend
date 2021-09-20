import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getCustomersAsync = createAsyncThunk(
	'customers/getCustomersAsync',
	async () => {
		const resp = await fetch(
			'https://run.mocky.io/v3/cceb5d98-753b-4c91-932c-05405068228e'
		);
		if (resp.ok) {
			const response = await resp.json();
			const customers = response.data;
			return { customers: customers };
		}
	}
);

export const customerSlice = createSlice({
	name: 'customers',
	initialState: [],
	reducers: {},
	extraReducers: {
		[getCustomersAsync.fulfilled]: (state, action) => {
			return action.payload.customers;
		},
	},
});

export const {} = customerSlice.actions;

export const selectAllCustomers = (state) => state.customers;

export default customerSlice.reducer;
