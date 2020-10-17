import Defer from './defer';

const messageIdGenerator = (() => {
    let seq = Date.now();
    return (prefix: string) => `${prefix}-` + (seq++).toString(16);
})();

interface JTexResponseData {
    mark: string;
    error: boolean;
    message: {
        messageId: string;
        returns?: any;
        throws?: Error;
    };
}

export default class Communicator {
    private readonly mark = 'jtex-message-1753208bb79';
    private messageDefers: {
        [messageId: string]: Defer;
    } = {};
    constructor() {
        const messageEventListener = (e: MessageEvent<JTexResponseData>) => {
            const data = e.data;
            if (data.mark !== this.mark || !data.message) {
                return;
            }
            const message = data.message;
            const defer = this.messageDefers[message.messageId];
            if (data.error) {
                defer.reject(message.throws);
            } else {
                defer.resolve(message.returns);
            }
            delete this.messageDefers[message.messageId];
        };
        window.addEventListener('message', messageEventListener);
    }
    public send<R>(action: string, options: any): Promise<R> {
        const messageId = messageIdGenerator('jtex-api');
        const defer = new Defer<R>();
        this.messageDefers[messageId] = defer;
        window.postMessage(
            {
                mark: this.mark,
                message: {
                    messageId,
                    action,
                    options
                }
            },
            '*'
        );
        return defer.promise;
    }
}
