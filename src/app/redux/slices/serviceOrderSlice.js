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

export const serviceOrderSlice = createSlice({
	name: 'serviceOrders',
	initialState: [],
	reducers: {},
	extraReducers: {
		[getServiceOrdersAsync.fulfilled]: (state, action) => {
			return action.payload.serviceOrders;
		},
	},
});

// export const {} = serviceOrderSlice.actions;

export const selectAllServiceOrders = (state) => state.serviceOrders;

export default serviceOrderSlice.reducer;
