import MongoHelper from '../helpers/mongo-helper'
import { Order } from '../models/order'

export class GetOrdersByDateRepository {
  async get (date: string): Promise<Order[]> {
    const ordersCollection = await MongoHelper.getCollection('orders')
    const result = await ordersCollection.find({ date }).toArray()
    return result
  }
}
