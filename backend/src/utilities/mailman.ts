import Mailgun, { MailgunMessageData } from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces';
import * as fs from 'fs';
import { User } from '../entities/User';
import { EstateManager } from '../entities/EstateManager';
import { createPDF } from './createpdf';
import * as nodemailer from 'nodemailer';
import * as process from 'process';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MailGun {
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

class NodeMailer {
    private transporter: Mail<SMTPTransport.SentMessageInfo>;
    private readonly host: string;

    constructor() {
        this.host = process.env.EMAIL_HOST_USER || '';
        this.transporter = nodemailer.createTransport({
            host: 'send.one.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: this.host,
                pass: process.env.EMAIL_HOST_PASSWORD || '',
            },
        });
    }

    async sendTextMail(
        recipient: string,
        subject: string,
        text: string,
        html: string,
    ) {
        const data = {
            from: `Reaphsoft Workmen <${this.host}>`,
            to: [recipient],
            subject: subject,
            text: text,
            html: html,
        };
        return await this.sendMail(data);
    }

    private async sendMail(data: MailgunMessageData) {
        let response: string = 'sent';
        this.transporter.sendMail(data, (error, info) => {
            if (error) {
                response = error.message;
            } else {
                response = info.response;
            }
        });
        return response;
    }

    async sendTextMailWithAttachment(
        recipient: string,
        subject: string,
        text: string,
        html: string,
        filePath: string,
    ) {
        const data: MailgunMessageData = {
            from: `Reaphsoft Workmen <${this.host}>`,
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
}

const Email = NodeMailer;

export default Email;
