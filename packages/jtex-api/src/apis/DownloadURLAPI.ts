import JtexAPI from '../JtexAPI';

export class DownloadURLAPI extends JtexAPI<void, string> {
    public apply(url: string): Promise<void> {
        return this.communicator.send('download', {
            data: url
        });
    }
}
