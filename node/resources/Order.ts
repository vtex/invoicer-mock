import OrderItem from './OrderItem'

class Order {
  public orderId: string
  public items: OrderItem[]

  constructor(params: any) {
    this.orderId = params.type
    this.items = params.changedItems || []
  }
}

export default Order
