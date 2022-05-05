import { Row, Col } from "framework7-react";
import { createChangeEvent } from "../utils";
import { AutoComplete } from "./auto_complete";

/** @typedef {import("./auto_complete.js").SelectOption} SelectOption */

/** @typedef {import("../utils.js").ChangeEvent} ChangeEvent */

/**
 * @typedef {Object} InvoiceItemChangeEventValue
 * @property {Object} item Unique item identifier.
 * @property {string} item.value
 * @property {boolean} item.created
 * @property {string} quantity Quantity of the item.
 * @property {string} price Item price.
 */

/**
 * InvoiceItem component turns invoice item props into an editable line item.
 *
 * @param {{
 *   name: string;
 *   items: SelectOption[];
 *   invoiceItem: {
 *     item: { value: string };
 *     quantity: number;
 *     price: number;
 *   };
 *   onChange: (changeEvent: {
 *     target: {
 *       name: string;
 *       value: InvoiceItemChangeEventValue;
 *     };
 *   }) => undefined;
 *   onDeleteItem: (id: number) => undefined;
 * }} props
 * @returns {JSX.Element} React element
 *
 * @callback onChange - Invoked with the updated item on change.
 * @param {ChangeEvent} changeEvent Object capturing item in its current state.
 * @param {InvoiceItemChangeEventValue} changeEvent.value
 *
 * @callback onDeleteItem - Invoked with item id on delete.
 * @param {number} id - Position of item provided in props.
 */
export const InvoiceItem = (props) => {
  const handleSelect = (e) => {
    const updatedItem = {
      value: e.target.value.value,
      created: e.target.value.created,
    };
    triggerChange(e.target.name, updatedItem);
  };

  const handleChange = (e) => triggerChange(e.target.name, e.target.value);

  const triggerChange = (name, value) => {
    const updatedValue = Object.assign({}, props.invoiceItem, { [name]: value });
    const changeEvent = createChangeEvent(props.name, updatedValue);
    props.onChange(changeEvent);
  };

  return (
    <Row>
      <Col width="40">
        <AutoComplete
          name="item"
          defaultValue={{ value: props.invoiceItem.item.value }}
          options={props.items}
          onChange={handleSelect}
        />
      </Col>
      <Col width="20">
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Quantity"
          defaultValue={props.invoiceItem.quantity}
          onChange={(e) => {
            e.stopPropagation();
            handleChange(e);
          }}
        />
      </Col>
      <Col width="20">
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          defaultValue={props.invoiceItem.price}
          onChange={(e) => {
            e.stopPropagation();
            handleChange(e);
          }}
        />
      </Col>
      <Col width="20">
        <a onClick={(e) => props.onDeleteItem(props.invoiceItem.id, e)}>Delete</a>
      </Col>
    </Row>
  );
};
