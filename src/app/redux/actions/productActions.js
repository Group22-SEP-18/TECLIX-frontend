import { fetchAllProducts } from '../../../api/productApi';
import { productRegistration } from '../../../api/productApi';
import { deleteProductById } from '../../../api/productApi';
import {
	productsPending,
	productsSuccess,
	productsFail,
	deletePending,
	deleteSuccess,
	deleteFail,
	addnewproduct,
	deleteproduct,
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

		dispatch(productsFail('Error while accesing products data'));
	} catch (error) {
		dispatch(productsFail(error));
	}
};

export const addProduct = (formData) => async (dispatch) => {
	try {
		dispatch(productRegistrationPending());
		const result = await productRegistration(formData);
		if (result.id) {
			dispatch(addnewproduct(result));
			dispatch(productRegistrationSuccess());
		} else {
			dispatch(productRegistrationError());
		}
	} catch (error) {
		dispatch(productRegistrationError());
	}
};

export const productDelete = (id) => async (dispatch) => {
	try {
		dispatch(deletePending());
		await deleteProductById(id);
		dispatch(deleteproduct(id));
		dispatch(deleteSuccess());
	} catch (error) {
		dispatch(deleteFail(error.message));
	}
};
