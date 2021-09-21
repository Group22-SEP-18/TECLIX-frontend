import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getProductsAsync = createAsyncThunk(
	'products/getProductsAsync',
	async () => {
		const resp = await fetch('');
		if (resp.ok) {
			const response = await resp.json();
			const products = response.data;
			return { salespersons: products };
		}
	}
);

// export const salespersonSlice = createSlice({
// 	name: 'products',
// 	initialState: [],
// 	reducers: {
// 		addSalesperson: (state, action) => {
// 			const new_salesperson = {};
// 			state.push(new_salesperson);
// 		},
// 	},
// 	extraReducers: {
// 		[getSalespersonsAsync.fulfilled]: (state, action) => {
// 			return action.payload.salespersons;
// 		},
// 	},
// });

// export const { addSalesperson } = salespersonSlice.actions;

export const selectAllProducts = (state) => state.products;

// export const selectApprovedSalespersons = (state) =>
// 	state.salespersons.filter((sp) => sp.is_approved !== false);

// export default productSlice.reducer;
