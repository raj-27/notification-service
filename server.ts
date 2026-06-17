import { Config } from "./src/config";
import logger from "./src/config/logger";
import { createMessageBroker } from "./src/factories/broker-factory";
import { MessageBroker } from "./src/types/broker";

const startServer = async () => {
  let broker: MessageBroker | null = null;

  logger.info("Starting Kafka consumer service", {
    brokers: process.env.KAFKA_BROKERS,
    topics: Config.KAFKA_TOPICS,
  });

  broker = createMessageBroker();

  await broker
    .connectConsumer()
    .then(() => {
      logger.info("Kafka consumer connected successfully", {
        brokers: process.env.KAFKA_BROKERS,
      });
    })
    .catch((err) => {
      logger.error("Kafka consumer connection failed", {
        error: err,
        message: err?.message,
        stack: err?.stack,
      });
      process.exit(1);
    });

  await broker
    .consumeMessage(Config.KAFKA_TOPICS, false)
    .then(() => {
      logger.info("Kafka subscription successful", {
        topics: Config.KAFKA_TOPICS,
      });
    })
    .catch(async (err) => {
      logger.error("Kafka subscription failed", {
        error: err,
        message: err?.message,
        stack: err?.stack,
        topics: Config.KAFKA_TOPICS,
      });

      if (broker) {
        logger.warn("Disconnecting consumer due to subscription failure");
        await broker.disconnectConsumer();
      }

      process.exit(1);
    });
};

void startServer();
