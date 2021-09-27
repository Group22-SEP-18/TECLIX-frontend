import { fetchAllVehicles } from '../../../api/vehicleApi';
import { assigntoVehicle } from '../../../api/vehicleApi';
import { fetchVehicleAssignments } from '../../../api/vehicleApi';

import {
	vehiclesPending,
	vehiclesSuccess,
	vehiclesFail,
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

export const fetchVehicleAssignData = (id) => async (dispatch) => {
	try {
		dispatch(vehiclesAssignmentsPending());

		const result = await fetchVehicleAssignments(id);
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
		result.status === 'success'
			? dispatch(assigningSuccess(result.message))
			: dispatch(assigningError(result.message));
	} catch (error) {
		dispatch(assigningError(error.message));
	}
};
