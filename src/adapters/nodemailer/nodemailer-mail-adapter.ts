import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a217171119f393",
      pass: "38bb8c8c58f7ac"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail ({subject, body}: SendMailData) {
        await transport.sendMail({
        from: 'Equipa feedget <oi@feedget.com>',
        to: 'Bento Pedro bentomenni.kidima@gmail.com',
        subject,
        html: body
    })
    }
}