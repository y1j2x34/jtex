import browser from 'webextension-polyfill';
import TXON from 'txon';
import { COMMUNICATOR_ID } from '../common/consts';
import * as actionHandlers from './handlers';

browser.runtime.onConnect.addListener(port => {
    console.assert(port.name === COMMUNICATOR_ID);
    port.onMessage.addListener(msg => {
        const parsedMsg = TXON.parse(msg);
        const msgId = parsedMsg.msgId;
        const data = parsedMsg.data;
        if (data.action in actionHandlers) {
            const handler = actionHandlers[data.action];
            handler
                .call(null, {
                    windowId: port.sender?.tab?.windowId,
                    ...(data.options || {})
                })
                .then(
                    result => {
                        port.postMessage(
                            TXON.stringify({
                                msgId,
                                data: result
                            })
                        );
                    },
                    reason => {
                        port.postMessage(
                            TXON.stringify({
                                msgId,
                                error: reason
                            })
                        );
                    }
                );
        } else {
            console.error('Invalid message', msg);
        }
    });
});
