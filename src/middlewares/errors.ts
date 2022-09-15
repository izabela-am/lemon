import { NextFunction, Request, Response } from "express";

import AppError from "../utils/Error";

export function error(err: Error, request: Request, response: Response, _: NextFunction) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
}