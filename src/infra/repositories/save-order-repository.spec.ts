import { MongoHelper } from '../helpers/mongo-helper'

const mongoHelper = new MongoHelper()

describe('SaveOrderRepository', () => {
  let ordersCollection

  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL ?? global.__MONGO_URI__)
  })

  afterAll(async () => {
    await mongoHelper.close()
  })

  it('Should insert a order from deal into collection orders group by date', async () => {
    ordersCollection = await mongoHelper.getCollection('orders')

    const mockUser = { _id: 'some-user-id', name: 'John' }
    await ordersCollection.insertOne(mockUser)

    const insertedUser = await ordersCollection.findOne({ _id: 'some-user-id' })
    expect(insertedUser).toEqual(mockUser)
  })
})
