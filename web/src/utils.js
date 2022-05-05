export const removeArrayElement = (arr, id) => {
  const found = arr.findIndex((elem) => elem.id == id);
  if (found > -1) {
    arr.splice(found, 1);

    // reassign indexes of all elements
    arr.forEach((elem, index) => {
      elem.id = index;
    });
  }
  return arr;
};

export const dateToday = () => new Date().toLocaleDateString("en-CA");

/**
 * @typedef {Object} ChangeEvent
 * @property {Object} target Contains the element name and changed values.
 * @property {string} target.name Element name passed in as name prop.
 * @property {Object} target.value Contains the input's current value.
 */
export const createChangeEvent = (name, value) => ({
  target: {
    name,
    value,
  },
});

export const createSelectOption = (label, value) => ({
  label,
  value,
});

/**
 * Creates an increasing number sequence between the inputs (both included).
 *
 * @param {Number} from First number in the sequence.
 * @param {Number} to Last number in the sequence.
 * @returns {Number[]} Array that contains the sequence.
 */
export const generateSequence = (from, to) =>
  Array(to - from + 1)
    .fill()
    .map((_, i) => from + i);
