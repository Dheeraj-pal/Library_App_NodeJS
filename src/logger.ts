import { Request, Response, NextFunction } from "express";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }),
  ],
});

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, path, ip } = req;
  logger.info(
    `IP - ${ip}, METHOD - ${method}, PATH - ${path}, STATUS - ${res.statusCode}`
  );
  next();
};

export { logger };
