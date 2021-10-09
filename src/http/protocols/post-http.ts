export interface PostHttp {
  post: (url: string) => Promise<any | any[]>
}
