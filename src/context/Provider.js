import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchStarWarsApi';
import AppContext from './AppContext';

function Provider({ children }) {
  const INITIAL_DATA = [];
  const [data, setData] = useState(INITIAL_DATA);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [currentNumericValues, setCurrentNumericValues] = useState({
    column: '', comparison: '', value: '',
  });
  const context = {
    data,
    setData,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    currentNumericValues,
    setCurrentNumericValues,
    btnDisabled: (filters) => !filters.every((filter) => filter.length > 0),
  };
  useEffect(() => {
    (async () => {
      await fetchPlanets()
        .then(({ results }) => setData(results));
    })();
  }, []);
  useEffect(() => {
    const handleNameFilter = (results) => (filterByName.name !== ''
      ? results.filter((result) => result.name
        .toUpperCase()
        .includes(filterByName.name.toUpperCase()))
      : results);
    const handleNumericValuesFilter = (results) => results
      .filter((result) => filterByNumericValues
        .map((filter) => {
          const SUBJECT = Number(result[filter.column]);
          const COMPARATOR = Number(filter.value);
          switch (filter.comparison) {
          case 'menor que':
            return SUBJECT < COMPARATOR;
          case 'maior que':
            return SUBJECT > COMPARATOR;
          case 'igual a':
            return SUBJECT === COMPARATOR;
          default:
            return result;
          }
        })
        .every((bool) => bool));
    if (data !== INITIAL_DATA) {
      setData(handleNumericValuesFilter(handleNameFilter(data)));
    }
  }, [INITIAL_DATA, data, filterByName, filterByNumericValues]);
  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default Provider;
