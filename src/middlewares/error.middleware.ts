import { Request, Response, NextFunction } from "express";
import { ApiError } from "../types/api.js";

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message,
      code: err.code,
      details: err.details,
    });
    return;
  }

  res.status(500).json({
    message: err.message || "Internal server error",
  });
};
