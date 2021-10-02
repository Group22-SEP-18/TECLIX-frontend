import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reducer, {
	getSalesPerProductAsync,
	salesPerProductAddToAdded,
	salesPerProductRemoveFromAdded,
} from '../../../../app/redux/slices/reportSlice';
import { data as salesperproduct } from '.../../../requests/salesperproduct.json';
import { monthList } from '../../../../app/utils';

const initialState = {
	salesPerProduct: {
		isLoading: false,
		chartColumns: monthList,
		chartValues: [],
		error: '',
		added: [],
	},
	salesPerMonth: {
		isLoading: false,
		chartValues: [],
		error: '',
	},
	payOrLater: {
		isLoading: false,
		chartValues: [],
		error: '',
	},
	salesBySalesperson: {
		isLoading: false,
		chartValues: [],
		error: '',
	},
	progressBySalesperson: {
		isLoading: false,
		chartValues: [],
		error: '',
	},
};

describe('reportSlice', () => {
	describe('salesPerProduct', () => {
		describe('reducers', () => {
			it('1) returns the initial state', () => {
				expect(reducer(undefined, {})).toEqual(initialState);
			});
			it('2) should add new id to the added list', () => {
				const newAdded = 3;
				const previousState = initialState;
				const nextState = reducer(
					previousState,
					salesPerProductAddToAdded(newAdded)
				);
				expect(nextState.salesPerProduct.added).toEqual([3]);
			});
			it('3) should remove new id from the added list', () => {
				const newAdded = 3;
				const previousState = initialState;
				previousState.salesPerProduct.added = [1, 2, 3];
				const nextState = reducer(
					previousState,
					salesPerProductRemoveFromAdded(newAdded)
				);
				expect(nextState.salesPerProduct.added).toEqual([1, 2]);
			});
		});
		describe('extra reducers', () => {
			it('1) getSalesPerProductAsync.pending', () => {
				const nextState = reducer(
					initialState,
					getSalesPerProductAsync.pending()
				);
				expect(nextState.salesPerProduct.chartValues).toBe(
					initialState.salesPerProduct.chartValues
				);
				expect(nextState.salesPerProduct.isLoading).toBe(true);
			});

			it('2) getSalesPerProductAsync.fulfilled', () => {
				const mockAsyncPayload = salesperproduct;
				const nextState = reducer(
					initialState,
					getSalesPerProductAsync.fulfilled(mockAsyncPayload)
				);
				const expected = [
					{
						product_id: 1,
						product_short_name: 'Biscuit Cut',
						product_long_name: 'Wayfarer Classic Biscuit Cut',
						data: [2500, 600, 300, 0, 300, 0, 0, 4600, 0, 0, 200, 7050],
					},
					{
						product_id: 2,
						product_short_name: 'Tikiri Mari',
						product_long_name: 'Maliban Tikiri Mari',
						data: [3500, 1700, 900, 0, 0, 300, 0, 2300, 0, 0, 2100, 1150],
					},
					{
						product_id: 3,
						product_short_name: 'Tikiri Mari',
						product_long_name: 'Manchee Tikiri Mari',
						data: [2700, 800, 3500, 0, 0, 0, 300, 1200, 0, 0, 2300, 2620],
					},
				];
				expect(nextState.salesPerProduct.isLoading).toBe(false);
				expect(nextState.salesPerProduct.chartValues).toStrictEqual(expected);
				expect(nextState.salesPerProduct.added).toStrictEqual([1, 2, 3]);
			});

			it('3) getSalesPerProductAsync.rejected', () => {
				const nextState = reducer(
					initialState,
					getSalesPerProductAsync.rejected()
				);
				expect(nextState.salesPerProduct.isLoading).toBe(false);
				expect(nextState.salesPerProduct.error).toBe(
					'Error while accessing data'
				);
			});
		});
		describe('getSalesPerProductAsync', () => {
			it('1) should call correct end point', async () => {
				const store = configureStore({
					reducer: (state = '', action) => {
						switch (action.type) {
							case 'report/getSalesPerProductAsync/fulfilled':
								return action.payload;
							default:
								return state;
						}
					},
				});
				const getSpy = jest.spyOn(axios, 'get');

				await store.dispatch(getSalesPerProductAsync());
				expect(getSpy).toBeCalledWith(
					'https://run.mocky.io/v3/46d2e675-781c-471d-b0ba-0e0a01b67c41',
					{ headers: { Authorization: 'Token null' } }
				);
			});
		});
	});
});
