import { HttpRequest } from '../../../http/protocols/http-request'
import { HttpResponse } from '../../../http/protocols/http-response'

export interface Controller {
  route: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
