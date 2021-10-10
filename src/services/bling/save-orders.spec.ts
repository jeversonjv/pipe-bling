import { SaveOrders } from './save-orders'
import { PostHttp } from '../../http/protocols/post-http'
import { Json2XmlHelper } from '../../utils/json-2-xml-helper'
import { Json2Xml } from '../../utils/protocols/json-2-xml'
import makeFakeDeal from '../../utils/make-fake-deal'

interface SutTypes {
  sut: SaveOrders
}

const makeJson2XmlHelper = (): Json2Xml => {
  return new Json2XmlHelper()
}

const makePostHttp = (): PostHttp => {
  class Post implements PostHttp {
    async post (url: string): Promise<any | any[]> {
      return await new Promise((resolve, reject) => resolve([]))
    }
  }

  return new Post()
}

const makeSut = (): SutTypes => {
  const post = makePostHttp()
  const json2xml = makeJson2XmlHelper()
  const sut = new SaveOrders('api_key', 'url', post, json2xml)
  return {
    sut
  }
}

describe('GetDeals Test', () => {
  test('Should throw if api service throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'callService').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.saveOrder(makeFakeDeal())
    await expect(promise).rejects.toThrow()
  })

  test("Should return 'idPedido' if api save order", async () => {
    const { sut } = makeSut()

    const resultMock = {
      pedidos: [{
        pedido: {
          idPedido: 'any'
        }
      }]
    }

    jest.spyOn(sut, 'callService').mockReturnValueOnce(new Promise((resolve, reject) => resolve(resultMock)))
    const result = await sut.saveOrder(makeFakeDeal())
    expect(result).toBeTruthy()
  })
})
