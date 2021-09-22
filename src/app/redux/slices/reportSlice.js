import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	salesPerProduct: {
		isLoading: false,
		chartColumns: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sept',
			'Oct',
			'Nov',
			'Dec',
		],
		chartValues: [],
		error: '',
	},
};

export const reportSlice = createSlice({
	name: 'report',
	initialState,
	reducers: {
		salesPerProductPending: (state) => {
			state.salesPerProduct.isLoading = true;
		},
		salesPerProductSuccss: (state, { payload }) => {
			state.salesPerProduct.isLoading = false;
			state.salesPerProduct.error = '';
			const result = payload.reduce((d, row) => {
				d[row.product_id] = d[row.product_id] || {
					product_id: row.product_id,
					product_short_name: row.product_short_name,
					product_long_name: row.product_long_name,
					sales: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				};
				d[row.product_id]['sales'][new Date(row.date).getMonth()] += row.total;
				return d;
			}, {});
			state.salesPerProduct.chartValues = Object.keys(result).map(
				(key) => result[key]
			);
		},
		salesPerProductFail: (state) => {
			state.salesPerProduct.isLoading = false;
			state.salesPerProduct.error = 'Error while accessing data';
		},
	},
});

export const {
	salesPerProductPending,
	salesPerProductFail,
	salesPerProductSuccss,
} = reportSlice.actions;

export default reportSlice.reducer;
