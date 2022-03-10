import { HttpResponse } from '../ports';

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const badRequest = (error: any): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (error?: Error): HttpResponse => ({
  statusCode: 500,
  body: error || {
    message: 'internal server error',
  },
});
