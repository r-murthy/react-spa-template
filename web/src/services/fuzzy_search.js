import Fuse from "fuse.js";
import { generateSequence } from "../utils";

/**
 * @typedef {Object} FuzzySearchResult
 * @property {Object} item The matching item.
 * @property {string} item.label
 * @property {string} item.value
 * @property {number[]} matches Indices of matching characters.
 */

/**
 * FuzzySearch finds items in list approximately matching search string.
 *
 * @param {Object[]} items List of items in which to search.
 * @param {string[]} searchFields Names of fields to search in.
 * @param {string} searchText Empty search text matches all items.
 * @returns {FuzzySearchResult[]} List of search results.
 */
export const fuzzySearch = (items, searchFields, searchText) => {
  if (!searchText) {
    return items.map((item) => ({
      item: item,
      matches: [],
    }));
  }

  const options = { keys: searchFields, includeMatches: true };
  const fuse = new Fuse(items, options);
  const results = fuse.search(searchText);
  results.forEach((res) => {
    res.matches = matchingCharacters(res);
  });
  return results;
};

const matchingCharacters = (searchResult) =>
  searchResult.matches.flatMap((match) =>
    match.indices.flatMap((indices) => generateSequence(indices[0], indices[1]))
  );
