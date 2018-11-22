import { expect } from 'chai';
import { Element } from './element';
import { Block } from './block';

describe('Element', () => {
    describe('.constructor', () => {
        it('should set valid block', () => {
            const block = new Block('test');
            const element = new Element('elem', block);
            expect(element.block).to.be.equal(block);
        });
    });

    describe('#resolveBaseClass', () => {
        it('should set valid class', () => {
            const block = new Block('test');
            const element = new Element('elem', block);
            expect(element.resolveBaseClass()).to.be.equal('test__elem');
        });
    });
});

