import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLocations } from '../../../api/salespersonApi';

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
		const response = await fetchLocations();
		const locations = response;
		return locations;
	}
);

export const locationSlice = createSlice({
	name: 'locations',
	initialState,
	reducers: {
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
	extraReducers: (builder) => {
		builder.addCase(getLocationsAsync.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getLocationsAsync.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.locations = payload;
			state.error = '';
			state.filters.to = '';
			state.filters.from = '';
		});
		builder.addCase(getLocationsAsync.rejected, (state) => {
			state.isLoading = false;
			state.error = 'Error while accessing salesperson locations';
		});
	},
});

export const { setFromFilter, setToFilter, setSPFilter } =
	locationSlice.actions;

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

export const isLocationsLoading = (state) => state.locations.isLoading;

export default locationSlice.reducer;
