import { KafkaBroker } from "../config/kafka";
import { MessageBroker } from "../types/broker";
import { Config } from "../config";
import logger from "../config/logger";

let broker: MessageBroker | null = null;

export const createMessageBroker = (): MessageBroker => {
  logger.info("Connecting to kafka....");
  // singleton
  if (!broker) {
    // This is basically url on which kafka server is running
    broker = new KafkaBroker("notification-service", Config.KAFKA_BROKERS);
  }
  return broker;
};
