import { HttpRequest } from '../../http/protocols/http-request'
import { HttpResponse } from '../../http/protocols/http-response'
import { GetOrdersByDateRepository } from '../../infra/repositories/get-orders-by-date-repository'
import { Controller } from './protocols/controller'
import { badRequest, ok } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-param-error'

export class GetOrdersByDate implements Controller {
  private readonly getOrdersByDateRepository: GetOrdersByDateRepository

  constructor (getOrdersByDateRepository: GetOrdersByDateRepository) {
    this.getOrdersByDateRepository = getOrdersByDateRepository
  }

  async route (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.query || !httpRequest.query.date) {
      return badRequest(new MissingParamError('date'))
    }

    const date = httpRequest.query.date
    const orders = await this.getOrdersByDateRepository.get(date)

    return ok(orders)
  }
}
