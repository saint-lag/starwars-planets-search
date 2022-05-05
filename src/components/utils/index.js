/* const numericValuesClickHandler = () => {
  setFilterByNumericValues([...filterByNumericValues, currentNumericValues]);
  const currentNumericFilter = currentNumericValues.column;
  const newState = availableOptions.filter(
    (availableOption) => availableOption !== currentNumericFilter,
  );
  setAvailableOptions(newState);
  setCurrentNumericValues({
    column: newState[0] ? newState[0] : '',
    comparison: 'maior que',
    value: 0,
  });
};
const removeNumericFilterClickHandler = (option) => {
  const newState = filterByNumericValues.filter((obj) => obj.column !== option);
  setFilteredData(data);
  setFilterByNumericValues(newState);
  setAvailableOptions([...availableOptions, option]);
};
const removeAllNumericFiltersClickHandler = () => {
  setFilterByNumericValues([]);
  setFilteredData(data);
  setAvailableOptions(AVAILABLE_OPTIONS_ARRAY);
}; */

// React-select:
// const [availableOptions, setAvailableOptions] = useState(AVAILABLE_OPTIONS);

const numericValuesClickHandler = () => {
  setFilterByNumericValues([...filterByNumericValues, currentNumericValues]);
  const currentNumericFilter = currentNumericValues.column;
  const newState = availableOptions
    .filter((availableOption) => availableOption.value !== currentNumericFilter);
  setAvailableOptions(newState);
};
const removeNumericFilterClickHandler = (option) => {
  const newState = filterByNumericValues.filter((obj) => obj.column !== option);
  setFilteredData(data);
  setFilterByNumericValues(newState);
  setAvailableOptions([...availableOptions, { value: option, label: option }]);
};
const removeAllNumericFiltersClickHandler = () => {
  setFilterByNumericValues([]);
  setFilteredData(data);
  setAvailableOptions(AVAILABLE_OPTIONS);
};

export default {
  numericValuesClickHandler,
  removeNumericFilterClickHandler,
  removeAllNumericFiltersClickHandler,
};
