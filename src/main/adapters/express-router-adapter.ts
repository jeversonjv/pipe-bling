export class ExpressRouterAdapter {
  static adapt (router: any) {
    return async (req: any, res: any) => {
      const httpRequest = {
        body: req.body,
        query: req.query
      }
      const httpResponse = await router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
