import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reducer, {
	getDistributionOfficersAsync,
	setListViewFilter,
} from '../../../../app/redux/slices/distributionOfficersSlice';

const initialState = {
	isLoading: false,
	distributionOfficers: [],
	error: '',
	approve: {
		isLoading: false,
		success: null,
		error: null,
		id: '',
	},
	reject: {
		isLoading: false,
		success: null,
		error: null,
		id: '',
	},
	listViewFilter: '',
};

const mockedData = [
	{
		id: 13,
		employee_no: '005',
		email: 'lal@gmail.com',
		first_name: 'Hirumal',
		last_name: 'Mendis',
		contact_no: '1234567890',
		profile_picture:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/discord_profile_picture_by_smashingbrand_dc2ghq0-fullview_o2u6sj',
		is_rejected: true,
		is_approved: true,
	},
	{
		id: 14,
		employee_no: '00001',
		email: 'sp1@teclix.com',
		first_name: 'Angelena',
		last_name: 'Powlowski',
		contact_no: '1234567890',
		profile_picture:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/discord_profile_picture_by_smashingbrand_dc2ghq0-fullview_iiievr',
		is_rejected: false,
		is_approved: true,
	},
	{
		id: 15,
		employee_no: 'do1',
		email: 'do1@teclix.com',
		first_name: 'Amal',
		last_name: 'Perera',
		contact_no: '0123456789',
		profile_picture:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/1_gmnfwo',
		is_rejected: false,
		is_approved: true,
	},
	{
		id: 3,
		employee_no: 'EMP2001',
		email: 'sam@gmail.com',
		first_name: 'sam',
		last_name: 'smith',
		contact_no: '0774128593',
		profile_picture:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/111_whpaqt',
		is_rejected: true,
		is_approved: true,
	},
	{
		id: 17,
		employee_no: '123EE',
		email: 'shehanxperera@gmail.com',
		first_name: 'Shehan',
		last_name: 'Perera',
		contact_no: '0767876760',
		profile_picture:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/Photo_from_Shehan_Perera_pdq24q',
		is_rejected: false,
		is_approved: true,
	},
	{
		id: 18,
		employee_no: '1234',
		email: 'shehanperera@gmail.com',
		first_name: 'shehan',
		last_name: 'perera',
		contact_no: '0789599339',
		profile_picture:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/Photo_from_Shehan_Perera_w3p7gy',
		is_rejected: false,
		is_approved: true,
	},
];

describe('distributionOfficersSlice', () => {
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
		it('1) getDistributionOfficersAsync.pending', () => {
			const nextState = reducer(
				initialState,
				getDistributionOfficersAsync.pending()
			);
			expect(nextState.distributionOfficers).toBe(
				initialState.distributionOfficers
			);
			expect(nextState.isLoading).toBe(true);
		});

		it('2) getDistributionOfficersAsync.fulfilled', () => {
			const mockAsyncPayload = mockedData;
			const nextState = reducer(
				initialState,
				getDistributionOfficersAsync.fulfilled(mockAsyncPayload)
			);
			expect(nextState.isLoading).toBe(false);
			expect(nextState.distributionOfficers).toBe(mockAsyncPayload);
		});

		it('3) getDistributionOfficersAsync.rejected', () => {
			const nextState = reducer(
				initialState,
				getDistributionOfficersAsync.rejected()
			);
			expect(nextState.isLoading).toBe(false);
			expect(nextState.error).toBe(
				'Error while accessing distribution officers informations'
			);
		});
	});
	describe('getDistributionOfficersAsync', () => {
		it('1) should call correct end point', async () => {
			const store = configureStore({
				reducer: (state = '', action) => {
					switch (action.type) {
						case 'distributionOfficers/getDistributionOfficersAsync/fulfilled':
							return action.payload;
						default:
							return state;
					}
				},
			});
			const getSpy = jest.spyOn(axios, 'get');

			await store.dispatch(getDistributionOfficersAsync());
			expect(getSpy).toBeCalledWith(
				'https://teclix.herokuapp.com/staff-api/distribution-officer/pending/',
				{ headers: { Authorization: 'Token null' } }
			);
		});
	});
});
