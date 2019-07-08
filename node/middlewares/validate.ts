import { UserInputError } from '@vtex/api'
import * as parse from 'co-body'

import Notification from '../resources/Notification'

export const validate = async (ctx: Context, next: () => Promise<any>) => {
  const {clients: {invoiceNotifier: invoiceNotifierClient}} = ctx

  let data
  try {
    data = await parse.json(ctx.req)
  } catch (err) {
    console.error(err)
  }

  const { orderId, notificationId } = data
  if (!orderId || !notificationId) {
    throw new UserInputError('Code is required')
  }

  const notificationData = await invoiceNotifierClient.getNotification(orderId, notificationId)
  const notification = new Notification(notificationData)

  if(!notification.isValid()){
    throw new UserInputError('Notification is not valid')
  }

  ctx.state.notification = notification
  ctx.state.orderId = orderId

  await next()
}
