import { MailTransport } from "../mail";
import { NotificationTransport } from "../types/notification-types";

const transport: NotificationTransport[] = [];

export const createNotificationTransport = (
  type: "mail" | "sms",
): NotificationTransport => {
  switch (type) {
    case "mail": {
      const requiredTransportCache = transport.find(
        (transport) => transport instanceof MailTransport,
      );
      if (requiredTransportCache) return requiredTransportCache;
      const instance = new MailTransport();
      transport.push(instance);
      return instance;
    }
    case "sms":
      throw new Error("Sms notification not supported");
    default:
      throw new Error("Invalid notification type");
  }
};
