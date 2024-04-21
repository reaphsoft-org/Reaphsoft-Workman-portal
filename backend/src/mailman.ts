import Mailgun from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces';

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
    let response: string = 'sent';
    await this.mg.messages
      .create(this.domain, {
        from: 'Reaphsoft Workmen <noreply@reaphsoft-workmen.com>',
        to: [recipient],
        subject: subject,
        text: text,
        html: html,
      })
      .then(() => (response = 'Queued'))
      .catch(() => {
        response = 'Error encountered';
      });
    return response;
  }

  sendTextMailWithAttachment() {}
}
