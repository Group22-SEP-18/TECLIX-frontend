import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reducer, {
	fetchCurrentLocationsAsync,
} from '../../../../app/redux/slices/currentLocationsSlice';

const initialState = {
	isLoading: false,
	currentLocations: [],
	error: '',
};

const mockedData = [
	{
		id: 1,
		customer: {
			latitude: '6.85732690',
			longitude: '79.86619490',
			street: '97/6 Galle Rd',
			city: 'Dehiwala-Mount Lavinia',
			district: 'Colombo',
		},
		salesperson: {
			id: 1,
			email: 'kane@gmail.com',
			employee_no: 'EMP1001',
			first_name: 'kane',
			last_name: 'peries',
			contact_no: '0771234569',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
			is_approved: true,
		},
		date: '2021-09-25T05:12:34.480418Z',
	},
	{
		id: 12,
		customer: {
			latitude: '6.85733110',
			longitude: '79.86619450',
			street: '97/6 Galle Rd',
			city: 'Dehiwala-Mount Lavinia',
			district: 'Colombo',
		},
		salesperson: {
			id: 10,
			email: 'sak@gmail.com',
			employee_no: 'EMP1018',
			first_name: 'shane',
			last_name: 'silva',
			contact_no: '0785962525',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632575390036_wmqrmz',
			is_approved: true,
		},
		date: '2021-09-29T03:21:07.824205Z',
	},
	{
		id: 2,
		customer: {
			latitude: '6.85732690',
			longitude: '79.86619490',
			street: '97/6 Galle Rd',
			city: 'Dehiwala-Mount Lavinia',
			district: 'Colombo',
		},
		salesperson: {
			id: 11,
			email: 'shez@gmail.com',
			employee_no: 'EMP1022',
			first_name: 'shehani',
			last_name: 'perera',
			contact_no: '0785962333',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632575489746_zqmqzu',
			is_approved: true,
		},
		date: '2021-09-26T14:30:28.873760Z',
	},
];

describe('customerSlice', () => {
	describe('reducers', () => {
		it('1) returns the initial state', () => {
			expect(reducer(undefined, {})).toEqual(initialState);
		});
	});
	describe('extra reducers', () => {
		it('1) fetchCurrentLocationsAsync.pending', () => {
			const nextState = reducer(
				initialState,
				fetchCurrentLocationsAsync.pending()
			);
			expect(nextState.currentLocations).toBe(initialState.currentLocations);
			expect(nextState.isLoading).toBe(true);
		});

		it('2) fetchCurrentLocationsAsync.fulfilled', () => {
			const mockAsyncPayload = mockedData;
			const nextState = reducer(
				initialState,
				fetchCurrentLocationsAsync.fulfilled(mockAsyncPayload)
			);
			expect(nextState.isLoading).toBe(false);
			expect(nextState.currentLocations).toBe(mockAsyncPayload);
		});

		it('3) fetchCurrentLocationsAsync.rejected', () => {
			const nextState = reducer(
				initialState,
				fetchCurrentLocationsAsync.rejected()
			);
			expect(nextState.isLoading).toBe(false);
			expect(nextState.error).toBe('Error while accessing locations data');
		});
	});
	describe('fetchCurrentLocationsAsync', () => {
		it('1) should call correct end point', async () => {
			const store = configureStore({
				reducer: (state = '', action) => {
					switch (action.type) {
						case 'currentLocations/fetchCurrentLocationsAsync/fulfilled':
							return action.payload;
						default:
							return state;
					}
				},
			});
			const getSpy = jest.spyOn(axios, 'get');

			await store.dispatch(fetchCurrentLocationsAsync());
			expect(getSpy).toBeCalledWith(
				'https://teclix.herokuapp.com/salesperson-api/locations/current',
				{ headers: { Authorization: 'Token null' } }
			);
		});
	});
});
