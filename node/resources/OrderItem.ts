class OrderItem {
  public id: string
  public price: string
  public quantity: number
  public sellingPrice: string

  constructor(params: any) {
    this.id = params.id
    this.price = params.price
    this.quantity = params.quantity
    this.sellingPrice = params.sellingPrice
  }
}

export default OrderItem
