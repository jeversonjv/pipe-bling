import { Order } from '../../infra/models/order'
import { GetOrdersByDate } from './get-orders-by-date'

interface SutTypes {
  sut: GetOrdersByDate
}

const makeGetOrdersByDateRepository = (): any => {
  class GetOrdersByDateRepository {
    async get (date: string): Promise<Order[]> {
      return []
    }
  }

  return new GetOrdersByDateRepository()
}

const makeSut = (): SutTypes => {
  const getOrdersByDateRepository = makeGetOrdersByDateRepository()
  const sut = new GetOrdersByDate(getOrdersByDateRepository)
  return {
    sut
  }
}

describe('GetOrders Test', () => {
  test('Should return 400 if no date are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {}
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 200 if date are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {
        date: 'any_date'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
