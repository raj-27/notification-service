import { Consumer, EachMessagePayload, Kafka, KafkaConfig } from "kafkajs";
import { MessageBroker } from "../types/broker";
import { createNotificationTransport } from "../factories/notification-factory";
import { handleOrderHtml, handleOrderText } from "../handlers/orderHandler";
import { Config } from ".";

export class KafkaBroker implements MessageBroker {
  private consumer: Consumer;

  constructor(clientId: string, brokers: string[]) {
    let kafkaConfig: KafkaConfig = {
      clientId,
      brokers,
    };

    if (process.env.NODE_ENV === "production") {
      kafkaConfig = {
        ...kafkaConfig,
        ssl: true,
        connectionTimeout: 45000,
        sasl: {
          mechanism: "plain",
          username: Config.KAFKA_SASL_USERNAME,
          password: Config.KAFKA_SASL_PASSWORD,
        },
      };
    }
    const kafka = new Kafka(kafkaConfig);
    this.consumer = kafka.consumer({ groupId: clientId });
  }

  /**
   * Connect the consumer
   */
  async connectConsumer() {
    await this.consumer.connect();
  }

  /**
   * Disconnect the consumer
   */
  async disconnectConsumer() {
    await this.consumer.disconnect();
  }

  async consumeMessage(topics: string[], fromBeginning: boolean = false) {
    await this.consumer.subscribe({ topics, fromBeginning });

    await this.consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        // Logic to handle incoming messages.
        console.log({
          value: message.value.toString(),
          topic,
          partition,
        });
        if (topic === "order") {
          // Todo: Decide whether to send notification or not .. // according to event_type
          const transport = createNotificationTransport("mail");
          const order = JSON.parse(message.value.toString());
          await transport.send({
            // Todo: change "to" from order details
            to: "raj819314@gmail.com",
            subject: "Order Update",
            text: handleOrderText(order),
            html: handleOrderHtml(order),
          });
        }
      },
    });
  }
}
