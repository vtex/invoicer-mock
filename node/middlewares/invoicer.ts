import { inspect } from 'util'
import Invoice from '../resources/Invoice'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function invoicer(ctx: Context, next: () => Promise<any>) {
  const {
    state: { notification, order, callbackUrl },
    clients: { callbackNotifier: callbackNotifierClient },
  } = ctx
  try {
    const mockInvoice = new Invoice(notification, order)
    if (callbackUrl) {
      await callbackNotifierClient.notify(callbackUrl, mockInvoice)
    }
    ctx.body = mockInvoice
    ctx.status = 200
  } catch (err) {
    ctx.status = err.response && err.response.status ? err.response.status : 500
    ctx.body = err.response && err.response.data ? err.response.data : JSON.stringify(inspect(err))
    await next()
  }
}
