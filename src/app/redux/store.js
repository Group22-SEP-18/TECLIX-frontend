import { configureStore } from '@reduxjs/toolkit';
import salespersonReducer from './slices/salespersonSlice';
import customerReducer from './slices/customerSlice';

export default configureStore({
	reducer: {
		salespersons: salespersonReducer,
		customers: customerReducer,
	},
});
