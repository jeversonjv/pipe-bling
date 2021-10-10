import { Deal } from '../services/pipedrive/protocols/deal'

const makeFakeDeal = (): Deal => {
  const deal = {
    id: 1,
    title: 'Any Deal',
    value: 70,
    personName: 'Any Person',
    dateWon: '2021-10-09 12:00:00',
    status: 'Any status'
  }
  return deal
}

export default makeFakeDeal
