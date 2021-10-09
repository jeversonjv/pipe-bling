import axios from 'axios'
import { GetHttp } from '../http/protocols/get-http'

export class Get implements GetHttp {
  async get (url: string): Promise<any | any[]> {
    const result = await axios.get(url)
    return result.data
  }
}
