import OrderItem from "./OrderItem";

class Order {
  public orderId: string;
  public items: OrderItem[];

  public constructor(params: { orderId: string; items: OrderItem[] }) {
    this.orderId = params.orderId;
    this.items =
      params.items && params.items.length
        ? params.items.map(item => new OrderItem(item))
        : [];
  }

  public isValid() {
    return this.items && this.orderId;
  }
}

export default Order;
