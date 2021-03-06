import { IOClients } from '@vtex/api'

import CallbackNotifier from './callbackNotifier'
import InvoiceNotifier from './invoiceNotifier'
import Oms from './oms'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get invoiceNotifier() {
    return this.getOrSet('invoiceNotifier', InvoiceNotifier)
  }

  public get oms() {
    return this.getOrSet('oms', Oms)
  }

  public get callbackNotifier() {
    return this.getOrSet('callbackNotifier', CallbackNotifier)
  }
}
