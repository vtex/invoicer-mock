import { IOClients } from '@vtex/api'

import InvoiceNotifier from './invoiceNotifier'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get invoiceNotifier() {
    return this.getOrSet('invoiceNotifier', InvoiceNotifier)
  }
}
