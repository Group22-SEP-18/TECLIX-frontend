import { configureStore } from '@reduxjs/toolkit';
import currentLocationsReducer from './slices/currentLocationsSlice';
import customerReducer from './slices/customerSlice';
import distributionOfficerReducer from './slices/distributionOfficersSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import locationReducer from './slices/locationsSlice';
import loginReducer from './slices/loginSlice';
import notificationReducer from './slices/notificationSlice';
import productsReducer from './slices/productsSlice';
import productRegistrationReducer from './slices/productsSlice';
import registrationReducer from './slices/registrationSlice';
import reportsReducer from './slices/reportSlice';
import salespersonReducer from './slices/salespersonSlice';
import serviceOrderReducer from './slices/serviceOrderSlice';
import userReducer from './slices/userSlice';
import vehicleReducer from './slices/vehiclesSlice';
import vehiclesAssignmentsReducer from './slices/vehicleAssignmentsSlice';

export default configureStore({
	reducer: {
		currentLocations: currentLocationsReducer,
		customers: customerReducer,
		distributionOfficers: distributionOfficerReducer,
		leaderboard: leaderboardReducer,
		locations: locationReducer,
		login: loginReducer,
		notification: notificationReducer,
		products: productsReducer,
		productRegistration: productRegistrationReducer,
		registration: registrationReducer,
		report: reportsReducer,
		salespersons: salespersonReducer,
		serviceOrders: serviceOrderReducer,
		user: userReducer,
		vehicles: vehicleReducer,
		vehiclesAssignments: vehiclesAssignmentsReducer,
	},
});
