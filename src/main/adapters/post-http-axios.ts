import axios from 'axios'
import { PostHttp } from '../../http/protocols/post-http'

export class Post implements PostHttp {
  async post (url: string): Promise<any | any[]> {
    const result = await axios.post(url)
    return result.data
  }
}
