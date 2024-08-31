import morgan from "morgan";
import { logger } from "../lib";

const stream = {
  write: (message: string) => logger.info(message.trim()),
};

export const requestLogger = morgan("dev", { stream });
