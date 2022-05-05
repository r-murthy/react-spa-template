import { Component } from "react";
import { Block, Page } from "framework7-react";
import { upsertInvoice, getInvoice } from "../../services/invoiceapi";
import { getCustomers, upsertCustomer } from "../../services/custapi";
import { getItems, upsertItem } from "../../services/itemapi";
import { dateToday, createSelectOption } from "../../utils.js";
import { Form } from "../../components/form_component";
import { AutoComplete } from "../../components/auto_complete";
import { InvoiceItems } from "./invoice_items";
import { SUCCESSUPDATE } from "../../constants";

export class InvoicePage extends Component {
  constructor(props) {
    super(props);

    this.invoiceId = this.props.f7route.params.invoiceId;

    this.state = {};

    if (!this.invoiceId) {
      const invoice = {};
      invoice.date = dateToday();
      invoice.customer = "";
      invoice.invoiceItems = [
        {
          id: 0,
          item: { value: "" },
          itemName: "",
          price: "",
          quantity: "",
        },
      ];
      this.state = { invoice };
    }
  }

  async componentDidMount() {
    try {
      const [items, customers, invoice] = await this.props.task(
        Promise.all([
          this.fetchItems(),
          this.fetchCustomers(),
          this.invoiceId ? this.fetchInvoice(this.invoiceId) : {},
        ])
      );

      this.setState({
        customers,
        items,
        ...(this.invoiceId && { invoice }),
      });
    } catch { }
  }

  async fetchCustomers() {
    const res = await getCustomers();
    return res.customers.map((c) => createSelectOption(c.name, c.customerid));
  }

  async fetchItems() {
    const res = await getItems();
    return res.items.map((it) => createSelectOption(it.name, it.itemid));
  }

  async fetchInvoice(invoiceId) {
    const res = await getInvoice(invoiceId);
    return this.convertToInvoiceState(res);
  }

  convertToInvoiceState = (res) => {
    let invoiceItems = [];
    if (res.items) {
      invoiceItems = res.items.map((item, index) => ({
        id: index,
        item: { value: item.itemid },
        itemName: item.itemname,
        quantity: item.quantity,
        price: item.price,
      }));
    }

    const invoice = {
      date: res.date,
      customer: res.customerid,
      invoiceItems,
    };
    return invoice;
  };

  handleSubmit = async (invoice) => {
    try {
      let customer;
      let customers = this.state.customers;
      if (invoice.customer.created) {
        const newCustomer = await this.createCustomer(invoice.customer.value);
        customer = newCustomer.value;
        customers = customers.concat(newCustomer);
      } else {
        customer = invoice.customer.value;
      }

      let invoiceItems;
      let items = this.state.items;
      invoiceItems = await Promise.all(
        invoice.invoiceItems
          .filter((invoiceItem) => invoiceItem.item.value != "")
          .map(async (invoiceItem) => {
            if (invoiceItem.item.created) {
              const newItem = await this.createItem(invoiceItem.item.value);
              invoiceItem.itemId = newItem.value;
              items = items.concat(newItem);
            } else {
              invoiceItem.itemId = invoiceItem.item.value;
            }
            return invoiceItem;
          })
      );

      const response = await this.props.task(
        upsertInvoice(this.invoiceId, invoice.date, customer, invoiceItems)
      );

      this.props.renderAppElements({ notification: SUCCESSUPDATE });
      this.invoiceId = response.invoiceid;
      history.replaceState({}, "", `/invoices/${this.invoiceId}`);
      invoice = this.convertToInvoiceState(response);
      this.setState({
        customers,
        items,
        invoice,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  };

  createCustomer = async (customerName) => {
    const response = await this.props.task(
      upsertCustomer(undefined, customerName)
    );
    const newCustomer = {
      value: response.customerid,
      label: customerName,
    };
    return newCustomer;
  };

  createItem = async (itemName) => {
    const response = await this.props.task(upsertItem(undefined, itemName));
    const newItem = {
      value: response.itemid,
      label: itemName,
    };
    return newItem;
  };

  render() {
    return (
      <Page>
        <Block strong>
          {this.state.invoice && this.state.customers && this.state.items && (
            <Form onSubmit={this.handleSubmit}>
              <label>Date</label>
              <input
                type="date"
                name="date"
                placeholder="Select date..."
                defaultValue={this.state.invoice.date}
                required
              />
              <br />
              <div>
                <label>Customer Name</label>
                <AutoComplete
                  customInput
                  name="customer"
                  defaultValue={{ value: this.state.invoice.customer }}
                  options={this.state.customers}
                />
              </div>
              <br />
              <InvoiceItems
                customInput
                name="invoiceItems"
                defaultValue={this.state.invoice.invoiceItems}
                items={this.state.items}
              />
              <br />
            </Form>
          )}
        </Block>
      </Page>
    );
  }
}
