import JtexAPI from '../JtexAPI';

export class SystemInfoAPI extends JtexAPI<void, void> {
    public apply(): Promise<void> {
        return this.communicator.send('getSystemInfo', {});
    }
}
