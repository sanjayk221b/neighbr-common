import { Express } from "express";
import { logger } from "../lib";
import { loadEnv } from "./load-env";

interface CreateServerOptions {
  app: Express;
}

export function createServer({ app }: CreateServerOptions): void {
  const { PORT, SERVICE_NAME } = loadEnv(["PORT", "SERVICE_NAME"]);

  const port = Number(PORT);
  if (isNaN(port)) {
    throw new Error(
      `Invalid PORT value: '${PORT}'. PORT should be a valid number.`
    );
  }

  const serviceName = SERVICE_NAME;

  app.listen(port, () => {
    logger.info(
      `[ SERVICE :: ${serviceName} ] is listening on http://localhost:${port}`
    );
  });
}
