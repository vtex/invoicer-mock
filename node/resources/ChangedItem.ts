class ChangedItem {
  public id: string;
  public itemIndex: number;
  public price: number;
  public quantity: number;

  public constructor(params: {
    id: string;
    price: number;
    quantity: number;
    itemIndex: number;
  }) {
    this.id = params.id;
    this.price = params.price;
    this.itemIndex = params.itemIndex;
    this.quantity = params.quantity;
  }
}

export default ChangedItem;
