import { GetDealsSaveOrders } from './get-deals-save-orders'
import schedule from 'node-schedule'

let isWorking = false

export const setupWorker = (): void => {
  schedule.scheduleJob('*/30 * * * * *', () => {
    if (!isWorking) {
      console.log('executando worker...')

      isWorking = true

      GetDealsSaveOrders()
        .finally(() => { isWorking = false })
    }
  })
}
