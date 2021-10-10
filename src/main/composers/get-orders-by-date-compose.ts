import { GetOrdersByDate } from '../../presentation/controllers/get-orders-by-date'
import { GetOrdersByDateRepository } from '../../infra/repositories/get-orders-by-date-repository'

export const getOrdersByDateCompose = (): GetOrdersByDate => {
  const getOrdersByDateRepository = new GetOrdersByDateRepository()
  return new GetOrdersByDate(getOrdersByDateRepository)
}
