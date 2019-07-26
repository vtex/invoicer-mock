import uuid from "uuid/v1";
import ChangedItem from "./ChangedItem";
import { InvoiceType } from "./Invoice";

class Notification {
  public id: string;
  public items: ChangedItem[];
  public changedItems: ChangedItem[];
  public observation: string;
  public timestamp: string;
  public type: InvoiceType;

  public constructor(params: {
    id: string;
    items: ChangedItem[];
    changedItems: ChangedItem[];
    observation: string;
    timestamp: string;
    type: InvoiceType;
  }) {
    this.id = params.id || uuid();
    this.type = params.type || InvoiceType.Output;
    this.changedItems =
      params.changedItems && params.changedItems.length > 0
        ? params.changedItems.map(changedItem => new ChangedItem(changedItem))
        : [];
    this.items =
      params.items && params.items.length > 0
        ? params.items.map(changedItem => new ChangedItem(changedItem))
        : [];

    this.observation = params.observation || "";
    this.timestamp = new Date().toISOString();
  }

  public isValid() {
    return true;
  }
}

export default Notification;
