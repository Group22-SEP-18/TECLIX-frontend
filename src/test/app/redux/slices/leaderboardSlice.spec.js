import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reducer, {
	getLeaderboardAsync,
} from '../../../../app/redux/slices/leaderboardSlice';

const initialState = {
	isLoading: false,
	leaderboard: [],
	todayLeaderboard: [],
	monthLeaderboard: [],
	alltimeLeaderboard: [],
	error: '',
};

const mockedData = [
	{
		salesperson: {
			id: 1,
			employee_no: 'EMP1001',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		points_today: '195.75',
		points_current_month: '3905.75',
		points_all_time: '8195.75',
	},
	{
		salesperson: {
			id: 11,
			employee_no: 'EMP1022',
			first_name: 'shehani',
			last_name: 'perera',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632575489746_zqmqzu',
		},
		points_today: '1525.00',
		points_current_month: '3710.00',
		points_all_time: '4740.00',
	},
	{
		salesperson: {
			id: 10,
			employee_no: 'EMP1018',
			first_name: 'shane',
			last_name: 'silva',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632575390036_wmqrmz',
		},
		points_today: '677.00',
		points_current_month: '2172.00',
		points_all_time: '5972.00',
	},
	{
		salesperson: {
			id: 8,
			employee_no: 'EMP1011',
			first_name: 'kasun',
			last_name: 'chamika',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632575121855_ywrrnb',
		},
		points_today: '150.00',
		points_current_month: '1500.00',
		points_all_time: '4300.00',
	},
	{
		salesperson: {
			id: 9,
			employee_no: 'EMP1015',
			first_name: 'nimal',
			last_name: 'perera',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632575208451_prgvqe',
		},
		points_today: '300.00',
		points_current_month: '1420.00',
		points_all_time: '4200.00',
	},
	{
		salesperson: {
			id: 16,
			employee_no: 'EMP4500',
			first_name: 'saq',
			last_name: 'Peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632739843091_xe37mx',
		},
		points_today: '0.00',
		points_current_month: '0.00',
		points_all_time: '0.00',
	},
];

describe('customerSlice', () => {
	describe('reducers', () => {
		it('1) returns the initial state', () => {
			expect(reducer(undefined, {})).toEqual(initialState);
		});
	});
	describe('extra reducers', () => {
		it('1) getLeaderboardAsync.pending', () => {
			const nextState = reducer(initialState, getLeaderboardAsync.pending());
			expect(nextState.leaderboard).toBe(initialState.leaderboard);
			expect(nextState.isLoading).toBe(true);
		});

		it('2) getLeaderboardAsync.fulfilled', () => {
			const mockAsyncPayload = mockedData;
			const nextState = reducer(
				initialState,
				getLeaderboardAsync.fulfilled(mockAsyncPayload)
			);
			expect(nextState.isLoading).toBe(false);
			expect(nextState.leaderboard).toBe(mockAsyncPayload);
			expect(nextState.error).toBe('');
		});

		it('3) getCustomersAsync.rejected', () => {
			const nextState = reducer(initialState, getLeaderboardAsync.rejected());
			expect(nextState.isLoading).toBe(false);
			expect(nextState.error).toBe(
				'Error while accessing salesperson leaderboard'
			);
		});
	});
	describe('getLeaderboardAsync', () => {
		it('1) should call correct end point', async () => {
			const store = configureStore({
				reducer: (state = '', action) => {
					switch (action.type) {
						case 'customers/getLeaderboardAsync/fulfilled':
							return action.payload;
						default:
							return state;
					}
				},
			});
			const getSpy = jest.spyOn(axios, 'get');

			await store.dispatch(getLeaderboardAsync());
			expect(getSpy).toBeCalledWith(
				'https://teclix.herokuapp.com/salesperson-api/leaderboard/',
				{ headers: { Authorization: 'Token null' } }
			);
		});
	});
});
