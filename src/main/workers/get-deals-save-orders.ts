import { getDealsCompose } from '../composers/get-deals-compose'
import { saveOrderCompose } from '../composers/save-order-compose'
import { SaveOrderRepository } from '../../infra/repositories/save-order-repository'

export const GetDealsSaveOrders = async (): Promise<void> => {
  const getDeals = getDealsCompose()
  const saveOrder = saveOrderCompose()
  const saveOrderRepository = new SaveOrderRepository()

  try {
    const deals = await getDeals.getData()
    if (deals.length > 0) {
      for (const deal of deals) {
        try {
          await saveOrder.saveOrder(deal)
        } catch (e) {
          console.log(e.message)
        }
        try {
          await saveOrderRepository.saveOrder(deal)
        } catch (e) {
          console.log(e.message, '-', deal.id)
        }
      }
    }
  } catch (e) {
    console.log(e.message)
  }
}
