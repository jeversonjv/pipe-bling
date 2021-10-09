import { GetHttp } from '../../Http/protocols/get-http'
import { Deal } from './protocols/deal'

export class GetDeals {
  private readonly apiKey: string
  private readonly url: string
  private readonly getHttp: GetHttp

  constructor (apiKey: string, url: string, getHttp: GetHttp) {
    this.apiKey = apiKey
    this.url = url
    this.getHttp = getHttp
  }

  async callService (): Promise<any | any[]> {
    const urlApi = `${this.url}/api/v1/deals?status=won&api_token=${this.apiKey}`
    return await this.getHttp.get(urlApi)
  }

  async getData (): Promise<Deal[]> {
    try {
      const deals = await this.callService()
      const result = deals.map((deal) => {
        return {
          id: deal.id,
          title: deal.title,
          value: deal.value,
          personName: deal.person_name,
          dateWon: deal.won_time,
          status: deal.status
        }
      })
      return result
    } catch (e) {
      return []
    }
  }
}
