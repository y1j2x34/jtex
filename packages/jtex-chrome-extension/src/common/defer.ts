export default class Defer<T = any> {
    public readonly promise: Promise<T>;
    // tslint:disable-next-line:variable-name
    private _resolve!: (value?: T | PromiseLike<T>) => void;
    // tslint:disable-next-line:variable-name
    private _reject!: (reson?: any) => void;
    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
    public get resolve() {
        return this._resolve;
    }
    public get reject() {
        return this._reject;
    }
}
