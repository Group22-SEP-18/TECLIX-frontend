import { configureStore } from '@reduxjs/toolkit';
import assigntoVehicleReducer from './slices/assignToVehicleSlice';
import currentLocationsReducer from './slices/currentLocationsSlice';
import customerReducer from './slices/customerSlice';
import distributionOfficerReducer from './slices/distributionOfficersSlice';
import leaderboardPointSchemaReducer from './slices/leaderboardPointSchemaSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import locationReducer from './slices/locationsSlice';
import loginReducer from './slices/loginSlice';
import loyaltyPointSchemaReducer from './slices/loyaltyPointSchemaSlice';
import productsReducer from './slices/productsSlice';
import productRegistrationReducer from './slices/addProductSlice';
import reportsReducer from './slices/reportSlice';
import salespersonReducer from './slices/salespersonSlice';
import serviceOrderReducer from './slices/serviceOrderSlice';
import userReducer from './slices/userSlice';
import vehicleReducer from './slices/vehiclesSlice';
import vehicleRegistrationReducer from './slices/addVehicleSlice';
import vehiclesAssignmentsReducer from './slices/vehicleAssignmentsSlice';

export default configureStore({
	reducer: {
		assigntoVehicle: assigntoVehicleReducer,
		currentLocations: currentLocationsReducer,
		customers: customerReducer,
		distributionOfficers: distributionOfficerReducer,
		leaderboard: leaderboardReducer,
		leaderboardPointSchema: leaderboardPointSchemaReducer,
		locations: locationReducer,
		login: loginReducer,
		loyaltyPointSchema: loyaltyPointSchemaReducer,
		products: productsReducer,
		productRegistration: productRegistrationReducer,
		report: reportsReducer,
		salespersons: salespersonReducer,
		serviceOrders: serviceOrderReducer,
		user: userReducer,
		vehicles: vehicleReducer,
		vehicleRegistration: vehicleRegistrationReducer,
		vehiclesAssignments: vehiclesAssignmentsReducer,
	},
});
