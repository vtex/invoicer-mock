import { InstanceOptions, IOContext, JanusClient } from "@vtex/api";

export default class Oms extends JanusClient {
  public constructor(context: IOContext, options?: InstanceOptions) {
    super(context, options);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getOrder(orderId: string): Promise<any> {
    return this.http.get(`/api/oms/pvt/orders/${orderId}`, {
      headers: {
        "Proxy-Authorization": this.context.authToken,
        VtexIdclientAutCookie: this.context.authToken,
        "X-Vtex-Use-Https": true
      },
      metric: "notification-get"
    });
  }
}
