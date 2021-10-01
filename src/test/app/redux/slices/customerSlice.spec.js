import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reducer, {
	getCustomersAsync,
	setListViewFilter,
} from '../../../../app/redux/slices/customerSlice';

const initialState = {
	isLoading: false,
	customers: [],
	error: '',
	listViewFilter: '',
};

const mockedData = [
	{
		id: 4,
		shop_name: 'saman groceries',
		owner_first_name: 'Saman',
		owner_last_name: 'Fernando',
		email: 'sag@gmail.com',
		contact_no: '0789456123',
		profile_picture:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632731928813_gfllpj',
		latitude: '6.85733110',
		longitude: '79.86619450',
		street: '97/6 Galle Rd',
		city: 'Dehiwala-Mount Lavinia',
		district: 'Colombo',
		loyalty_points: '950.00',
		outstanding: '2390.00',
		created_date: '2021-09-30',
	},
	{
		id: 1,
		shop_name: 'gimhana stores pvt ltd',
		owner_first_name: 'gimhana',
		owner_last_name: 'silva',
		email: 'g@gamail.com',
		contact_no: '0123456789',
		profile_picture:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632541270785_sflxm1',
		latitude: '6.85732690',
		longitude: '79.86619490',
		street: '97/6 Galle Rd',
		city: 'Dehiwala-Mount Lavinia',
		district: 'Colombo',
		loyalty_points: '0.00',
		outstanding: '885.00',
		created_date: '2021-08-30',
	},
	{
		id: 3,
		shop_name: 'kumudu stores',
		owner_first_name: 'kumudu',
		owner_last_name: 'silva',
		email: 'kum@gmail.com',
		contact_no: '0123456789',
		profile_picture:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632724764459_zypz4z',
		latitude: '6.85733140',
		longitude: '79.86619600',
		street: '97/6 Galle Rd',
		city: 'Dehiwala-Mount Lavinia',
		district: 'Colombo',
		loyalty_points: '150.00',
		outstanding: '0.00',
		created_date: '2021-09-15',
	},
];

describe('customerSlice', () => {
	describe('reducers', () => {
		it('1) returns the initial state', () => {
			expect(reducer(undefined, {})).toEqual(initialState);
		});
		it('2) should set the filter', () => {
			const filter = { filter: 'filter value' };
			const previousState = initialState;
			const nextState = reducer(previousState, setListViewFilter(filter));
			expect(nextState.listViewFilter).toEqual(filter.filter);
		});
	});
	describe('extra reducers', () => {
		it('1) getCustomersAsync.pending', () => {
			const nextState = reducer(initialState, getCustomersAsync.pending());
			expect(nextState.customers).toBe(initialState.customers);
			expect(nextState.isLoading).toBe(true);
		});

		it('2) getCustomersAsync.fulfilled', () => {
			const mockAsyncPayload = mockedData;
			const nextState = reducer(
				initialState,
				getCustomersAsync.fulfilled(mockAsyncPayload)
			);
			expect(nextState.isLoading).toBe(false);
			expect(nextState.customers).toBe(mockAsyncPayload);
		});

		it('3) getCustomersAsync.rejected', () => {
			const nextState = reducer(initialState, getCustomersAsync.rejected());
			expect(nextState.isLoading).toBe(false);
			expect(nextState.error).toBe('Error while accessing customer data');
		});
	});
	describe('getCustomersAsync', () => {
		it('1) getCustomersAsync', async () => {
			const store = configureStore({
				reducer: (state = '', action) => {
					switch (action.type) {
						case 'customers/getCustomersAsync/fulfilled':
							return action.payload;
						default:
							return state;
					}
				},
			});
			const getSpy = jest.spyOn(axios, 'get');

			await store.dispatch(getCustomersAsync());
			expect(getSpy).toBeCalledWith(
				'https://teclix.herokuapp.com/customer-api/',
				{ headers: { Authorization: 'Token null' } }
			);
		});
	});
});
