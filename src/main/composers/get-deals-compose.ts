import { GetDeals } from '../../services/pipedrive/get-deals'
import { Get } from '../adapters/get-http-axios'

export const getDealsCompose = (): GetDeals => {
  const getHttp = new Get()
  const getDeals = new GetDeals(
    process.env.PIPEDRIVE_APIKEY as string,
    process.env.PIPEDRIVE_URL as string,
    getHttp
  )

  return getDeals
}
