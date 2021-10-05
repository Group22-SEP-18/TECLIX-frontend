import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchServiceOrders } from '../../../api/serviceOrderApi';

const initialState = {
	isLoading: false,
	serviceOrders: [],
	error: '',
};

export const getServiceOrdersAsync = createAsyncThunk(
	'serviceOrders/getServiceOrdersAsync',
	async () => {
		const response = await fetchServiceOrders();
		const serviceOrders = response;
		return serviceOrders;
	}
);

export const serviceOrderSlice = createSlice({
	name: 'serviceOrders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getServiceOrdersAsync.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getServiceOrdersAsync.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.serviceOrders = payload;
			state.error = '';
		});
		builder.addCase(getServiceOrdersAsync.rejected, (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing data';
		});
	},
});

export const selectAllServiceOrders = (state) =>
	state.serviceOrders.serviceOrders;

export default serviceOrderSlice.reducer;
