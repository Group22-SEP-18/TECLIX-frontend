import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	products: [],
	error: '',
};

const productsSlice = createSlice({
	name: 'products',
	initialState: initialState,
	reducers: {
		productsPending: (state, action) => {
			state.isLoading = true;
		},
		productsSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.products = payload;
			state.error = '';
		},
		productsFail: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
	},
});

export const { productsPending, productsSuccess, productsFail } =
	productsSlice.actions;

export default productsSlice.reducer;
