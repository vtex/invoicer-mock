import OrderItem from './OrderItem'
import { ShippingData } from './ShippingData'

class Order {
  public orderId: string
  public items: OrderItem[]

  public shippingData: ShippingData

  public constructor(params: { orderId: string; items: OrderItem[]; shippingData: ShippingData }) {
    this.orderId = params.orderId
    this.items =
      params.items && params.items.length ? params.items.map(item => new OrderItem(item)) : []
    this.shippingData = params.shippingData
  }

  public isValid() {
    return this.items && this.orderId
  }
}

export default Order
