import { configureStore } from '@reduxjs/toolkit';
import salespersonReducer from './slices/salespersonSlice';
import customerReducer from './slices/customerSlice';
import serviceOrderReducer from './slices/serviceOrderSlice';
import locationReducer from './slices/locationsSlice';
import notificationReducer from './slices/notificationSlice';
import loginReducer from './slices/loginSlice';
import userReducer from './slices/userSlice';

export default configureStore({
	reducer: {
		salespersons: salespersonReducer,
		customers: customerReducer,
		serviceOrders: serviceOrderReducer,
		locations: locationReducer,
		notification: notificationReducer,
		login: loginReducer,
		user: userReducer,
	},
});
