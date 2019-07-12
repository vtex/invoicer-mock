class OrderItem {
  public id: string
  public price: string
  public sellingPrice: string

  constructor(params: any) {
    this.id = params.type
    this.price = params.type
    this.sellingPrice = params.type
  }
}

export default OrderItem
