import { CaptureAPI } from './apis/CaptureAPI';
import { DownloadDataAPI } from './apis/DownloadDataAPI';
import { DownloadURLAPI } from './apis/DownloadURLAPI';
import { SystemInfoAPI } from './apis/SystemInfoAPI';
import Communicator from './common/Communicator';
import JtexAPI from './JtexAPI';

const communicator = new Communicator();

function functionalAPI<R, O>(api: JtexAPI<R, O>) {
    return (options: O) => api.apply(options);
}

export const capture = functionalAPI(new CaptureAPI(communicator));
export const downloadURL = functionalAPI(new DownloadURLAPI(communicator));
export const downloadData = functionalAPI(new DownloadDataAPI(communicator));
export const getSystemInfo = functionalAPI(new SystemInfoAPI(communicator));
