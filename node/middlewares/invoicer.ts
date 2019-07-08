import Invoice from '../resources/Invoice'

export const invoicer = async (ctx: Context, next: () => Promise<any>) => {
  const {state: {notification, orderId}, clients: {invoiceNotifier: invoiceNotifierClient}} = ctx

  const mockInvoice = new Invoice(notification)

  await invoiceNotifierClient.postInvoice(orderId, mockInvoice)

  ctx.status = 200
  await next()
}
