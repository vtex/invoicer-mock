import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'
import Invoice from '../resources/Invoice'

export default class CallbackNotifier extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, options)
  }

  public async notify (callbackUrl: string, invoice: Invoice): Promise<any> {
    console.log('callbackUrl: ', callbackUrl)
    return this.http.post(callbackUrl, invoice, {
      headers: {
        'VtexIdclientAutCookie': this.context.authToken,
        'X-Vtex-Use-Https': true,
      },
      metric: 'callback-post',
    })
  }
}
