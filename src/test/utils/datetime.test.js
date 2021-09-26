import { expect } from 'chai';
import { getDateTime } from '../../app/utils/datetime';

describe('datetime.js', () => {
	describe('#getDateTime', () => {
		it('1) should return the date and time for given timestamp.', () => {
			const result = getDateTime('2021-06-22T17:33:34Z');
			expect(result.day).to.equal('6/22/2021');
			expect(result.time).to.equal('11:03 PM');
		});
	});
});
