import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'
import Invoice from '../resources/Invoice'

export default class CallbackNotifier extends ExternalClient {
  public constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, options)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async notify(callbackUrl: string, invoice: Invoice): Promise<any> {
    return this.http.post(callbackUrl, invoice, {
      headers: {
        VtexIdclientAutCookie: this.context.authToken,
        'X-Vtex-Use-Https': true,
      },
      metric: 'callback-post',
    })
  }
}
