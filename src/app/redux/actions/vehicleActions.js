import { fetchAllVehicles } from '../../../api/vehicleApi';
import { assigntoVehicle } from '../../../api/vehicleApi';
import { vehicleRegistration } from '../../../api/vehicleApi';
import { fetchVehicleAssignments } from '../../../api/vehicleApi';
import { deleteVehicleById } from '../../../api/vehicleApi';

import {
	vehiclesPending,
	vehiclesSuccess,
	vehiclesFail,
	addnewvehicle,
	deletevehicle,
	deletePending,
	deleteSuccess,
	deleteFail,
} from '../slices/vehiclesSlice';
import {
	assigningPending,
	assigningSuccess,
	assigningError,
} from '../slices/assignToVehicleSlice';
import {
	vehiclesAssignmentsPending,
	vehiclesAssignmentsSuccess,
	vehiclesAssignmentsFail,
} from '../slices/vehicleAssignmentsSlice';
import {
	vehicleRegistrationPending,
	vehicleRegistrationSuccess,
	vehicleRegistrationError,
} from '../slices/addVehicleSlice';

export const fetchVehicleData = () => async (dispatch) => {
	try {
		dispatch(vehiclesPending());

		const result = await fetchAllVehicles();
		if (result.length) return dispatch(vehiclesSuccess(result));

		dispatch(vehiclesFail('No vehicle data'));
	} catch (error) {
		dispatch(vehiclesFail(error));
	}
};

export const fetchVehicleAssignData = () => async (dispatch) => {
	try {
		dispatch(vehiclesAssignmentsPending());

		const result = await fetchVehicleAssignments();
		if (result.length) return dispatch(vehiclesAssignmentsSuccess(result));

		dispatch(vehiclesAssignmentsFail('No vehicle assign data'));
	} catch (error) {
		dispatch(vehiclesAssignmentsFail(error));
	}
};

export const assignToVehicle = (formData) => async (dispatch) => {
	try {
		dispatch(assigningPending());

		const result = await assigntoVehicle(formData);
		if (result.vehicle) {
			dispatch(assigningSuccess(result.message));
			dispatch(deletevehicle(result.vehicle));
			dispatch(fetchVehicleAssignData());
		} else {
			dispatch(assigningError(result.message));
		}
	} catch (error) {
		dispatch(assigningError(error.message));
	}
};

export const addVehicle = (formData) => async (dispatch) => {
	try {
		dispatch(vehicleRegistrationPending());
		const result = await vehicleRegistration(formData);
		if (result.id) {
			dispatch(addnewvehicle(result));
			dispatch(vehicleRegistrationSuccess());
		} else {
			dispatch(vehicleRegistrationError());
		}
	} catch (error) {
		dispatch(vehicleRegistrationError());
	}
};

export const vehicleDelete = (id) => async (dispatch) => {
	try {
		dispatch(deletePending());
		await deleteVehicleById(id);
		dispatch(deletevehicle(id));
		dispatch(deleteSuccess());
	} catch (error) {
		dispatch(deleteFail(error.message));
	}
};
