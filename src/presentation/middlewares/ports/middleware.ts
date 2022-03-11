import { HttpRequest, HttpResponse } from '../../controllers/ports';

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
