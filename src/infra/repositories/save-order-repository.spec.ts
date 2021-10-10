import MongoHelper from '../helpers/mongo-helper'
import { SaveOrderRepository } from './save-order-repository'
import makeFakeDeal from '../../utils/make-fake-deal'

interface SutTypes {
  sut: SaveOrderRepository
}

const makeSut = (): SutTypes => {
  const sut = new SaveOrderRepository()
  return {
    sut
  }
}

describe('SaveOrderRepository', () => {
  let ordersCollection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.close()
  })

  it('Should insert a order from deal into collection orders group by date', async () => {
    const { sut } = makeSut()

    ordersCollection = await MongoHelper.getCollection('orders')

    const deal = makeFakeDeal()

    await sut.saveOrder(deal)

    const date = deal.dateWon.split(' ')[0]
    const order = await ordersCollection.findOne({ date })

    expect(order).toBeTruthy()
    expect(order.deals).toHaveLength(1)
  })
})
