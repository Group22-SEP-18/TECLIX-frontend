import { configureStore } from '@reduxjs/toolkit';
import currentLocationsReducer from './slices/currentLocationsSlice';
import customerReducer from './slices/customerSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import locationReducer from './slices/locationsSlice';
import loginReducer from './slices/loginSlice';
import notificationReducer from './slices/notificationSlice';
import registrationReducer from './slices/registrationSlice';
import reportsReducer from './slices/reportSlice';
import salespersonReducer from './slices/salespersonSlice';
import serviceOrderReducer from './slices/serviceOrderSlice';
import userReducer from './slices/userSlice';

export default configureStore({
	reducer: {
		currentLocations: currentLocationsReducer,
		customers: customerReducer,
		leaderboard: leaderboardReducer,
		locations: locationReducer,
		login: loginReducer,
		notification: notificationReducer,
		registration: registrationReducer,
		report: reportsReducer,
		salespersons: salespersonReducer,
		serviceOrders: serviceOrderReducer,
		user: userReducer,
	},
});
