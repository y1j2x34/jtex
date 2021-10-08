import Communicator from './common/Communicator';

export default abstract class JtexAPI<T, O> {
    constructor(protected readonly communicator: Communicator) {}
    public abstract apply(options: O): Promise<T>;
}
