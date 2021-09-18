import { configureStore } from '@reduxjs/toolkit';
import salespersonReducer from './slices/salespersonSlice';
import customerReducer from './slices/customerSlice';
import serviceOrderReducer from './slices/serviceOrderSlice';
import locationReducer from './slices/locationsSlice';

export default configureStore({
	reducer: {
		salespersons: salespersonReducer,
		customers: customerReducer,
		serviceOrders: serviceOrderReducer,
		locations: locationReducer,
	},
});
