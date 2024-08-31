import winston from "winston";
import { customLevels } from "../constants";
import { loadEnv } from "../utils";

const { levels, colors } = customLevels;

const { combine, printf, timestamp, label, colorize } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const { SERVICE_NAME } = loadEnv(["SERVICE_NAME"]);

export const logger = winston.createLogger({
  levels,
  level: "silly",
  format: combine(
    colorize(),
    label({ label: SERVICE_NAME }),
    timestamp({ format: "HH:mm:ss" }),
    myFormat
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize({ all: true }), myFormat),
    })
  );
}

winston.addColors(colors);
