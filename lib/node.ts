export interface IModifier {
    name: string;
    value: boolean|string|number|null
}

export abstract class Node {
    protected _name: string;
    protected _classes: string[] = [];
    protected _modifiers: IModifier[] = [];
    private _mixes: Node[] = [];

    constructor(name: string) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    getModifier(name: string) {
        const modifier = this._modifiers.find(modifier => {
            return modifier.name === name;
        });

        if (modifier !== undefined) {
            return modifier.value;
        }

        return undefined;
    }
    
    addModifier(name: string, value: boolean|string|number|null = true) {
        if (!this.hasModifier(name)) {
            this._modifiers.push({
                name: name,
                value: value
            });
        }
        return this;
    }

    removeModifier(name: string) {
        const i = this._modifiers.findIndex(modifier => {
            return modifier.name === name;
        });

        if (i !== -1) {
            this._modifiers.splice(i, 1);
        }

        return this;
    }

    hasModifier(name: string) {
        return this._modifiers.findIndex(modifier => {
            return modifier.name === name;
        }) !== -1;
    }

    get modifiers() {
        return this._modifiers;
    }

    addMix(node: Node) {
        if (!this.hasMix(node)) {
            this._mixes.push(node);
        }
        return this;
    }

    removeMix(node: Node) {
        const i = this._mixes.indexOf(node);
        if (i !== -1) {
            this._mixes.splice(i, 1);
        }
        return this;
    }

    hasMix(node: Node) {
        return this._mixes.indexOf(node) !== -1;
    }

    get mixes() {
        return this._mixes;
    }

    addClass(className: string) {
        if (!this.hasClass(className)) {
            this._classes.push(className);
        }
        return this;   
    }

    setClasses(classes: string[]) {
        this._classes = [...new Set(classes)]; 
        return this;   
    }

    removeClass(className: string) {
        const i = this._classes.indexOf(className);
        if (i !== -1) {
            this._classes.splice(i, 1);
        }
        return this;   
    }

    hasClass(className: string) {
        return this._classes.indexOf(className) !== -1
    }

    get classes() {
        return this._classes;
    }

    m(name: string, value: boolean|string|number|null = true) {
        return this.addModifier(name, value);
    }

    mix(node: Node) {
        return this.addMix(node);
    }

    buildClasses() {
        return this.resolveClasses().join(' ');
    }

    toString() {
        return this.buildClasses();
    }

    resolveClasses() {
        let classes = [this.resolveBaseClass()];

        classes = [...classes, ...this.resolveModifiersClasses()];
        classes = [...classes, ...this.resolveMixesClasses()];
        classes = [...classes, ...this.classes];
        
        return [...new Set(classes)];
    }

    resolveModifiersClasses() {
        const classes: string[] = [];

        this.
            _modifiers
            .forEach((modifier) => {
                switch(true) {
                    case typeof modifier.value === 'boolean':
                        if (modifier.value === true) {
                            classes.push(`${this.resolveBaseClass()}--${modifier.name}`);
                        }
                        break;
                    case modifier.value === null:
                        break;
                    case typeof modifier.value === 'string':
                    case typeof modifier.value === 'number':
                    default:
                        classes.push(`${this.resolveBaseClass()}--${modifier.name}_${modifier.value}`);

                }
            });

        return classes;
    }

    resolveMixesClasses() {
        let classes: string[] = [];

        this._mixes.forEach(mix => {
            classes = [...classes, ...mix.resolveClasses()]
        });

        return [...new Set(classes)];
    }

    abstract resolveBaseClass(): string;
}