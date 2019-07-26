class ChangedItem {
  public id: string;
  public price: number;
  public quantity: number;

  public constructor(params: { id: string; price: number; quantity: number }) {
    this.id = params.id;
    this.price = params.price;
    this.quantity = params.quantity;
  }
}

export default ChangedItem;
