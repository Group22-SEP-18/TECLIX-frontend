import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	locations: [],
	error: '',
	filters: {
		from: '',
		to: '',
		salesperson_id: '',
	},
};

export const getLocationsAsync = createAsyncThunk(
	'locations/getLocationsAsync',
	async () => {
		const resp = await fetch(
			'https://run.mocky.io/v3/ed1ce291-8127-429b-a0e0-a78de5f423de'
		);
		if (resp.ok) {
			const response = await resp.json();
			const locations = response.data;
			return { locations: locations };
		}
	}
);

export const locationSlice = createSlice({
	name: 'locations',
	initialState,
	reducers: {
		locationsPending: (state) => {
			state.isLoading = true;
		},
		locationsSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.error = '';
			state.locations = payload;
		},
		locationsFail: (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing salesperson locations';
		},
		setFromFilter: (state, { payload }) => {
			state.filters.from = payload;
		},
		setToFilter: (state, { payload }) => {
			state.filters.to = payload;
		},
		setSPFilter: (state, { payload }) => {
			state.filters.salesperson_id = payload;
		},
	},
	extraReducers: {
		[getLocationsAsync.fulfilled]: (state, action) => {
			return action.payload.locations;
		},
	},
});

export const {
	locationsPending,
	locationsSuccess,
	locationsFail,
	setFromFilter,
	setToFilter,
	setSPFilter,
} = locationSlice.actions;

export const selectAllLocations = (state) => state.locations;

export const filteredLocations = (state) => {
	const all = state.locations.locations;
	const sd =
		state.locations.filters.from !== ''
			? new Date(`${state.locations.filters.from}T00:00:00.000Z`).getTime()
			: new Date('0001-01-01T00:00:00Z').getTime();
	const ed =
		state.locations.filters.to !== ''
			? new Date(`${state.locations.filters.to}T00:00:00.000Z`).getTime()
			: new Date().getTime();
	return all
		.filter((row) => {
			var time = new Date(row.date).getTime();
			return (
				row.salesperson.employee_no ===
					state.locations.filters.salesperson_id &&
				sd < time &&
				time < ed
			);
		})
		.map((loc) => ({
			latitude: parseFloat(loc.customer.latitude),
			longitude: parseFloat(loc.customer.longitude),
		}));
};

export default locationSlice.reducer;
