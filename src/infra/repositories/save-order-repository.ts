import { Deal } from '../../services/pipedrive/protocols/deal'
import MongoHelper from '../helpers/mongo-helper'

export class SaveOrderRepository {
  async saveOrder (deal: Deal): Promise<void> {
    const ordersCollection = await MongoHelper.getCollection('orders')

    const date = deal.dateWon.split(' ')[0]
    const order = await ordersCollection.findOne({ date })
    if (order) {
      const existDeal = order.deals.find(d => d.id === deal.id)
      if (existDeal) throw new Error('Deal com o código informado já inserido')

      order.value = parseFloat(order.value) + deal.value
      order.deals.push(deal)

      ordersCollection.updateOne({ _id: order.id }, { $set: order })
    } else {
      const newOrder = {
        valueTotal: deal.value,
        deals: [deal],
        date
      }
      ordersCollection.insertOne(newOrder)
    }
  }
}
