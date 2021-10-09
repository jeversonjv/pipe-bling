export interface GetHttp {
  get: (url: string) => Promise<any | any[]>
}
