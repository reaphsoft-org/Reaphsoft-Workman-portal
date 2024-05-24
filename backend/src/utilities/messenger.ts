// 24/05/2024 11:27
// reaphsoft-workman
// github.com/kahlflekzy

import { applicationDefault, initializeApp , App} from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging"


export class Messenger {
    private app: App;

    constructor() {
        this.app = initializeApp({
            credential: applicationDefault(),
        });
    }

    async sendMessage(registrationToken: string, payload: { key: string, data: string }, messageContent: string){
        // fixme input title below
        const message = {
            notification: {
                title: '',
                body: messageContent
            },
            data: payload,
            token: registrationToken,
        }
        getMessaging().send(
            message
        )
        .then( _ => {})
        .catch( e => console.log(`Error sending message: ${e}`));
    }
}