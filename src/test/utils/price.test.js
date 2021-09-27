import { expect } from 'chai';
import { formatPrice } from '../../app/utils/price';

describe('price.js', () => {
	describe('#formatPrice', () => {
		it('should return the formatted price.', () => {
			const result = formatPrice(1000);
			expect(result).to.equal('Rs. 1,000');
		});
	});
});
