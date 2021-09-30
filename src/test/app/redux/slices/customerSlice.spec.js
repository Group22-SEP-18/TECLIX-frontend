import reducer, {
	setListViewFilter,
} from '../../../../app/redux/slices/customerSlice';

const initialState = {
	isLoading: false,
	customers: [],
	error: '',
	listViewFilter: '',
};

test('should return the initial state', () => {
	expect(reducer(undefined, {})).toEqual(initialState);
});

// test('should handle the change to loading state', () => {
// 	const previousState = initialState;
// 	expect(reducer(previousState, customersPending())).toEqual({
// 		isLoading: true,
// 		customers: [],
// 		error: '',
// 		listViewFilter: '',
// 	});
// });

// test('should handle the change the payload when successful', () => {
// 	const previousState = initialState;
// 	expect(reducer(previousState, customersPending())).toEqual({
// 		isLoading: true,
// 		customers: [],
// 		error: '',
// 		listViewFilter: '',
// 	});
// });
