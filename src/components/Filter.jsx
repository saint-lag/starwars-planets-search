import React, { useContext, useState } from 'react';
import Select from 'react-select';
import AppContext from '../context/AppContext';

function Filter() {
  const {
    data,
    setFilteredData,
    setFilterByName,
    filterByName,
    setFilterByNumericValues,
    filterByNumericValues,
    currentNumericValues,
    setCurrentNumericValues,
    btnDisabled,
  } = useContext(AppContext);
  const [availableOptions, setAvailableOptions] = useState([
    { value: 'population', label: 'population' },
    { value: 'orbital_period', label: 'orbital_period' },
    { value: 'rotational_period', label: 'rotational_period' },
    { value: 'surface_water', label: 'surface_water' },
    { value: 'diameter', label: 'diameter' },
  ]);
  const numericValuesClickHandler = () => {
    setFilterByNumericValues([...filterByNumericValues, currentNumericValues]);
    const currentNumericFilter = currentNumericValues.column;
    const newState = availableOptions
      .filter((availableOption) => availableOption !== currentNumericFilter);
    setAvailableOptions(newState);

    // DEBUG:
    console.log(`availableOptions: ${availableOptions}; 
    currentNumericValues: 
    ${currentNumericValues.column}, 
    ${currentNumericValues.comparison}`);
  };
  const removeNumericFilterClickHandler = (option) => {
    setAvailableOptions([...availableOptions, option]);
    const newState = filterByNumericValues.filter((obj) => obj.column !== option);
    setFilterByNumericValues(newState);
  };
  const removeAllNumericFiltersClickHandler = () => {
    setFilterByNumericValues([]);
    setFilteredData(data);
  };
  return (
    <section>
      <h2>Search your Planet</h2>
      <input
        type="text"
        onChange={ ({ target }) => setFilterByName({
          ...filterByName,
          name: target.value,
        }) }
        data-testid="name-filter"
      />
      <form>
        <p>Column</p>
        <Select
          /* onChange={ ({ target }) => setCurrentNumericValues({
            ...currentNumericValues,
            column: target.value,
          }) } */
          data-testid="column-filter"
          options={ availableOptions }
          // defaultValue={ availableOptions[0] }
        />
        <label htmlFor="comparison-filter">
          Operator
          <select
            onChange={ ({ target }) => setCurrentNumericValues({
              ...currentNumericValues,
              comparison: target.value,
            }) }
            id="comparison-filter"
            data-testid="comparison-filter"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <input
          type="number"
          onChange={ ({ target }) => setCurrentNumericValues({
            ...currentNumericValues,
            value: target.value,
          }) }
          data-testid="value-filter"
        />
        <button
          onClick={ () => numericValuesClickHandler() }
          disabled={ btnDisabled([
            currentNumericValues.column,
            currentNumericValues.value,
            currentNumericValues.comparison,
          ]) }
          id="button-filter"
          type="button"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      <div className="numericValuesFilterContainer">
        {filterByNumericValues.length !== 0 && (
          <>
            {filterByNumericValues.map((obj, index) => (
              <div
                key={ index }
                className="numericValueFilterAndDeleteBtnContainer"
              >
                <span>{`${obj.column} ${obj.comparison} ${obj.value}`}</span>
                <button
                  onClick={ (event) => (
                    removeNumericFilterClickHandler(event.target.value)) }
                  className="removeNumericFilterBtn"
                  value={ obj.column }
                  type="button"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={ () => removeAllNumericFiltersClickHandler() }
            >
              REMOVE ALL
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default Filter;
