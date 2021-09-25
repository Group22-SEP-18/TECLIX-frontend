import { configureStore } from '@reduxjs/toolkit';
import currentLocationsReducer from './slices/currentLocationsSlice';
import customerReducer from './slices/customerSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import locationReducer from './slices/locationsSlice';
import loginReducer from './slices/loginSlice';
import notificationReducer from './slices/notificationSlice';
import productsReducer from './slices/productsSlice';
import registrationReducer from './slices/registrationSlice';
import salespersonReducer from './slices/salespersonSlice';
import serviceOrderReducer from './slices/serviceOrderSlice';
import userReducer from './slices/userSlice';
import vehicleReducer from './slices/vehiclesSlice';

export default configureStore({
	reducer: {
		currentLocations: currentLocationsReducer,
		customers: customerReducer,
		leaderboard: leaderboardReducer,
		locations: locationReducer,
		login: loginReducer,
		notification: notificationReducer,
		products: productsReducer,
		registration: registrationReducer,
		salespersons: salespersonReducer,
		serviceOrders: serviceOrderReducer,
		user: userReducer,
		vehicles: vehicleReducer,
	},
});
