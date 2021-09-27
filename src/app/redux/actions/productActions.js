import { fetchAllProducts } from '../../../api/productApi';
import { productRegistration } from '../../../api/productApi';
import {
	productsPending,
	productsSuccess,
	productsFail,
} from '../slices/productsSlice';
import {
	productRegistrationPending,
	productRegistrationSuccess,
	productRegistrationError,
} from '../slices/addProductSlice';

export const fetchProductData = () => async (dispatch) => {
	try {
		dispatch(productsPending());

		const result = await fetchAllProducts();
		if (result.length) return dispatch(productsSuccess(result));

		dispatch(productsFail('No current location data'));
	} catch (error) {
		dispatch(productsFail(error));
	}
};

export const addProduct = (formData) => async (dispatch) => {
	try {
		dispatch(productRegistrationPending());

		const result = await productRegistration(formData);
		result.status === 'success'
			? dispatch(productRegistrationSuccess(result.message))
			: dispatch(productRegistrationError(result.message));
	} catch (error) {
		dispatch(productRegistrationError(error.message));
	}
};
