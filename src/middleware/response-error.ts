import type { Request, Response, NextFunction } from 'express';


import ValidationError from '../errors/validation.error';
import AppError from 'src/errors/app.error';


export default function responseError(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  if (error instanceof ValidationError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message, // vou mostrar as duas formas
      issues: error.issues
    });
  }

  console.error('Internal server error', error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
