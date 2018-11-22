import { Node } from "./node";
import { Block } from "./block";

export class Element extends Node {
    protected _block: Block;

    constructor(name: string, block: Block) {
        super(name);
        this._block = block;
    }

    get block() {
        return this._block;
    }

    resolveBaseClass() {
        return `${this._block.name}__${this.name}`;
    }
}