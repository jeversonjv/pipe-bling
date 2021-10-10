import { SaveOrders } from '../../services/bling/save-orders'
import { Post } from '../adapters/post-http-axios'
import { Json2XmlHelper } from '../../utils/json-2-xml-helper'

export const saveOrderCompose = (): SaveOrders => {
  const postHttp = new Post()
  const json2XmlHelper = new Json2XmlHelper()

  const saveOrders = new SaveOrders(
    process.env.BLING_APIKEY as string,
    process.env.BLING_URL as string,
    postHttp,
    json2XmlHelper
  )

  return saveOrders
}
