import nodemailer, { Transporter } from "nodemailer";
import { Message, NotificationTransport } from "./types/notification-types";
import config from "config";
export class MailTransport implements NotificationTransport {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.get("mail.host"),
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: config.get("mail.auth.user"),
        pass: config.get("mail.auth.password"),
      },
    });
  }
  async send(message: Message): Promise<void> {
    try {
      // Send the message via email
      const info = await this.transporter.sendMail({
        from: config.get("mail.from"),
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
      });
      console.log("Message sent: ", info.messageId);
    } catch (error) {
      console.log(error);
    }
  }
}
