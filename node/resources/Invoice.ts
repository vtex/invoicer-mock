import ChangedItem from "./ChangedItem";
import Notification from "./Notification";
import Order from "./Order";

export const enum InvoiceType {
  Output = "Output",
  Input = "Input"
}

const EXTERNAL_PUBLIC_MOCK_INVOICE_URL =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
const COURIER = "COURIER";
const FIFTEEN_DIGITS = 1000000000000000;

class Invoice {
  public type: InvoiceType;
  public issuanceDate: string;
  public invoiceNumber: string;
  public invoiceKey: string;
  public invoiceValue: number;
  public invoiceUrl: string;
  public courier: string;
  public items: ChangedItem[];

  public constructor(notification: Notification, order: Order) {
    this.type = notification.type;
    this.issuanceDate = new Date().toDateString();
    this.invoiceNumber = Math.floor(Math.random() * FIFTEEN_DIGITS).toString();
    this.invoiceKey = Math.floor(Math.random() * FIFTEEN_DIGITS).toString();
    this.invoiceValue = this.getInvoiceValue(notification, order);
    this.invoiceUrl = EXTERNAL_PUBLIC_MOCK_INVOICE_URL;
    this.courier = COURIER;
    this.items = notification.items || [];
  }

  private getInvoiceValue(notification: Notification, order: Order) {
    const invoiceValueFromNotification = notification.items
      .map(item => {
        let orderItemFound;
        if (item.itemIndex) {
          orderItemFound = order.items[item.itemIndex];
        } else {
          orderItemFound = order.items.find(
            orderItem => orderItem.id === item.id
          );
        }

        if (orderItemFound) {
          const price = orderItemFound.sellingPrice || orderItemFound.price;
          return price * item.quantity;
        }
        return 0;
      })
      .reduce((total, itemPrice) => total + itemPrice, 0);

    const totalOrderValue = order.items
      .map(item => +item.sellingPrice * item.quantity)
      .reduce((total, itemPrice) => total + itemPrice, 0);

    const invoiceValue = invoiceValueFromNotification
      ? invoiceValueFromNotification
      : totalOrderValue;
    return invoiceValue;
  }
}

export default Invoice;
