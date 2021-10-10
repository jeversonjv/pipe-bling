import { Json2Xml } from '../../utils/protocols/json-2-xml'
import { PostHttp } from '../../http/protocols/post-http'
import { Deal } from '../pipedrive/protocols/deal'

export class SaveOrders {
  private readonly apiKey: string
  private readonly url: string
  private readonly postHttp: PostHttp
  private readonly json2Xml: Json2Xml

  constructor (
    apiKey: string,
    url: string,
    postHttp: PostHttp,
    json2Xml: Json2Xml
  ) {
    this.apiKey = apiKey
    this.url = url
    this.postHttp = postHttp
    this.json2Xml = json2Xml
  }

  async callService (deal: Deal): Promise<any> {
    const encodedUri = encodeURI(
      `${this.url}/pedido/json/?xml=${this.getStructXml(deal)}&apikey=${this.apiKey}`
    )
    const result = await this.postHttp.post(encodedUri)

    if (result.retorno?.erro) throw new Error(result.retorno.erro)

    return result
  }

  async saveOrder (deal: Deal): Promise<number> {
    const result = await this.callService(deal)
    return result.pedidos ? result.pedidos[0].pedido.idPedido : null
  }

  private getStructXml (deal: Deal): string {
    const struct = {
      pedido: {
        cliente: {
          nome: deal.personName
        },
        itens: [{
          item: {
            codigo: deal.id,
            descricao: deal.title,
            vlr_unit: deal.value
          }
        }]
      }
    }
    return this.json2Xml.transform(struct)
  }
}
