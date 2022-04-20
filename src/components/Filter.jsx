import React, { useContext } from 'react';
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
  return (
    <section>
      <h2>Search your Planet</h2>
      <input
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
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
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
          onChange={ ({ target }) => setCurrentNumericValues({
            ...currentNumericValues,
            value: target.value,
          }) }
          data-testid="value-filter"
        />
        <button
          onClick={ () => setFilterByNumericValues([
            ...filterByNumericValues, currentNumericValues,
          ]) }
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
    </section>
  );
}

export default Filter;
