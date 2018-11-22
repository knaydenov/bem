import { expect, use } from 'chai';
import { Node } from './node';
import * as sinon from "ts-sinon";
import * as sinonChai from 'sinon-chai';

use(sinonChai.default);

class MockNode extends Node {
    resolveBaseClass() {
        return this.name;
    }
}

describe('Node', () => {
    describe('.constructor', () => {
        it('should set valid name', () => {
            const node = new MockNode('test');
            expect(node.name).to.be.equal('test');
        });
    });

    describe('#addModifier', () => {
        it('should add valid modifiers', () => {
            const node = new MockNode('test');
            node.addModifier('color', 'red');
            node.addModifier('big');
            node.addModifier('hidden', true);
            node.addModifier('count', 3);

            expect(node.getModifier('color')).to.be.equal('red');
            expect(node.getModifier('big')).to.be.equal(true);
            expect(node.getModifier('hidden')).to.be.equal(true);
            expect(node.getModifier('count')).to.be.equal(3);
        });

        it('should return this', () => {
            const node = new MockNode('test');
            expect(node.addModifier('color', 'red')).to.be.equal(node);
        });
    });

    describe('#removeModifier', () => {
        it('should remove modifiers correctly', () => {
            const node = new MockNode('test');
            node.addModifier('color', 'red');
            node.addModifier('big');
            node.addModifier('hidden', true);
            node.addModifier('count', 3);

            node.removeModifier('big');
            node.removeModifier('hidden');

            expect(node.getModifier('color')).to.be.equal('red');
            expect(node.getModifier('big')).to.be.undefined;
            expect(node.getModifier('hidden')).to.be.undefined;
            expect(node.getModifier('count')).to.be.equal(3);

        });

        it('should return this', () => {
            const node = new MockNode('test');
            expect(node.removeModifier('color')).to.be.equal(node);
        });
    });

    describe('#hasModifier', () => {
        it('should detect modifiers correctly', () => {
            const node = new MockNode('test');
            node.addModifier('color', 'red');
            node.addModifier('big');
            node.addModifier('hidden', true);
            node.addModifier('count', 3);

            node.removeModifier('big');
            node.removeModifier('hidden');

            expect(node.hasModifier('color')).to.be.true;
            expect(node.hasModifier('big')).to.be.false;
            expect(node.hasModifier('hidden')).to.be.false;
            expect(node.hasModifier('count')).to.be.true;
        });
    });

    describe('#addMix', () => {
        it('should add valid mixes', () => {
            const node = new MockNode('test');
            const node_a = new MockNode('a');
            const node_b = new MockNode('b');

            node.addMix(node_a);
            node.addMix(node_b);

            expect(node.mixes).to.be.lengthOf(2);
            expect(node.mixes[0]).to.be.equal(node_a);
            expect(node.mixes[1]).to.be.equal(node_b);
        });

        it('should not add duplicate mixes', () => {
            const node = new MockNode('test');
            const node_a = new MockNode('a');

            node.addMix(node_a);
            node.addMix(node_a);

            expect(node.mixes).to.be.lengthOf(1);
            expect(node.mixes[0]).to.be.equal(node_a);
        });

        it('should return this', () => {
            const node = new MockNode('test');
            const node_a = new MockNode('a');
            expect(node.addMix(node_a)).to.be.equal(node);
        });
    });
    
    describe('#removeMix', () => {
        it('should remove mixes correctly', () => {
            const node = new MockNode('test');
            const node_a = new MockNode('a');
            const node_b = new MockNode('b');
            const node_c = new MockNode('c');

            node.addMix(node_a);
            node.addMix(node_b);
            node.addMix(node_c);

            node.removeMix(node_b);

            expect(node.mixes).to.be.lengthOf(2);
            expect(node.mixes[0]).to.be.equal(node_a);
            expect(node.mixes[1]).to.be.equal(node_c);
        });

        it('should return this', () => {
            const node = new MockNode('test');
            const node_a = new MockNode('a');
            expect(node.addMix(node_a)).to.be.equal(node);
        });
    });

    describe('#hasMix', () => {
        it('should detect mixes correctly', () => {
            const node = new MockNode('test');
            const node_a = new MockNode('a');
            const node_b = new MockNode('b');
            const node_c = new MockNode('c');

            node.addMix(node_a);
            node.addMix(node_b);
            
            expect(node.hasMix(node_a)).to.be.true;
            expect(node.hasMix(node_b)).to.be.true;
            expect(node.hasMix(node_c)).to.be.false;
        });
    });

    describe('#addClass', () => {
        it('should add valid classes', () => {
            const node = new MockNode('test');
            
            node.addClass('first');
            node.addClass('last');

            expect(node.classes).to.be.lengthOf(2);
            expect(node.classes[0]).to.be.equal('first');
            expect(node.classes[1]).to.be.equal('last');
            
        });

        it('should not add duplicate class', () => {
            const node = new MockNode('test');
            
            node.addClass('first');
            node.addClass('first');

            expect(node.classes).to.be.lengthOf(1);
            expect(node.classes[0]).to.be.equal('first');
        });

        it('should return this', () => {
            const node = new MockNode('test');
            expect(node.addClass('first')).to.be.equal(node);
        });
    });

    describe('#addClasses', () => {
        it('should add valid classes', () => {
            const node = new MockNode('test');
            
            node.setClasses(['first', 'last']);

            expect(node.classes).to.be.lengthOf(2);
            expect(node.classes[0]).to.be.equal('first');
            expect(node.classes[1]).to.be.equal('last');
            
        });

        it('should not add duplicate classes', () => {
            const node = new MockNode('test');
            
            node.setClasses(['first', 'last', 'first', 'mid']);

            expect(node.classes).to.be.lengthOf(3);
            expect(node.classes[0]).to.be.equal('first');
            expect(node.classes[1]).to.be.equal('last');
            expect(node.classes[2]).to.be.equal('mid');
        });

        it('should return this', () => {
            const node = new MockNode('test');
            expect(node.setClasses(['first', 'last'])).to.be.equal(node);
        });
    });

    describe('#removeClass', () => {
        it('should remove classes correctly', () => {
            const node = new MockNode('test');
            
            node.setClasses(['first', 'mid','last']);
            node.removeClass('mid');

            expect(node.classes).to.be.lengthOf(2);
            expect(node.classes[0]).to.be.equal('first');
            expect(node.classes[1]).to.be.equal('last');
            
        });

        it('should return this', () => {
            const node = new MockNode('test');
            expect(node.removeClass('first')).to.be.equal(node);
        });
    });

    describe('#hasClass', () => {
        it('should detect classes correctly', () => {
            const node = new MockNode('test');
            
            node.setClasses(['first', 'last']);

            expect(node.hasClass('first')).to.be.true;
            expect(node.hasClass('mid')).to.be.false;
            expect(node.hasClass('last')).to.be.true;
            
        });
    });

    describe('#m', () => {
        it('should be a proxy for addModifier', () => {
            const node = new MockNode('test');
            const spy = sinon.default.spy(node, 'addModifier');
            node.m('color', 'red');
            expect(spy).to.have.been.calledOnce;
        });
    });

    describe('#mix', () => {
        it('should be a proxy for addMix', () => {
            const node = new MockNode('test');
            const node_a = new MockNode('node_a');
            const spy = sinon.default.spy(node, 'addMix');
            node.mix(node_a);
            expect(spy).to.have.been.calledOnce;
        });
    });

    describe('#buildClasses', () => {
        it('should return a valid string', () => {
            const node = new MockNode('test');
            const node_a = new MockNode('node-a');

            node.addClass('js');
            node.addModifier('color', 'red');
            node.addMix(node_a.addModifier('hidden'));

            expect(node.buildClasses()).to.be.equal('test test--color_red node-a node-a--hidden js');
        });
    });

    describe('#toString', () => {
        it('should be a proxy for buildClasses', () => {
            const node = new MockNode('test');
            const spy = sinon.default.spy(node, 'buildClasses');
            
            expect(node.toString()).to.be.equal('test');
            expect(spy).to.have.been.calledOnce;

        });
    });

    describe('#resolveClasses', () => {
        it('should return valid classes', () => {
            const node = new MockNode('test');
            const node_a = new MockNode('node_a');
            const spyResolveModifiersClasses = sinon.default.spy(node, 'resolveModifiersClasses');
            const spyResolveMixesClasses = sinon.default.spy(node, 'resolveMixesClasses');

            node.addMix(node_a);
            node.addModifier('color', 'red');
            node.addClass('js');
            
            expect(node.resolveClasses()).to.be.eql(['test', 'test--color_red', 'node_a', 'js']);
            expect(spyResolveModifiersClasses).to.have.been.calledOnce;
            expect(spyResolveMixesClasses).to.have.been.calledOnce;
        });

    });

    describe('#resolveModifiersClasses', () => {
        it('should return valid classes', () => {
            const node = new MockNode('test');

            node.addModifier('color', 'red');
            node.addModifier('hidden');
            node.addModifier('0');
            node.addModifier('1');
            node.addModifier('pos', 2);
            
            expect(node.resolveModifiersClasses()).to.be.eql(['test--color_red', 'test--hidden', 'test--0', 'test--1', 'test--pos_2']);
        });

    });

    describe('#resolveMixesClasses', () => {
        it('should return valid classes', () => {
            const node = new MockNode('test');
            const node_a = new MockNode('node_a');
            const node_b = new MockNode('node_b');


            node_a.addModifier('color', 'red');
            node_a.addModifier('hidden');
            node_b.addModifier('0');
            node_b.addModifier('1');
            node.addModifier('pos', 2);

            node.addMix(node_a);
            node.addMix(node_b);

            expect(node.resolveMixesClasses()).to.be.eql(['node_a', 'node_a--color_red', 'node_a--hidden', 'node_b','node_b--0', 'node_b--1']);
        });

    });
});

