import { Component, useEffect, useState, useRef } from "react";
import { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { createChangeEvent } from "../utils";
import { fuzzySearch } from "../services/fuzzy_search";
import "../../css/auto_complete.css";

const CREATEOPTION = "create-option";

/** @typedef {import("../utils.js").ChangeEvent} ChangeEvent */

/**
 * @typedef {Object} SelectOption
 * @property {string} label Text to display for each option provided by
 *   underlying select input.
 * @property {string} value Corresponds to the data represented by the option.
 */

/**
 * @typedef {Object} AutoCompleteChangeEventValue
 * @property {string} value Value represented by the selected option (either of
 *   SelectOption.value in case of selection event or user input value in case
 *   of created event).
 * @property {boolean} created Indicates if the value is selected from existing
 *   options or newly created.
 */

/**
 * AutoComplete component provides selection from a list of options and creation
 * of new ones on the fly.
 *
 * @param {{
 *   name: string;
 *   defaultValue: { value: string };
 *   options: SelectOption[];
 *   onChange: (changeEvent: {
 *     target: {
 *       name: string;
 *       value: AutoCompleteChangeEventValue;
 *     };
 *   }) => undefined;
 * }} props
 * @returns {JSX.Element} React element.
 *
 * @callback onChange Triggered by onChange event in the underlying select input.
 * @param {ChangeEvent} changeEvent Object capturing the input's currently
 *   selected or created value.
 * @param {AutoCompleteChangeEventValue} changeEvent.value
 */
export const AutoComplete = (props) => {
  const [selectedValue, setSelectedValue] = useState(undefined);
  const searchFields = ["label"];

  useEffect(() => {
    const selectedItem = props.options.find(
      (option) => option.value == props.defaultValue.value
    );
    setSelectedValue(selectedItem);
  }, [props.options, props.defaultValue.value]);

  const handleChange = (selectedItem, actionType) => {
    props.onChange(
      createChangeEvent(props.name, {
        value: selectedItem.value,
        created: actionType.action == CREATEOPTION,
      })
    );

    setSelectedValue(selectedItem);
  };

  const filterOption = (option, input) => {
    const filteredOptions = fuzzySearch(props.options, searchFields, input);
    return (
      filteredOptions.some((opt) => opt.item.value == option.value) ||
      option.data.__isNew__
    );
  };

  class HighlightedOption extends Component {
    renderOption = (input, optionLabel) => {
      const filteredOptions = fuzzySearch(props.options, searchFields, input);
      const optionMatches = filteredOptions.find(
        (opt) => opt.item.label == optionLabel
      );

      if (!optionMatches) {
        return optionLabel;
      }

      return <div>{this.highlight(optionLabel, optionMatches.matches)}</div>;
    };

    highlight = (text, highlightIndices) =>
      [...text].map((char, charIndex) => (
        <span
          key={charIndex}
          className={
            highlightIndices.some((index) => index == charIndex)
              ? "option-highlight"
              : ""
          }
        >
          {char}
        </span>
      ));

    render() {
      const inputValue = this.props.selectProps.inputValue;
      const optionLabel = this.props.data.label;
      return (
        <components.Option {...this.props}>
          {this.renderOption(inputValue, optionLabel)}
        </components.Option>
      );
    }
  }

  return (
    <CreatableSelect
      options={props.options}
      value={selectedValue}
      onChange={handleChange}
      filterOption={filterOption}
      components={{ Option: HighlightedOption }}
    />
  );
};
