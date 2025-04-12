import config from "config";
import { KafkaBroker } from "../config/kafka";
import { MessageBroker } from "../types/broker";

let broker: MessageBroker | null = null;

export const createMessageBroker = (): MessageBroker => {
  console.log("connecting to kafka broker...");
  // singleton
  if (!broker) {
    broker = new KafkaBroker("notification-service", [
      // This is basically url on which kafka server is running
      config.get<string>("kafka.broker"),
    ]);
  }
  return broker;
};
