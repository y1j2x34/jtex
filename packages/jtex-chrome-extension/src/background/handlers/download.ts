import { TypedArray } from 'txon/types';
import { ActionOption } from './types';

interface DownloadOption extends ActionOption {
    data: string | Blob | ArrayBuffer | TypedArray;
    filename?: string;
}

export function download(options: DownloadOption) {
    const { data, filename } = options;
    const isDataURL = typeof data === 'string';
    let url;
    if (isDataURL) {
        url = data;
    } else {
        if (data instanceof ArrayBuffer) {
            const blob = new Blob([new Uint8Array(data)], { type: 'application/octet-stream' });
            url = URL.createObjectURL(blob);
        } else if (data instanceof Blob) {
            url = URL.createObjectURL(data);
        } else if (
            data instanceof Uint8Array ||
            data instanceof Uint8ClampedArray ||
            data instanceof Uint16Array ||
            data instanceof Uint32Array ||
            data instanceof Int8Array ||
            data instanceof Int16Array ||
            data instanceof Int32Array
        ) {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            url = URL.createObjectURL(blob);
        }
    }

    return new Promise(resolve => {
        chrome.downloads.onDeterminingFilename.addListener(function listener(
            downloadItem: chrome.downloads.DownloadItem,
            suggest: (suggestion?: chrome.downloads.DownloadFilenameSuggestion) => void
        ) {
            suggest({
                filename: filename || downloadItem.filename
            });
            chrome.downloads.onDeterminingFilename.removeListener(listener);
        });
        chrome.downloads.download(
            {
                url,
                filename,
                method: 'GET',
                saveAs: false
            },
            downloadId => {
                resolve(downloadId);
                if (!isDataURL) {
                    URL.revokeObjectURL(url);
                }
            }
        );
    });
}
