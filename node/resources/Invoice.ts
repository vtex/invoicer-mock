import ChangedItem from './ChangedItem'
import Notification from './Notification'
import Order from './Order'
import { Volume } from './Volume'

export const enum InvoiceType {
  Output = 'Output',
  Input = 'Input',
}

// const EXTERNAL_PUBLIC_MOCK_INVOICE_URL =
//   "https://instore.vteximg.com.br/assets/vtex.instore/files/danfe___b8ffe2564f8298ee884dbea7b12a55a2.pdf";
const EXTERNAL_PUBLIC_MOCK_INVOICE_URL =
  'https://instore.vtexassets.com/assets/vtex.instore/files/nota-maino___285e171cf6255df0b224d2809e8aae7e.png'
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
  public volumes?: Volume[]
  public printableObservation?: string

  public constructor(notification: Notification, order: Order) {
    this.type = notification.type
    this.issuanceDate = new Date().toDateString()
    this.invoiceNumber = Math.floor(Math.random() * 100000000000).toString()
    this.invoiceKey = Math.floor(Math.random() * 100000000000).toString()
    const invoiceValueFromNotification = notification.items
      .map(item => {
        const orderItemFound = order.items.find(orderItem => orderItem.id === item.id)
        if (orderItemFound) {
          const price = orderItemFound.sellingPrice || orderItemFound.price
          return +price * item.quantity
        }
        return 0
      })
      .reduce((total, itemPrice) => total + itemPrice, 0)
    const totalOrderValue = order.items
      .map(item => +item.sellingPrice * item.quantity)
      .reduce((total, itemPrice) => total + itemPrice, 0)
    this.invoiceValue = invoiceValueFromNotification
      ? invoiceValueFromNotification
      : totalOrderValue
    const freightValue =
      order.shippingData.logisticsInfo && order.shippingData.logisticsInfo.length > 0
        ? order.shippingData.logisticsInfo[0].sellingPrice
        : 0
    this.invoiceValue += freightValue
    this.invoiceUrl = EXTERNAL_PUBLIC_MOCK_INVOICE_URL
    this.courier = COURIER
    this.items = notification.items || []
    this.volumes = notification.volumes || [{ index: 0 }]
    this.printableObservation = notification.printableObservation || ''
  }
}

export default Invoice
