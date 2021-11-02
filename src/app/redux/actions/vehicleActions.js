import { useToast } from '@chakra-ui/react';

import { fetchAllVehicles } from '../../../api/vehicleApi';
import { assigntoVehicle } from '../../../api/vehicleApi';
import { vehicleRegistration } from '../../../api/vehicleApi';
import { fetchVehicleAssignments } from '../../../api/vehicleApi';
import { deleteVehicleById } from '../../../api/vehicleApi';
import { unassignVehicleById } from '../../../api/vehicleApi';

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
	vehiclesUnassignPending,
	vehiclesUnassignSuccess,
	vehiclesUnassignFail,
} from '../slices/vehicleAssignmentsSlice';
import {
	vehicleRegistrationPending,
	vehicleRegistrationSuccess,
	vehicleRegistrationError,
} from '../slices/addVehicleSlice';

var Toast_type2 = (success) => {
	const toast = useToast();
	toast({
		position: 'bottom-right',
		title: success ? 'Success' : 'Failed',
		status: success ? 'success' : 'error',
		duration: 5000,
		isClosable: true,
	});
};

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

export const assignToVehicle = (formData, rowid) => async (dispatch) => {
	try {
		dispatch(assigningPending());
		if (rowid) {
			await unassignVehicleById(rowid);
		}
		const result = await assigntoVehicle(formData);
		if (result.vehicle) {
			dispatch(assigningSuccess(result.message));
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

export const vehicleUnassign = (id) => async (dispatch) => {
	try {
		dispatch(vehiclesUnassignPending());
		await unassignVehicleById(id);
		dispatch(vehiclesUnassignSuccess());
		dispatch(fetchVehicleAssignData());
		Toast_type2(true);
	} catch (error) {
		dispatch(vehiclesUnassignFail());
	}
};
