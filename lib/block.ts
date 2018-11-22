import { Node } from "./node";
import { Element } from "./element";

export class Block extends Node {
    resolveBaseClass() {
        return this.name;
    }

    createElement(name: string) {
        return new Element(name, this);
    }

    e(name: string) {
        return this.createElement(name);
    }
}