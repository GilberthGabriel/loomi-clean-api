import { HttpResponse } from '../controllers/ports';

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const unauthorized = (body: any): HttpResponse => ({
  statusCode: 401,
  body,
});

export const forbidden = (body: any): HttpResponse => ({
  statusCode: 403,
  body,
});

export const badRequest = (error: any): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const notFound = (error: any): HttpResponse => ({
  statusCode: 404,
  body: error,
});

export const conflict = (body: any): HttpResponse => ({
  statusCode: 406,
  body,
});

export const serverError = (error?: Error): HttpResponse => ({
  statusCode: 500,
  body: error || {
    message: 'internal server error',
  },
});
