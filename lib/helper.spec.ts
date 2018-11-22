import { expect } from 'chai';
import { b } from './helper';


describe('Helper', () => {
    describe('b', () => {
        it('should create a valid block', () => {
            const block = b('test');
            expect(block.name).to.be.equal('test');
        });
    });
});

