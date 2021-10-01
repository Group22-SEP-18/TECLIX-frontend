import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reducer, {
	getLocationsAsync,
	setFromFilter,
	setToFilter,
	setSPFilter,
} from '../../../../app/redux/slices/locationsSlice';

const initialState = {
	isLoading: false,
	locations: [],
	error: '',
	filters: {
		from: '',
		to: '',
		salesperson_id: '',
	},
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
	{
		id: 3,
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
		date: '2021-09-26T14:46:17.509052Z',
	},
	{
		id: 4,
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
		date: '2021-09-28T02:51:36.886687Z',
	},
	{
		id: 5,
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
		date: '2021-09-28T02:53:27.856020Z',
	},
	{
		id: 6,
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
		date: '2021-09-28T04:10:10.877715Z',
	},
	{
		id: 7,
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
		date: '2021-09-28T04:20:06.858137Z',
	},
	{
		id: 8,
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
		date: '2021-09-28T04:21:23.002338Z',
	},
	{
		id: 9,
		customer: {
			latitude: '6.85733110',
			longitude: '79.86619450',
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
		date: '2021-09-28T04:28:05.091137Z',
	},
	{
		id: 10,
		customer: {
			latitude: '6.85733110',
			longitude: '79.86619450',
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
		date: '2021-09-28T04:29:10.729302Z',
	},
	{
		id: 11,
		customer: {
			latitude: '6.85733110',
			longitude: '79.86619450',
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
		date: '2021-09-29T03:11:31.849654Z',
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
		id: 13,
		customer: {
			latitude: '6.85733140',
			longitude: '79.86619600',
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
		date: '2021-09-29T03:28:14.034017Z',
	},
	{
		id: 14,
		customer: {
			latitude: '6.85733140',
			longitude: '79.86619600',
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
		date: '2021-09-29T03:33:03.183412Z',
	},
	{
		id: 15,
		customer: {
			latitude: '6.85733110',
			longitude: '79.86619450',
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
		date: '2021-09-29T12:17:06.150698Z',
	},
	{
		id: 16,
		customer: {
			latitude: '6.85733110',
			longitude: '79.86619450',
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
		date: '2021-09-30T07:43:44.585609Z',
	},
	{
		id: 17,
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
		date: '2021-09-30T07:44:12.599708Z',
	},
];

describe('locationsSlice', () => {
	describe('reducers', () => {
		it('1) returns the initial state', () => {
			expect(reducer(undefined, {})).toEqual(initialState);
		});
		it('2) should set the from filter', () => {
			const filter = 'filter value';
			const previousState = initialState;
			const nextState = reducer(previousState, setFromFilter(filter));
			expect(nextState.filters.from).toEqual(filter);
		});
		it('3) should set the to filter', () => {
			const filter = 'filter value';
			const previousState = initialState;
			const nextState = reducer(previousState, setToFilter(filter));
			expect(nextState.filters.to).toEqual(filter);
		});
		it('4) should set the salesperson filter', () => {
			const filter = 'filter value';
			const previousState = initialState;
			const nextState = reducer(previousState, setSPFilter(filter));
			expect(nextState.filters.salesperson_id).toEqual(filter);
		});
	});
	describe('extra reducers', () => {
		it('1) getLocationsAsync.pending', () => {
			const nextState = reducer(initialState, getLocationsAsync.pending());
			expect(nextState.customers).toBe(initialState.customers);
			expect(nextState.isLoading).toBe(true);
		});

		it('2) getLocationsAsync.fulfilled', () => {
			const mockAsyncPayload = mockedData;
			const nextState = reducer(
				initialState,
				getLocationsAsync.fulfilled(mockAsyncPayload)
			);
			expect(nextState.isLoading).toBe(false);
			expect(nextState.locations).toBe(mockAsyncPayload);
		});

		it('3) getLocationsAsync.rejected', () => {
			const nextState = reducer(initialState, getLocationsAsync.rejected());
			expect(nextState.isLoading).toBe(false);
			expect(nextState.error).toBe(
				'Error while accessing salesperson locations'
			);
		});
	});
	describe('getLocationsAsync', () => {
		it('1) should call correct end point', async () => {
			const store = configureStore({
				reducer: (state = '', action) => {
					switch (action.type) {
						case 'customers/getLocationsAsync/fulfilled':
							return action.payload;
						default:
							return state;
					}
				},
			});
			const getSpy = jest.spyOn(axios, 'get');

			await store.dispatch(getLocationsAsync());
			expect(getSpy).toBeCalledWith(
				'https://teclix.herokuapp.com/salesperson-api/locations/',
				{ headers: { Authorization: 'Token null' } }
			);
		});
	});
});
