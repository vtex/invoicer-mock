import ChangedItem from './ChangedItem'
import Notification from './Notification'
import Order from './Order'


export const enum InvoiceType {
  Output = 'Output',
  Input = 'Input',
}

const EXTERNAL_PUBLIC_MOCK_INVOICE_URL = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
const COURIER = 'COURIER'

class Invoice {
  public type: InvoiceType
  public issuanceDate: string
  public invoiceNumber: string
  public invoiceKey: string
  public invoiceValue: number
  public invoiceUrl: string
  public courier: string
  public items: ChangedItem[]

  constructor(notification: Notification, order: Order) {
    this.type = notification.type
    this.issuanceDate = new Date().toDateString()
    this.invoiceNumber = Math.floor(Math.random() * 100000).toString()
    this.invoiceKey = Math.floor(Math.random() * 100000).toString()
    this.invoiceValue = notification.items.map(item => {
      const orderItemFound = order.items.find(orderItem => orderItem.id === item.id)
      if(orderItemFound) {
        const price = orderItemFound.sellingPrice || orderItemFound.price
        return +price * item.quantity
      }
      return 0
    }
    ).reduce((total, itemPrice) => total + itemPrice, 0)
    this.invoiceUrl = EXTERNAL_PUBLIC_MOCK_INVOICE_URL
    this.courier = COURIER
    this.items = notification.items || []
  }
}

export default Invoice
