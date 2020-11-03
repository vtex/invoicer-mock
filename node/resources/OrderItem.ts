class OrderItem {
  public id: string
  public price: number
  public quantity: number
  public itemIndex: number
  public sellingPrice: number

  public constructor(params: {
    id: string
    price: number
    quantity: number
    itemIndex: number
    sellingPrice: number
  }) {
    this.id = params.id
    this.price = params.price
    this.itemIndex = params.itemIndex
    this.quantity = params.quantity
    this.sellingPrice = params.sellingPrice
  }
}

export default OrderItem
