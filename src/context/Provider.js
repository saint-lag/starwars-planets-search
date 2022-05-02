import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchStarWarsApi';
import AppContext from './AppContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [currentNumericValues, setCurrentNumericValues] = useState({
    column: 'population', comparison: 'maior que', value: '',
  });
  const context = {
    data,
    setData,
    load,
    error,
    filteredData,
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
      const END = -1;
      await fetchPlanets()
        .then(({ results }) => {
          const sorted = results.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return END;
            return 0;
          });
          setData(sorted);
          setFilteredData(sorted);
          setLoad(true);
        })
        .catch((err) => {
          setError(err.message);
          setLoad(true);
        });
    })();
  }, []);

  useEffect(() => {
    const handleNameFilter = () => setFilteredData(
      filterByName.name !== ''
        ? data.filter((result) => result.name
          .toUpperCase()
          .includes(filterByName.name.toUpperCase()))
        : data,
    );
    return handleNameFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByName.name]);

  useEffect(() => {
    const handleNumericValuesFilter = () => {
      const filteredPlanets = () => filteredData
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
      setFilteredData(filteredPlanets());
    };
    handleNumericValuesFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByNumericValues]);

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
