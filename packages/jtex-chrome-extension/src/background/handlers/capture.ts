import { ActionOption } from './types';

export enum CaptureDataFormat {
    DATAURL = 0,
    BLOB = 1
}

export interface CaptureBounding {
    left: number;
    top: number;
    width: number;
    height: number;
}

interface CaptureOption extends ActionOption {
    format: CaptureDataFormat;
    bounding?: CaptureBounding;
}

function formatNumber(min: number, max: number, value: number = min) {
    if (isNaN(value) || !isFinite(value)) {
        return min;
    }
    return Math.min(max, Math.max(value, min));
}

export function capture(options: CaptureOption): Promise<Blob | string> {
    const { windowId, format = CaptureDataFormat.DATAURL } = options;
    return new Promise((resolve, reject) => {
        chrome.tabs.captureVisibleTab(windowId, { format: 'png' }, imageURL => {
            const img = new Image();
            img.onload = () => {
                const bounding = options.bounding;
                const left: number = formatNumber(0, img.width, bounding?.left);
                const top: number = formatNumber(0, img.height, bounding?.top);
                const width: number = formatNumber(img.width - left, img.width, bounding?.width);
                const height: number = formatNumber(img.height - top, img.height, bounding?.height);

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, -left, -top);
                switch (format) {
                    case CaptureDataFormat.BLOB:
                        canvas.toBlob(it => {
                            if (it) {
                                resolve(it);
                            } else {
                                reject(new Error('Failed to convert capture image to blob data!'));
                            }
                        }, 'image/png');
                        break;
                    case CaptureDataFormat.DATAURL:
                        resolve(canvas.toDataURL('image/png'));
                        break;
                }
            };
            img.src = imageURL;
        });
    });
}
