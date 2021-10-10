import makeFakeDeal from '../../utils/make-fake-deal'
import MongoHelper from '../helpers/mongo-helper'
import { GetOrdersByDateRepository } from './get-orders-by-date-repository'
import { SaveOrderRepository } from './save-order-repository'

interface SutTypes {
  sut: GetOrdersByDateRepository
  saveOrderRepository: SaveOrderRepository
}

const makeSut = (): SutTypes => {
  const sut = new GetOrdersByDateRepository()
  const saveOrderRepository = new SaveOrderRepository()
  return {
    sut,
    saveOrderRepository
  }
}

describe('GetOrdersByDateRepository', () => {
  let ordersCollection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? global.__MONGO_URI__)
    ordersCollection = await MongoHelper.getCollection('orders')
  })

  beforeEach(async () => {
    await ordersCollection.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.close()
  })

  test('Should return a list of orders by date', async () => {
    const { sut, saveOrderRepository } = makeSut()
    const deal = makeFakeDeal()

    await saveOrderRepository.saveOrder(deal)

    const deal2 = { ...deal, id: 2, dateWon: '2021-10-10' }

    await saveOrderRepository.saveOrder(deal2)

    const result = await sut.get('2021-10-10')
    expect(result).toHaveLength(1)
  })
})
