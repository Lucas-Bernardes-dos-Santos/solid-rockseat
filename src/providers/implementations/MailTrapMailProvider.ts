import Mail from "nodemailer/lib/mailer";
import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'

export class MailTrapMailProvider implements IMailProvider {
  private transporter: Mail

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'b0adc71612356f',
        pass: '50bfa8fe821c2b'
      }
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      html: message.body
    })
  }
}