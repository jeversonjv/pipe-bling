import { GetHttp } from '../../Http/protocols/get-http'
import { GetDeals } from './get-deals'
import { Deal } from './protocols/deal'

interface SutTypes {
  sut: GetDeals
}

const makeGetHttp = (): GetHttp => {
  class Get implements GetHttp {
    async get (url: string): Promise<any | any[]> {
      return await new Promise((resolve, reject) => resolve([]))
    }
  }

  return new Get()
}

const makeSut = (): SutTypes => {
  const get = makeGetHttp()
  const sut = new GetDeals('api_key', 'url', get)
  return {
    sut
  }
}

describe('GetDeals Test', () => {
  test('Should return a empty array if throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'callService').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.getData()
    expect(result).toEqual([])
  })

  test('Should return a list of deals', async () => {
    const { sut } = makeSut()

    const dealReturnedService = {
      id: 1,
      value: 70,
      title: 'Any Deal',
      person_name: 'Any Person',
      won_time: 'Any Date',
      status: 'Any status'
    }

    const deal: Deal = {
      id: 1,
      title: 'Any Deal',
      value: 70,
      personName: 'Any Person',
      dateWon: 'Any Date',
      status: 'Any status'
    }

    jest.spyOn(sut, 'callService').mockResolvedValueOnce([dealReturnedService])

    const result = await sut.getData()
    expect(result).toEqual([deal])
  })
})
