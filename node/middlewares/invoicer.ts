import Invoice from '../resources/Invoice'

export const invoicer = async (ctx: Context, next: () => Promise<any>) => {
  const {state: {notification, orderId}, clients: {invoiceNotifier: invoiceNotifierClient, oms: omsClient}} = ctx

  try {
    const order = await omsClient.getOrder(orderId)

    const mockInvoice = new Invoice(notification, order)
    try {
      await invoiceNotifierClient.postInvoice(orderId, mockInvoice)
      ctx.status = 200
      await next()
    } catch (err) {
      console.log(err)
      ctx.status = 406
      ctx.body = 'invoice funeu'
      await next()
    }
  } catch (err) {
    console.log(err)
    ctx.status = 406
    ctx.body = 'order funeu'
    await next()
  }
}
