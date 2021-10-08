import browser from 'webextension-polyfill';
import Defer from '../../common/defer';
import { ActionOption } from './types';

type FunctionPassingCallback = (callback: (data: any) => void) => void;

type CallbackParameter<T extends FunctionPassingCallback> = T extends (callback: (data: infer P) => void) => void
    ? P
    : never;

function promisify<T extends FunctionPassingCallback, R = CallbackParameter<T>>(
    method: T,
    context: any
): () => Promise<R> {
    return () => {
        const defer = new Defer<R>();
        method.call(context, (data: R) => {
            defer.resolve(data);
        });
        return defer.promise;
    };
}

export function getSystemInfo(_: ActionOption) {
    const memory = browser.rsystem.memory;
    const storage = browser.system.storage;
    const cpu = browser.system.cpu;
    return Promise.all([
        promisify<typeof cpu.getInfo>(cpu.getInfo, cpu)(),
        promisify<typeof memory.getInfo>(memory.getInfo, memory)(),
        promisify<typeof storage.getInfo>(storage.getInfo, storage)()
    ]).then(([cpuInfo, memoryInfo, storageUnitInfoArray]) => {
        return {
            cpu: cpuInfo,
            memory: memoryInfo,
            storage: storageUnitInfoArray
        };
    });
}
