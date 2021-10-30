import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoyaltyPointSchema } from '../../../api/customersApi';

const initialState = {
	isLoading: false,
	loyaltyPointSchema: [],
	error: '',
};

export const getloyaltyPointSchemaAsync = createAsyncThunk(
	'loyaltyPointSchema/getloyaltyPointSchemaAsync',
	async () => {
		const response = await fetchLoyaltyPointSchema();
		const loyaltyPointSchema = response;
		return loyaltyPointSchema;
	}
);

export const loyaltyPointSchemaSlice = createSlice({
	name: 'loyaltyPointSchema',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getloyaltyPointSchemaAsync.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			getloyaltyPointSchemaAsync.fulfilled,
			(state, { payload }) => {
				state.isLoading = false;
				state.loyaltyPointSchema = payload;
				state.error = '';
			}
		);
		builder.addCase(getloyaltyPointSchemaAsync.rejected, (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing customer loyalty point schema';
		});
	},
});

export const selectLoyaltyPointSchema = (state) =>
	state.loyaltyPointSchema.loyaltyPointSchema;

export default loyaltyPointSchemaSlice.reducer;
