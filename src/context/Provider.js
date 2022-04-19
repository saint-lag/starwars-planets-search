import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchStarWarsApi';
import AppContext from './AppContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: '',
    comparison: '',
    value: '',
    filter: false,
    btnDisabled: (filters) => !filters.every((filter) => filter.length > 0),
  });
  const context = {
    data,
    setData,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
  };
  useEffect(() => {
    (async () => {
      const handleNameFilter = (results) => (
        filterByName.name !== ''
          ? results.filter((result) => result.name
            .toUpperCase()
            .includes(filterByName.name.toUpperCase()))
          : results);
      const handleNumericValuesFilter = (results) => {
        if (filterByNumericValues.filter) {
          // setFilterByNumericValues({ ...filterByNumericValues, filter: false });
          return results.filter((result) => {
            const SUBJECT = Number(result[filterByNumericValues.column]);
            const COMPARATOR = Number(filterByNumericValues.value);
            switch (filterByNumericValues.comparison) {
            case 'menor que':
              return SUBJECT < COMPARATOR;
            case 'maior que':
              return SUBJECT > COMPARATOR;
            case 'igual a':
              return SUBJECT === COMPARATOR;
            default: return result;
            }
          });
        }
        return results;
      };
      setData(
        await fetchPlanets()
          .then(({ results }) => handleNumericValuesFilter(handleNameFilter(results))),
      );
    })();
  }, [filterByName, filterByNumericValues]);
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
