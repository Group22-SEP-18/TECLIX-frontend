import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getServiceOrdersAsync = createAsyncThunk(
	'serviceOrders/getServiceOrdersAsync',
	async () => {
		const resp = await fetch(
			'https://run.mocky.io/v3/081cc275-f318-4292-9abd-738943342ec6'
		);
		if (resp.ok) {
			const response = await resp.json();
			const serviceOrders = response.data;
			return { serviceOrders: serviceOrders };
		}
	}
);

const initialState = {
	isLoading: false,
	serviceOrders: [],
	error: '',
};

export const serviceOrderSlice = createSlice({
	name: 'serviceOrders',
	initialState,
	reducers: {
		serviceOrdersPending: (state) => {
			state.isLoading = true;
		},
		serviceOrdersSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.error = '';
			state.serviceOrders = payload;
		},
		serviceOrdersFail: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
	},
	extraReducers: {
		[getServiceOrdersAsync.fulfilled]: (state, action) => {
			return action.payload.serviceOrders;
		},
	},
});

export const { serviceOrdersPending, serviceOrdersFail, serviceOrdersSuccess } =
	serviceOrderSlice.actions;

export const selectAllServiceOrders = (state) =>
	state.serviceOrders.serviceOrders;

export default serviceOrderSlice.reducer;
