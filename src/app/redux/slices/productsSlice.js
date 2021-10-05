import { createSlice } from '@reduxjs/toolkit';
import { findIndex } from 'lodash';

const initialState = {
	isLoading: false,
	products: [],
	error: '',
	deleteproduct: {
		isLoading: false,
		success: false,
		error: null,
	},
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
		deletePending: (state, action) => {
			state.deleteproduct.isLoading = true;
		},
		deleteSuccess: (state, { payload }) => {
			state.deleteproduct.isLoading = false;
			state.deleteproduct.success = true;
			state.deleteproduct.error = '';
		},
		deleteFail: (state, { payload }) => {
			state.deleteproduct.isLoading = false;
			state.deleteproduct.error = payload;
		},
		addnewproduct: (state, { payload }) => {
			state.products.push(payload);
		},
		deleteproduct: (state, { payload }) => {
			state.products = state.products.filter((x) => x.id !== payload);
		},
	},
});

export const {
	productsPending,
	productsSuccess,
	productsFail,
	deletePending,
	deleteSuccess,
	deleteFail,
	addnewproduct,
	deleteproduct,
} = productsSlice.actions;

export default productsSlice.reducer;
