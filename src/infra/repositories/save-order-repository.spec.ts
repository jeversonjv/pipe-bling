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
    ordersCollection = await MongoHelper.getCollection('orders')
  })

  beforeEach(async () => {
    await ordersCollection.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.close()
  })

  test('Should insert a order from deal into collection orders group by date', async () => {
    const { sut } = makeSut()

    const deal = makeFakeDeal()

    await sut.saveOrder(deal)

    const date = deal.dateWon.split(' ')[0]
    const order = await ordersCollection.findOne({ date })

    expect(order).toBeTruthy()
    expect(order.deals).toHaveLength(1)
  })

  test('Should throw if insert a id of deal that already exists', async () => {
    const { sut } = makeSut()

    const deal = makeFakeDeal()

    await sut.saveOrder(deal)

    const promise = sut.saveOrder(deal)

    await expect(promise).rejects.toThrow()
  })

  test('Should insert in deals property if order already exists', async () => {
    const { sut } = makeSut()

    const deal = makeFakeDeal()

    await sut.saveOrder(deal)

    const deal2 = { ...deal, id: 2 }

    await sut.saveOrder(deal2)

    const date = deal.dateWon.split(' ')[0]
    const order = await ordersCollection.findOne({ date })

    expect(order).toBeTruthy()
    expect(order.deals).toHaveLength(2)
  })
})
