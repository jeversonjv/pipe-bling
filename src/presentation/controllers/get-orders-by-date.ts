import { HttpRequest } from '../../http/protocols/http-request'
import { HttpResponse } from '../../http/protocols/http-response'
import { Controller } from './protocols/controller'

export class GetOrders implements Controller {
  async route (httpRequest: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: 'ok'
    }
  }
}
