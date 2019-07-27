import { UserInputError } from "@vtex/api";
import * as parse from "co-body";

import { inspect } from "util";
import Notification from "../resources/Notification";
import Order from "../resources/Order";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function validate(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { invoiceNotifier: invoiceNotifierClient, oms: omsClient }
  } = ctx;

  let data;
  try {
    data = await parse.json(ctx.req);
  } catch (err) {
    console.error(err);
    throw new UserInputError(err);
  }

  const { orderId, notificationId, callbackUrl } = data;
  if (!orderId || !notificationId) {
    throw new UserInputError("Code is required");
  }

  ctx.state.callbackUrl = callbackUrl;

  try {
    const notificationData = await invoiceNotifierClient.getNotification(
      orderId,
      notificationId
    );
    const notification = new Notification(notificationData);

    if (!notification.isValid()) {
      throw new UserInputError("Notification is not valid");
    }
    ctx.state.notification = notification;

    const orderData = await omsClient.getOrder(orderId);
    const order = new Order(orderData);

    if (!order.isValid()) {
      throw new UserInputError("Order is not valid");
    }
    ctx.state.order = order;
    await next();
  } catch (err) {
    ctx.status =
      err.response && err.response.status ? err.response.status : 500;
    ctx.body =
      err.response && err.response.data
        ? err.response.data
        : JSON.stringify(inspect(err));
  }
}
