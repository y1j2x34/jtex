import JtexAPI from '../JtexAPI';

export type TypedArray =
    | Int8Array
    | Uint8Array
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array;

export class DownloadDataAPI extends JtexAPI<void, Blob | ArrayBuffer | TypedArray> {
    public apply(data: Blob | ArrayBuffer | TypedArray): Promise<void> {
        return this.communicator.send('download', {
            data
        });
    }
}
