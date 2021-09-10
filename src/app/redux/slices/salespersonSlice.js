import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getSalespersonsAsync = createAsyncThunk(
	'salespersons/getSalespersonsAsync',
	async () => {
		const resp = await fetch(
			'https://run.mocky.io/v3/5e62ad6b-2f4e-4ec8-9073-280b63cb8798'
		);
		if (resp.ok) {
			const response = await resp.json();
			const salespersons = response.data;
			return { salespersons: salespersons };
		}
	}
);

export const salespersonSlice = createSlice({
	name: 'salespersons',
	initialState: [],
	reducers: {
		addSalesperson: (state, action) => {
			const new_salesperson = {};
			state.push(new_salesperson);
		},
	},
	extraReducers: {
		[getSalespersonsAsync.fulfilled]: (state, action) => {
			return action.payload.salespersons;
		},
	},
});

export const { addSalesperson } = salespersonSlice.actions;

export default salespersonSlice.reducer;
