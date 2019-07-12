import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

const ORDER_BASE_URL = (accountName: string, workspace: string) => `http://${workspace}--${accountName}.myvtex.com/api/oms`
export default class Oms extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(ORDER_BASE_URL(context.account, context.workspace), context, options)
  }

  public async getOrder (orderId: string): Promise<any> {
    return this.http.get(`/pvt/orders/${orderId}`, {
      headers: {
        'Proxy-Authorization': this.context.authToken,
        'VtexIdclientAutCookie': this.context.authToken,
        'X-Vtex-Use-Https': true,
      },
      metric: 'notification-get',
    })
  }
}
