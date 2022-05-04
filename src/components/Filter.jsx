import React, { useContext, useState } from 'react';
import Select from 'react-select';
import AppContext from '../context/AppContext';
import { AVAILABLE_OPTIONS } from '../data';

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
    setColumnSort,
  } = useContext(AppContext);
  const [availableOptions, setAvailableOptions] = useState(AVAILABLE_OPTIONS);
  const [currentColumnSort, setCurrentColumnSort] = useState({
    order: { column: 'population', sort: 'ASC' } });

  const numericValuesClickHandler = () => {
    setFilterByNumericValues([...filterByNumericValues, currentNumericValues]);
    const currentNumericFilter = currentNumericValues.column;
    const newState = availableOptions
      .filter((availableOption) => availableOption.value !== currentNumericFilter);
    setAvailableOptions(newState);
  };
  const removeNumericFilterClickHandler = (option) => {
    const newState = filterByNumericValues.filter((obj) => obj.column !== option);
    setFilterByNumericValues(newState);
    setAvailableOptions([...availableOptions, { value: option, label: option }]);
  };
  const removeAllNumericFiltersClickHandler = () => {
    setFilterByNumericValues([]);
    setFilteredData(data);
    setAvailableOptions(AVAILABLE_OPTIONS);
  };
  return (
    <section className="App-filter-section">
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
          onChange={ (value) => {
            setCurrentNumericValues({
              ...currentNumericValues,
              column: value.value,
            });
          } }
          data-testid="column-filter"
          options={ availableOptions }
          defaultValue={ availableOptions[0] }
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
      <div className="columnSortContainer">
        <select
          id="column-sort"
          data-testid="column-sort"
          onChange={ ({ target: { value } }) => setCurrentColumnSort({
            order: { ...currentColumnSort.order, column: value },
          }) }
          defaultValue="population"
        >
          <option value="population">population</option>
          <option value="surface_water">surface_water</option>
          <option value="diameter">diameter</option>
          <option value="orbital_period">orbital_period</option>
          <option value="rotational_period">rotational_period</option>
        </select>
        <div
          className="columnSort"
          onChange={ ({ target: { value } }) => setCurrentColumnSort({
            order: { ...currentColumnSort.order, sort: value },
          }) }
        >
          <label htmlFor="column-sort-asc">
            ascendente
            <input
              id="column-sort-asc"
              data-testid="column-sort-asc"
              type="radio"
              value="ASC"
              name="column-sort-radio"
              defaultChecked
            />
          </label>
          <label htmlFor="column-sort-desc">
            descendente
            <input
              id="column-sort-desc"
              data-testid="column-sort-desc"
              type="radio"
              value="DESC"
              name="column-sort-radio"
            />
          </label>
          <button
            type="submit"
            data-testid="column-sort-button"
            onClick={ () => setColumnSort(currentColumnSort) }
          >
            ordenar
          </button>
        </div>
      </div>
    </section>
  );
}

export default Filter;
