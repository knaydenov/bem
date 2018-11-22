import { expect } from 'chai';
import * as sinon from 'ts-sinon';
import { Block } from './block';

describe('Block', () => {
    describe('#createElement', () => {
        it('should set valid element name', () => {
            const block = new Block('test');
            expect(block.createElement('elem').name).to.be.equal('elem');
        });
    });

    describe('#e', () => {
        it('should be a proxy for createElement', () => {
            const block = new Block('test');
            const spy = sinon.default.spy(block, 'createElement');
            block.e('elem');
            expect(spy).to.have.been.calledOnce;
        });
    });

    describe('#resolveBaseClass', () => {
        it('should set valid class', () => {
            const block = new Block('test');
            expect(block.resolveBaseClass()).to.be.equal('test');
        });
    });
});

