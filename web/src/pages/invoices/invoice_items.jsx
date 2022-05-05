import { Component } from "react";
import { Button, Row, Col } from "framework7-react";
import { InvoiceItem } from "../../components/invoice_item";
import { removeArrayElement } from "../../utils.js";
import { createChangeEvent } from "../../utils.js";

/**
 * @typedef {Object} InvoiceItem
 * @property {number} id Position in the list of items
 * @property {Object} item Unique item identifier.
 * @property {string} item.value
 * @property {string} quantity Quantity of the item.
 * @property {string} price Item price.
 */

/** @typedef {import("../../components/auto_complete.js").SelectOption} SelectOption */

/**
 * InvoiceItems turns its defaultValue prop into elements for editable line items.
 *
 * @typedef {Object} InvoiceItems
 * @property {Object} props - React component props.
 * @property {string} props.name - Input name.
 * @property {InvoiceItem[]} props.defaultValue - Line items to display on page load.
 * @property {SelectOption[]} props.items - Item selection options.
 */
export class InvoiceItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoiceItems: this.props.defaultValue,
    };
  }

  onItemChange = (e) => {
    const updatedItem = e.target.value;
    const updatedItems = this.state.invoiceItems.map((elem) =>
      elem.id === updatedItem.id ? updatedItem : elem
    );
    this.setState({ invoiceItems: updatedItems });
    const changeEvent = createChangeEvent(this.props.name, updatedItems);
    this.props.onChange(changeEvent);
  };

  onAddItem = () => {
    const newItem = {
      id: this.state.invoiceItems.length,
      item: { value: "" },
      itemName: "",
      price: "",
      quantity: "",
    };
    const updatedItems = [...this.state.invoiceItems, newItem];
    this.setState({ invoiceItems: updatedItems });
    const changeEvent = createChangeEvent(this.props.name, updatedItems);
    this.props.onChange(changeEvent);
  };

  onDeleteItem = (id) => {
    const updatedItems = removeArrayElement(this.state.invoiceItems, id);
    this.setState({ invoiceItems: updatedItems });
    const changeEvent = createChangeEvent(this.props.name, updatedItems);
    this.props.onChange(changeEvent);
  };

  render() {
    return (
      <div>
        <Row>
          <Col width="40">Item Name</Col>
          <Col width="20">Quantity</Col>
          <Col width="20">Price</Col>
          <Col width="20"></Col>
        </Row>
        {this.state.invoiceItems.map((invoiceItem, index) => (
          <InvoiceItem
            key={index}
            name="invoiceItem"
            items={this.props.items}
            invoiceItem={invoiceItem}
            onChange={this.onItemChange}
            onDeleteItem={this.onDeleteItem}
          />
        ))}
        <Button
          onClick={(e) => {
            e.preventDefault();
            this.onAddItem();
          }}
        >
          Add new item
        </Button>
      </div>
    );
  }
}
