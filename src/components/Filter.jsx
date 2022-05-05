import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { AVAILABLE_OPTIONS_ARRAY } from '../data';
// React-select:
// import Select from 'react-select';
// import { AVAILABLE_OPTIONS, REACT_SELECT_STYLES } from '../data';

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

  // Not React-select:
  const [availableOptions, setAvailableOptions] = useState(AVAILABLE_OPTIONS_ARRAY);
  const [currentColumnSort, setCurrentColumnSort] = useState({
    order: { column: 'population', sort: 'ASC' } });

  const numericValuesClickHandler = () => {
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
    const newState = filterByNumericValues.filter(
      (obj) => obj.column !== option,
    );
    setFilteredData(data);
    setFilterByNumericValues(newState);
    setAvailableOptions([
      ...availableOptions,
      option,
    ]);
  };
  const removeAllNumericFiltersClickHandler = () => {
    setFilterByNumericValues([]);
    setFilteredData(data);
    setAvailableOptions(AVAILABLE_OPTIONS_ARRAY);
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
        {/* // Tests won't get Select through data-testid
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
          styles={ REACT_SELECT_STYLES }
        /> */}
        <select
          onChange={ ({ target: { value } }) => {
            setCurrentNumericValues({
              ...currentNumericValues,
              column: value,
            });
          } }
          data-testid="column-filter"
          className="columnFilterSelect"
        >
          {availableOptions
            && (availableOptions.length !== 1
              ? availableOptions.map((availableOption, index) => (
                <option key={ `column-filter-option-${index}` }>
                  {availableOption}
                </option>
              ))
              : (
                <option>
                  {availableOptions[0]}
                </option>
              ))}
        </select>
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
          defaultValue={ 0 }
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
                data-testid="filter"
              >
                <span>{`${obj.column} ${obj.comparison} ${obj.value}`}</span>
                <button
                  onClick={ (event) => (
                    removeNumericFilterClickHandler(event.target.value)
                  ) }
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
              data-testid="button-remove-filters"
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
          <option value="rotation_period">rotation_period</option>
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
