import { expect, should, assert } from 'chai';
import { sortArrayOfObjects } from '../../app/utils/sort';

should();

const data = [
	{
		id: 10,
		name: 'a',
	},
	{
		id: 0,
		name: 'b',
	},
	{
		id: 5,
		name: 'd',
	},
];

const sortedById = [
	{
		id: 10,
		name: 'a',
	},
	{
		id: 0,
		name: 'b',
	},
	{
		id: 5,
		name: 'd',
	},
];

describe('sort.js', () => {
	describe('#return value check', () => {
		it('1) should return a array.', () => {
			const sortedData = sortArrayOfObjects(data);
			sortedData.should.be.an('array');
		});
	});
	describe('#sort by field', () => {
		it('1) should return the started array when sortBy field not set.', () => {
			const sortedData = sortArrayOfObjects(data);
			expect(sortedData).to.equal(data);
		});
		it('2) should return a array sorted by specified field.', () => {
			const sortedData = sortArrayOfObjects(data, 'name');
			assert.deepStrictEqual(sortedData, sortedById);
		});
	});
});
