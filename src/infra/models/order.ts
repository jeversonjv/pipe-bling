import { Deal } from '../../services/pipedrive/protocols/deal'

export interface Order {
  date: string
  valueTotal: number
  deals: Deal[]
}
