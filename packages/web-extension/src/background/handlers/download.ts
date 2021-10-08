import browser from 'webextension-polyfill';
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
        browser.downloads.onDeterminingFilename.addListener(function listener(
            downloadItem: browser.downloads.DownloadItem,
            suggest: (suggestion?: browser.downloads.DownloadFilenameSuggestion) => void
        ) {
            suggest({
                filename: filename || downloadItem.filename
            });
            browser.downloads.onDeterminingFilename.removeListener(listener);
        });
        browser.downloads.download(
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
