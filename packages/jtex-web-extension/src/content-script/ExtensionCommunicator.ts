import browser from 'webextension-polyfill';
import TXON from 'txon';
import Defer from '../common/defer';

const messageIdGenerator = (() => {
    let seq = Date.now();
    return (prefix: string) => `${prefix}-` + (seq++).toString(16);
})();

export default class ExtensionCommunicator {
    private port: browser.runtime.Port;
    private defers: {
        [msgId: string]: Defer;
    } = {};
    constructor(private name: string) {
        this.port = browser.runtime.connect({ name });
        this.port.onMessage.addListener(message => {
            const msg = TXON.parse(message);
            const defer = this.defers[msg.msgId];
            if (msg.error) {
                defer.reject(msg.error);
            } else {
                defer.resolve(msg.data);
            }
            delete this.defers[msg.msgId];
        });
    }
    public async send<T = any>(data: any): Promise<T> {
        const msgId = messageIdGenerator(this.name);
        const defer = new Defer<T>();
        this.defers[msgId] = defer;
        this.port.postMessage(
            TXON.stringify({
                msgId,
                data
            })
        );
        return defer.promise;
    }
}
