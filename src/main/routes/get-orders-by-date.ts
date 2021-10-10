import { getOrdersByDateCompose } from '../composers/get-orders-by-date-compose'
import { ExpressRouterAdapter } from '../adapters/express-router-adapter'

export const getOrdersByDateRoutes = (router): void => {
  const getOrdersByDate = getOrdersByDateCompose()
  router.get('/orders', ExpressRouterAdapter.adapt(getOrdersByDate))
}
