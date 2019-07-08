import ChangedItem from './ChangedItem'
import Notification from './Notification'


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

  constructor(notification: Notification) {
    this.type = notification.type
    this.issuanceDate = new Date().toDateString()
    this.invoiceNumber = Math.floor(Math.random() * 100000).toString()
    this.invoiceKey = Math.floor(Math.random() * 100000).toString()
    this.invoiceValue = notification.changedItems.reduce((total, next) => total + next.price * next.quantity, 0)
    this.invoiceUrl = EXTERNAL_PUBLIC_MOCK_INVOICE_URL
    this.courier = COURIER
    this.items = notification.changedItems || []
  }
}

export default Invoice
