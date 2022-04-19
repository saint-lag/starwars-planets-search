import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filter() {
  const {
    setFilterByName,
    filterByName,
    setFilterByNumericValues,
    filterByNumericValues,
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
            onChange={ ({ target }) => setFilterByNumericValues({
              ...filterByNumericValues,
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
            onChange={ ({ target }) => setFilterByNumericValues({
              ...filterByNumericValues,
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
          onChange={ ({ target }) => setFilterByNumericValues({
            ...filterByNumericValues,
            value: target.value,
          }) }
          data-testid="value-filter"
        />
        <button
          onClick={ () => setFilterByNumericValues({
            ...filterByNumericValues,
            filter: true,
          }) }
          disabled={
            filterByNumericValues.btnDisabled([
              filterByNumericValues.column,
              filterByNumericValues.value,
              filterByNumericValues.comparison,
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
