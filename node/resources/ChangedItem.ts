class ChangedItem {
  public id: number
  public price: number
  public quantity: number

  constructor(params: any) {
    this.id = params.id
    this.price = params.price
    this.quantity = params.quantity
  }
}

export default ChangedItem
