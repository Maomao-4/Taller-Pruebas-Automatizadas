import type { Request, Response, NextFunction } from "express";
import pino from "pino";

const logger = pino()

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  logger.error("Unhandled error:", error);

  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
}
