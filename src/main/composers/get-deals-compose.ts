import { GetDeals } from '../../services/pipedrive/get-deals'
import { Get } from '../adapters/get-http-axios'

export const getDealsCompose = (): GetDeals => {
  const getHttp = new Get()
  const getDeals = new GetDeals(
    process.env.PIPEDRIVE_APIKEY ?? '',
    process.env.PIPEDRIVE_URL ?? '',
    getHttp
  )

  return getDeals
}
