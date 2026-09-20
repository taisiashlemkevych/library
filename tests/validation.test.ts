import { expect } from 'chai';
import { Validation } from '../src/utils/validators';

describe('Validation', () => {
    it('should validate required fields', () => {
        expect(Validation.required('Test')).to.equal(true);
        expect(Validation.required('')).to.equal(false);
        expect(Validation.required('   ')).to.equal(false);
    });

    it('should validate user ID', () => {
        expect(Validation.userId('12345')).to.equal(true);
        expect(Validation.userId('00123')).to.equal(true);
        expect(Validation.userId('12abc')).to.equal(false);
        expect(Validation.userId('user123')).to.equal(false);
    });

    it('should validate publication year', () => {
        expect(Validation.publicationYear('2024')).to.equal(true);
        expect(Validation.publicationYear('1997')).to.equal(true);
        expect(Validation.publicationYear('24')).to.equal(false);
        expect(Validation.publicationYear('2024abc')).to.equal(false);
    });
});