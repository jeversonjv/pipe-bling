import { getOrdersByDateRoutes } from './get-orders-by-date'

export const setupRoutes = (router): void => {
  getOrdersByDateRoutes(router)
}
