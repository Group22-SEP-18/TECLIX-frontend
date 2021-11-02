import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchServiceOrders } from '../../../api/serviceOrderApi';

const initialState = {
	isLoading: false,
	serviceOrders: [],
	filters: {
		from: '',
		to: '',
		salesperson: '',
		shop_name: '',
	},
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
	reducers: {
		setFromFilter: (state, { payload }) => {
			state.filters.from = payload;
		},
		setToFilter: (state, { payload }) => {
			state.filters.to = payload;
		},
		setSPFilter: (state, { payload }) => {
			state.filters.salesperson = payload;
		},
		setShopFilter: (state, { payload }) => {
			state.filters.shop_name = payload;
		},
		clearFilters: (state) => {
			state.filters = {
				from: '',
				to: '',
				salesperson: '',
				shop_name: '',
			};
		},
	},
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

export const {
	setFromFilter,
	setToFilter,
	setSPFilter,
	setShopFilter,
	clearFilters,
} = serviceOrderSlice.actions;

export const selectAllServiceOrders = (state) =>
	state.serviceOrders.serviceOrders;

export const filteredServiceOrders = (state) => {
	var all = state.serviceOrders.serviceOrders;
	const salesperson = state.serviceOrders.filters.salesperson;
	if (salesperson === '') {
	} else {
		all = all.filter(
			(so) =>
				`${so.salesperson.first_name}${so.salesperson.last_name}${so.salesperson.employee_no}${so.salesperson.email}`
					.toLowerCase()
					.indexOf(salesperson) >= 0
		);
	}
	const shop_name = state.serviceOrders.filters.shop_name;
	if (shop_name === '') {
	} else {
		all = all.filter(
			(so) =>
				`${so.customer.owner_first_name}${so.customer.owner_last_name}${so.customer.shop_name}`
					.toLowerCase()
					.indexOf(shop_name) >= 0
		);
	}
	// console.log(all);
	// return all.filter((row) => {
	// 	var time = new Date(row.order_date).getTime();
	// 	return sd < time && time < ed;
	// });
	return all;
};

export default serviceOrderSlice.reducer;
