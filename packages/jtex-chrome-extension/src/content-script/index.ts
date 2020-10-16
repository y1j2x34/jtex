import { COMMUNICATOR_ID, JTEX_MESSAGE_MARK } from '../common/consts';
import ExtensionCommunicator from './ExtensionCommunicator';

interface JTexMessage {
    messageId: string;
    action: string;
    options: any;
}

const communicator = new ExtensionCommunicator(COMMUNICATOR_ID);

window.addEventListener('message', e => {
    const data = e.data;
    if (data.mark !== JTEX_MESSAGE_MARK || !data.message) {
        return;
    }
    const message = data.message as JTexMessage;
    communicator
        .send({
            action: message.action,
            options: message.options
        })
        .then(
            result => {
                window.postMessage(
                    {
                        mark: JTEX_MESSAGE_MARK,
                        error: false,
                        message: {
                            messageId: message.messageId,
                            returns: result
                        }
                    },
                    e.origin
                );
            },
            reason => {
                window.postMessage(
                    {
                        mark: JTEX_MESSAGE_MARK,
                        error: true,
                        message: {
                            messageId: message.messageId,
                            throws: reason
                        }
                    },
                    e.origin
                );
            }
        );
});
