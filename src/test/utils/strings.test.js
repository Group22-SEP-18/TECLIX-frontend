import { expect } from 'chai';
import {
	capitalizeFirstLetter,
	sentenceFromCamelCase,
} from '../../app/utils/strings';

describe('strings.js', () => {
	describe('#capitalizeFirstLetter', () => {
		it('1) should return empty string for empty string.', () => {
			const result = capitalizeFirstLetter('');
			expect(result).to.equal('');
		});
		it('2) should return a string which has leangth equal to passed string.', () => {
			const passed = 'asdf';
			const result = capitalizeFirstLetter(passed);
			expect(result).to.be.a('string');
			expect(result).to.have.lengthOf(4);
		});
		it('3) should return a string which has capilalized the first letter.', () => {
			const passed = 'asdf';
			const result = capitalizeFirstLetter(passed);
			expect(result).to.be.a('string');
			expect(result).to.equal('Asdf');
		});
	});
	describe('#sentenceFromCamelCase', () => {
		it('1) should return empty string for empty string.', () => {
			const result = sentenceFromCamelCase('');
			expect(result).to.equal('');
		});
		it('2) should return a string which has capilalized the first letter.', () => {
			const passed = 'thisIsTest';
			const result = sentenceFromCamelCase(passed);
			expect(result).to.be.a('string');
			expect(result).to.equal('This Is Test');
		});
	});
});
