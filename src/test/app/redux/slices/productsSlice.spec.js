import reducer, {
	productsPending,
	productsSuccess,
	productsFail,
	deletePending,
	deleteSuccess,
	deleteFail,
	addnewproduct,
	deleteproduct,
} from '../../../../app/redux/slices/productsSlice';

const initialState = {
	isLoading: false,
	products: [],
	error: '',
	deleteproduct: {
		isLoading: false,
		success: false,
		error: null,
	},
};

const mockedPayload = [
	{
		id: 8,
		short_name: 'Tipi Tip',
		long_name: 'Tipi Tip Extruded Snack 55g',
		barcode: 'A-000330-Z',
		product_image:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
		category: 'chips',
		price: '60.00',
	},
	{
		id: 9,
		short_name: 'Cheddar Cheese',
		long_name: 'Processed Cheddar Cheese 250g',
		barcode: 'A-000410-Z',
		product_image:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture12_vk1i8d',
		category: 'cheese',
		price: '350.00',
	},
];
const mokedPayloadNewItem = {
	id: 10,
	short_name: 'Happy Cow Cheese',
	long_name: 'Australian Happy Cow Cheese 340g',
	barcode: 'A-000490-Z',
	product_image:
		'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture13_fkldml',
	category: 'cheese',
	price: '260.00',
};
const mokedPayloadWithNewItem = [
	{
		id: 8,
		short_name: 'Tipi Tip',
		long_name: 'Tipi Tip Extruded Snack 55g',
		barcode: 'A-000330-Z',
		product_image:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
		category: 'chips',
		price: '60.00',
	},
	{
		id: 9,
		short_name: 'Cheddar Cheese',
		long_name: 'Processed Cheddar Cheese 250g',
		barcode: 'A-000410-Z',
		product_image:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture12_vk1i8d',
		category: 'cheese',
		price: '350.00',
	},
	{
		id: 10,
		short_name: 'Happy Cow Cheese',
		long_name: 'Australian Happy Cow Cheese 340g',
		barcode: 'A-000490-Z',
		product_image:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture13_fkldml',
		category: 'cheese',
		price: '260.00',
	},
];

describe('productsSlice', () => {
	describe('reducers', () => {
		it('1) returns the initial state', () => {
			expect(reducer(undefined, {})).toEqual(initialState);
		});
		it('2) should set the loading state', () => {
			const previousState = initialState;
			const nextState = reducer(previousState, productsPending());
			expect(nextState.isLoading).toEqual(true);
		});
		it('3) should set the success state', () => {
			const previousState = initialState;
			const nextState = reducer(previousState, productsSuccess(mockedPayload));
			expect(nextState.isLoading).toEqual(false);
			expect(nextState.products).toEqual(mockedPayload);
		});
		it('4) should set the fail state', () => {
			const previousState = initialState;
			const nextState = reducer(
				previousState,
				productsFail('Error while accesing products data')
			);
			expect(nextState.isLoading).toEqual(false);
			expect(nextState.error).toEqual('Error while accesing products data');
		});
		it('5) should set the isloading in deleteProduct', () => {
			const previousState = initialState;
			const nextState = reducer(previousState, deletePending());
			expect(nextState.deleteproduct.isLoading).toEqual(true);
		});
		it('6) should set the success state in deleteProduct', () => {
			const previousState = initialState;
			const nextState = reducer(previousState, deleteSuccess());
			expect(nextState.deleteproduct.success).toEqual(true);
			expect(nextState.deleteproduct.error).toEqual('');
		});
		it('7) should set the fail state in deleteProduct', () => {
			const previousState = initialState;
			const nextState = reducer(
				previousState,
				deleteFail('Error while accesing products data')
			);
			expect(nextState.deleteproduct.isLoading).toEqual(false);
			expect(nextState.deleteproduct.error).toEqual(
				'Error while accesing products data'
			);
			expect(nextState.deleteproduct.success).toEqual(false);
		});
		it('8) should add new product to the products state', () => {
			const previousState = initialState;
			const nextState = reducer(previousState, productsSuccess(mockedPayload));
			const afterState = reducer(nextState, addnewproduct(mokedPayloadNewItem));
			expect(afterState.products).toEqual(mokedPayloadWithNewItem);
		});
		it('9) should update products state after the deleteProduct', () => {
			const previousState = initialState;
			const nextState = reducer(
				previousState,
				productsSuccess(mokedPayloadWithNewItem)
			);
			const afterState = reducer(
				nextState,
				deleteproduct(mokedPayloadNewItem.id)
			);
			expect(afterState.products).toEqual(mockedPayload);
		});
	});
});
