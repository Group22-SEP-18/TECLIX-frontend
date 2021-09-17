import { configureStore } from '@reduxjs/toolkit';
import salespersonReducer from './slices/salespersonSlice';

export default configureStore({
	reducer: {
		salespersons: salespersonReducer,
	},
});
