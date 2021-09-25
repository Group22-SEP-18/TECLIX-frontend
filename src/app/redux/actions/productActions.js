import { fetchAllProducts } from '../../../api/productApi';
import {
	productsPending,
	productsSuccess,
	productsFail,
} from '../slices/productsSlice';

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
