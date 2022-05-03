import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function Filter() {
  const {
    setFilterByName,
    filterByName,
    setFilterByNumericValues,
    filterByNumericValues,
    currentNumericValues,
    setCurrentNumericValues,
    btnDisabled,
  } = useContext(AppContext);
  const [availableOptions, setAvailableOptions] = useState([
    'population',
    'orbital_period',
    'rotational_period',
    'surface_water',
    'diameter',
  ]);
  const clickHandler = () => {
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
  return (
    <section>
      <h2>Search your Planet</h2>
      <input
        type="text"
        onChange={ ({ target }) => setFilterByName({
          ...filterByName,
          name: target.value }) }
        data-testid="name-filter"
      />
      <form>
        <label htmlFor="column-filter">
          Column
          <select
            onChange={ ({ target }) => setCurrentNumericValues({
              ...currentNumericValues,
              column: target.value,
            }) }
            id="column-filter"
            data-testid="column-filter"
            defaultValue={ availableOptions[0] }
          >
            {availableOptions
              .map((availableOption, index) => (
                <option
                  key={ index }
                  value={ availableOption }
                >
                  {availableOption}

                </option>))}
          </select>
        </label>
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
          onClick={ () => clickHandler() }
          disabled={
            btnDisabled([
              currentNumericValues.column,
              currentNumericValues.value,
              currentNumericValues.comparison,
            ])
          }
          id="button-filter"
          type="button"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      <div className="numericValuesFilterContainer">
        {
          filterByNumericValues.length !== 0
    && filterByNumericValues.map((obj, index) => (
      <div key={ index } className="numericValueFilterAndDeleteBtnContainer">
        <span>{`${obj.column} ${obj.comparison} ${obj.value}`}</span>
        <button className="removeNumericFilterBtn" type="button">X</button>
      </div>
    ))
        }
      </div>
    </section>
  );
}

export default Filter;
