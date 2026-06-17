import { config } from "dotenv";
import path from "path";

config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV ?? "dev"}`),
});

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SMTP_FROM_EMAIL,
  KAFKA_BROKERS,
  KAFKA_TOPICS,
  KAFKA_SASL_USERNAME,
  KAFKA_SASL_PASSWORD,
  CLIENT_BASE_URL,
} = process.env;

export const Config = Object.freeze({
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SMTP_FROM_EMAIL,
  KAFKA_BROKERS: KAFKA_BROKERS ? KAFKA_BROKERS.split(",") : [],
  KAFKA_TOPICS: KAFKA_TOPICS ? KAFKA_TOPICS.split(",") : [],
  KAFKA_SASL_USERNAME,
  KAFKA_SASL_PASSWORD,
  CLIENT_BASE_URL,
});
