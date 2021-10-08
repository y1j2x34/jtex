import JtexAPI from '../JtexAPI';

export interface CaptureOptions {
    left: number;
    top: number;
    width: number;
    height: number;
}

const BLOB_FORMAT = 1;

export class CaptureAPI extends JtexAPI<Blob, CaptureOptions> {
    public apply(options: CaptureOptions): Promise<Blob> {
        return this.communicator.send('capture', {
            ...options,
            format: BLOB_FORMAT
        });
    }
}
