import nodemailer, { Transporter } from "nodemailer";
import { Message, NotificationTransport } from "./types/notification-types";
import { Config } from "./config";

export class MailTransport implements NotificationTransport {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: Config.SMTP_HOST,
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: Config.SMTP_USERNAME,
        pass: Config.SMTP_PASSWORD,
      },
    });
  }
  async send(message: Message): Promise<void> {
    try {
      // Send the message via email
      await this.transporter.sendMail({
        from: Config.SMTP_FROM_EMAIL,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
