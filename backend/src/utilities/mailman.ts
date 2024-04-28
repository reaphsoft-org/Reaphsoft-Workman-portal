import Mailgun, { MailgunMessageData } from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces';
import * as fs from 'fs';
import { User } from '../entities/User';
import { EstateManager } from '../entities/EstateManager';
import { createPDF } from './createpdf';

export class Email {
    private mailgun: Mailgun;
    private mg: IMailgunClient;
    private domain: string;

    constructor() {
        this.mailgun = new Mailgun(FormData);
        this.mg = this.mailgun.client({
            username: process.env.MAILGUN_USERNAME || 'invalid-username',
            key: process.env.MAILGUN_API_KEY || 'invalid-key',
            url: 'https://api.eu.mailgun.net',
        });
        this.domain = process.env.MAILGUN_DOMAIN || 'invalid-domain';
    }

    async sendTextMail(
        recipient: string,
        subject: string,
        text: string,
        html: string,
    ) {
        const data = {
            from: 'Reaphsoft Workmen <noreply@reaphsoft-workmen.com>',
            to: [recipient],
            subject: subject,
            text: text,
            html: html,
        };
        return await this.sendMail(data);
    }

    async sendTextMailWithAttachment(
        recipient: string,
        subject: string,
        text: string,
        html: string,
        filePath: string,
    ) {
        const data: MailgunMessageData = {
            from: 'Reaphsoft Workmen <noreply@reaphsoft-workmen.com>',
            to: [recipient],
            subject: subject,
            text: text,
            html: html,
        };
        try {
            const fileData = fs.readFileSync(filePath);
            data.attachment = {
                data: fileData,
            };
        } catch (e) {
            // todo log failure
            console.log(e);
        }
        return await this.sendMail(data);
    }

    async sendMail(data: MailgunMessageData) {
        let response: string = 'sent';
        await this.mg.messages
            .create(this.domain, data)
            .then(() => (response = 'Queued'))
            .catch(() => {
                response = 'Error encountered';
            });
        return response;
    }

    async sendAgreement(user: User | EstateManager, filePath: string) {
        const resp = await this.sendTextMailWithAttachment(
            user.email,
            'Reaphsoft Workmen Contractual Agreement',
            `Dear ${user.fullname},\n\nThank you for creating an account with us. Here is an official contractual agreement between us which is binding whenever you use our services.\n\nWarm Regards\nReaphsoft Workmen`,
            '',
            filePath,
        );
        return { status: resp };
    }

    async sendAccountCreateMail(user: User | EstateManager) {
        const resp = await createPDF(user);
        if (resp.success) {
            const mailResponse = await this.sendAgreement(user, resp.filePath!);
            if (mailResponse.status !== 'Queued') {
                // log something
            }
            fs.rmSync(resp.filePath!);
        } else {
            console.log(resp);
        }
    }
}
