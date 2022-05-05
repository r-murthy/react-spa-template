import { cloneElement, useEffect, useRef, useState } from "react";
import { Button, Row, Col } from "framework7-react";
import { deepForEach, deepMap } from "react-children-utilities";
import { CUSTOMINPUT } from "../constants";

const DEFAULTVALUE = "defaultValue";
const BACKBUTTON = "Back";
const DISCARDBUTTON = "Discard";

const collectInputValues = (elements) => {
  const inputs = [];
  deepForEach(elements, (elem) => {
    if (elem.props && elem.props.name && DEFAULTVALUE in elem.props) {
      inputs.push(elem);
    }
  });
  return inputs.reduce(
    (prev, curr) =>
      Object.assign({}, prev, { [curr.props.name]: curr.props.defaultValue }),
    {}
  );
};

/**
 * @typedef {HTMLInputElement | HTMLElement} FormInput
 * @property {string} name Input name attribute to which form values are mapped.
 * @property {Object | string | number | boolean} defaultValue Initial value of the input.
 * @property {boolean} [customInput] Indicates a custom input.
 */

/**
 * An object that provides name-value pairs capturing form values to be saved.
 * Name property here refers to the name attribute of an input. Value is the
 * input's value at the time of submit.
 *
 * There are no explicit name and value properties, only key-value pairs with
 * input name mapping to its value. For example, if form contains two text
 * inputs called "foo" and "bar" with values "baz" and "qux", the resulting
 * object that is provided to handleSubmit callback would be as follows.
 *
 * ```{
 *   "foo": "bar",
 *   "baz": "qux",
 * }```
 * ```
 *
 * @typedef {Object} FormValues
 * @property {string} name Name of the input.
 * @property {Object | string | number | boolean} value Input value at the time
 * of form submit.
 */

/**
 * Form component provides generic form input capability along with save and
 * discard features. Client pages can avail the functionality by providing
 * inputs as child elements of the component.
 *
 * Inputs must be provided an initial value using the defaultValue attribute.
 * Form collects defaultValue of child inputs once, on first render.
 * Default values are used to detect change. On change, save and discard buttons are enabled.
 *
 * Form returns input values to clients on submit. Clients need not manage input
 * values using state effectively leaving them "uncontrolled".
 *
 * The name attribute must be set on all inputs. Form values are returned as
 * key-value mappings with names as keys on submit.
 *
 * Custom inputs need to be tagged "customInput".
 *
 * @param {{
 *   children: FormInput[];
 *   handleSubmit: (formValues: Object) => undefined;
 * }} props
 *   Props to the react component.
 * @returns {JSX.Element} React element used to render the component.
 *
 * @callback handleSubmit Triggered by submit action in the underlying form element.
 * @param {Object} formValues A collection of all the child inputs and their values.
 */
export const Form = (props) => {
  const [formValues, setFormValues] = useState({});
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    const inputValues = collectInputValues(props.children);
    setDefaultValues(inputValues);
    setFormValues(inputValues);
  }, []);

  const handleChange = (e) =>
    setFormValues(
      Object.assign({}, formValues, { [e.target.name]: e.target.value })
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await props.onSubmit(formValues);
      setDefaultValues(formValues);
    } catch {}
  };

  const navigateBack = () => window.history.back();

  const isFormDirty = () => formValues != defaultValues;

  const renderInputs = (elements) =>
    deepMap(elements, (elem) =>
      isCustomInput(elem) && elem.props.name in formValues
        ? cloneElement(elem, { onChange: handleChange })
        : elem
    );

  const isCustomInput = (element) =>
    element.props && element.props.hasOwnProperty(CUSTOMINPUT);

  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
      {renderInputs(props.children)}
      <Row>
        <Col>
          <Button fill type="submit" disabled={!isFormDirty()}>
            Save
          </Button>
        </Col>
        <Col>
          <Button fill onClick={navigateBack}>
            {isFormDirty() ? DISCARDBUTTON : BACKBUTTON}
          </Button>
        </Col>
      </Row>
    </form>
  );
};
