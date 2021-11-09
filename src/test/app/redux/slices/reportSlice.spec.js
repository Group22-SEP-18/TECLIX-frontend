import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reducer, {
	getSalesPerProductAsync,
	getSalesPerMonthAsync,
	getPayOrLaterAsync,
	getSalesBySalespersonAsync,
	getProgressBySalespersonAsync,
	salesPerProductAddToAdded,
	salesPerProductRemoveFromAdded,
} from '../../../../app/redux/slices/reportSlice';
import { data as salesperproduct } from '.../../../requests/salesperproduct.json';
import { data as totalsales } from '.../../../requests/totalsales.json';
import { data as payOrLater } from '.../../../requests/payOrLater.json';
import { data as salesBySalesperson } from '.../../../requests/sales-salesperson.json';
import { data as progressBySalesperson } from '.../../../requests/progress.json';
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
					'https://teclix.herokuapp.com/report-api/sales-per-product',
					{ headers: { Authorization: 'Token null' } }
				);
			});
		});
	});
	describe('salesPerMonth', () => {
		describe('extra reducers', () => {
			it('1) getSalesPerMonthAsync.pending', () => {
				const nextState = reducer(
					initialState,
					getSalesPerMonthAsync.pending()
				);
				expect(nextState.salesPerMonth.chartValues).toBe(
					initialState.salesPerMonth.chartValues
				);
				expect(nextState.salesPerMonth.isLoading).toBe(true);
			});

			it('2) getSalesPerMonthAsync.fulfilled', () => {
				const mockAsyncPayload = totalsales;
				const nextState = reducer(
					initialState,
					getSalesPerMonthAsync.fulfilled(mockAsyncPayload)
				);
				expect(nextState.salesPerMonth.isLoading).toBe(false);
			});

			it('3) getSalesPerMonthAsync.rejected', () => {
				const nextState = reducer(
					initialState,
					getSalesPerMonthAsync.rejected()
				);
				expect(nextState.salesPerMonth.isLoading).toBe(false);
				expect(nextState.salesPerMonth.error).toBe(
					'Error while accessing data'
				);
			});
		});
		describe('getSalesPerMonthAsync', () => {
			it('1) should call correct end point', async () => {
				const store = configureStore({
					reducer: (state = '', action) => {
						switch (action.type) {
							case 'report/getSalesPerMonthAsync/fulfilled':
								return action.payload;
							default:
								return state;
						}
					},
				});
				const getSpy = jest.spyOn(axios, 'get');

				await store.dispatch(getSalesPerMonthAsync());
				expect(getSpy).toBeCalledWith(
					'https://teclix.herokuapp.com/report-api/total-sales-by-month',
					{ headers: { Authorization: 'Token null' } }
				);
			});
		});
	});
	describe('payOrLater', () => {
		describe('extra reducers', () => {
			it('1) getPayOrLaterAsync.pending', () => {
				const nextState = reducer(initialState, getPayOrLaterAsync.pending());
				expect(nextState.payOrLater.chartValues).toBe(
					initialState.payOrLater.chartValues
				);
				expect(nextState.payOrLater.isLoading).toBe(true);
			});

			it('2) getPayOrLaterAsync.fulfilled', () => {
				const mockAsyncPayload = payOrLater;
				const nextState = reducer(
					initialState,
					getPayOrLaterAsync.fulfilled(mockAsyncPayload)
				);
				expect(nextState.payOrLater.isLoading).toBe(false);
				expect(nextState.payOrLater.chartValues).toStrictEqual(
					mockAsyncPayload
				);
			});

			it('3) getPayOrLaterAsync.rejected', () => {
				const nextState = reducer(initialState, getPayOrLaterAsync.rejected());
				expect(nextState.payOrLater.isLoading).toBe(false);
				expect(nextState.payOrLater.error).toBe('Error while accessing data');
			});
		});
		describe('getPayOrLaterAsync', () => {
			it('1) should call correct end point', async () => {
				const store = configureStore({
					reducer: (state = '', action) => {
						switch (action.type) {
							case 'report/getPayOrLaterAsync/fulfilled':
								return action.payload;
							default:
								return state;
						}
					},
				});
				const getSpy = jest.spyOn(axios, 'get');

				await store.dispatch(getPayOrLaterAsync());
				expect(getSpy).toBeCalledWith(
					'https://teclix.herokuapp.com/report-api/pay-and-pay-later',
					{ headers: { Authorization: 'Token null' } }
				);
			});
		});
	});
	describe('salesBySalesperson', () => {
		describe('extra reducers', () => {
			it('1) getSalesBySalespersonAsync.pending', () => {
				const nextState = reducer(
					initialState,
					getSalesBySalespersonAsync.pending()
				);
				expect(nextState.salesBySalesperson.chartValues).toBe(
					initialState.salesBySalesperson.chartValues
				);
				expect(nextState.salesBySalesperson.isLoading).toBe(true);
			});

			it('2) getSalesBySalespersonAsync.fulfilled', () => {
				const mockAsyncPayload = salesBySalesperson;
				const nextState = reducer(
					initialState,
					getSalesBySalespersonAsync.fulfilled(mockAsyncPayload)
				);
				expect(nextState.salesBySalesperson.isLoading).toBe(false);
				expect(nextState.salesBySalesperson.chartValues).toStrictEqual(
					mockAsyncPayload
				);
			});

			it('3) getSalesBySalespersonAsync.rejected', () => {
				const nextState = reducer(
					initialState,
					getSalesBySalespersonAsync.rejected()
				);
				expect(nextState.salesBySalesperson.isLoading).toBe(false);
				expect(nextState.salesBySalesperson.error).toBe(
					'Error while accessing data'
				);
			});
		});
		describe('getSalesBySalespersonAsync', () => {
			it('1) should call correct end point', async () => {
				const store = configureStore({
					reducer: (state = '', action) => {
						switch (action.type) {
							case 'report/getSalesBySalespersonAsync/fulfilled':
								return action.payload;
							default:
								return state;
						}
					},
				});
				const getSpy = jest.spyOn(axios, 'get');

				await store.dispatch(getSalesBySalespersonAsync());
				expect(getSpy).toBeCalledWith(
					'https://teclix.herokuapp.com/report-api/salesperson-sales-current-month',
					{ headers: { Authorization: 'Token null' } }
				);
			});
		});
	});
	describe('progressBySalesperson', () => {
		describe('extra reducers', () => {
			it('1) getProgressBySalespersonAsync.pending', () => {
				const nextState = reducer(
					initialState,
					getProgressBySalespersonAsync.pending()
				);
				expect(nextState.progressBySalesperson.chartValues).toBe(
					initialState.progressBySalesperson.chartValues
				);
				expect(nextState.progressBySalesperson.isLoading).toBe(true);
			});

			it('2) getProgressBySalespersonAsync.fulfilled', () => {
				const mockAsyncPayload = progressBySalesperson;
				const nextState = reducer(
					initialState,
					getProgressBySalespersonAsync.fulfilled(mockAsyncPayload)
				);
				expect(nextState.progressBySalesperson.isLoading).toBe(false);
				expect(nextState.progressBySalesperson.chartValues).toStrictEqual(
					mockAsyncPayload
				);
			});

			it('3) getProgressBySalespersonAsync.rejected', () => {
				const nextState = reducer(
					initialState,
					getProgressBySalespersonAsync.rejected()
				);
				expect(nextState.progressBySalesperson.isLoading).toBe(false);
				expect(nextState.progressBySalesperson.error).toBe(
					'Error while accessing data'
				);
			});
		});
		describe('getProgressBySalespersonAsync', () => {
			it('1) should call correct end point', async () => {
				const store = configureStore({
					reducer: (state = '', action) => {
						switch (action.type) {
							case 'report/getProgressBySalespersonAsync/fulfilled':
								return action.payload;
							default:
								return state;
						}
					},
				});
				const getSpy = jest.spyOn(axios, 'get');

				await store.dispatch(getProgressBySalespersonAsync());
				expect(getSpy).toBeCalledWith(
					'https://teclix.herokuapp.com/report-api/salesperson-sales-progress',
					{ headers: { Authorization: 'Token null' } }
				);
			});
		});
	});
});
