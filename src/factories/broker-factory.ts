import config from "config";
import { KafkaBroker } from "../config/kafka";
import { MessageBroker } from "../types/broker";

let broker: MessageBroker | null = null;

export const createMessageBroker = (): MessageBroker => {
  console.log("connecting to kafka broker...");
  // singleton
  if (!broker) {
    // This is basically url on which kafka server is running
    broker = new KafkaBroker(
      "notification-service",
      config.get<string[]>("kafka.broker"),
    );
  }
  return broker;
};
