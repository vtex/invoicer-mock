import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'
import Invoice from '../resources/Invoice'

const INVOICE_NOTIFIER_BASE_URL = (accountName: string, workspace: string) => `http://${workspace}--${accountName}.myvtex.com/_v/invoice-notifier/`

export default class InvoiceNotifier extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(INVOICE_NOTIFIER_BASE_URL(context.account, context.workspace), context, options)
  }

  public async getNotification (orderId: string, notificationId: string): Promise<any> {
    return this.http.get(`${orderId}/${notificationId}`, {
      headers: {
        'VtexIdclientAutCookie': this.context.authToken,
        'X-Vtex-Use-Https': true,
      },
      metric: 'notification-get',
    })
  }

  public async postInvoice (orderId: string, invoice: Invoice): Promise<any> {
    return this.http.post(`${orderId}/invoice`, invoice, {
      headers: {
        'VtexIdclientAutCookie': this.context.authToken,
        'X-Vtex-Use-Https': true,
      },
      metric: 'notification-get',
    })
  }
}
