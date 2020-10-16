import { capture, CaptureDataFormat, CaptureBounding } from './capture';
import { download } from './download';
import { ActionOption } from './types';

interface CaptureOption extends ActionOption {
    bounding?: CaptureBounding;
    filename?: string;
}

export async function captureAndSave(options: CaptureOption) {
    const imageBlob = await capture({
        ...options,
        format: CaptureDataFormat.BLOB
    });
    await download({
        ...options,
        data: imageBlob,
        filename: options.filename
    });
    return true;
}
