import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchStarWarsApi';
import AppContext from './AppContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [currentNumericValues, setCurrentNumericValues] = useState({
    column: '', comparison: '', value: '',
  });
  const context = {
    data,
    planets,
    load,
    error,
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
        .then(({ results }) => {
          setData(results);
          setPlanets(results);
          setLoad(true);
        })
        .catch((err) => {
          setError(err.message);
          setLoad(true);
        });
    })();
  }, []);

  useEffect(() => {
    const handleNameFilter = () => setData(
      filterByName.name !== ''
        ? planets.filter((result) => result.name
          .toUpperCase()
          .includes(filterByName.name.toUpperCase()))
        : planets,
    );
    return handleNameFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByName.name]);

  // useEffect(() => {
  //   const handleNumericValuesFilter = () => {
  //     const filteredPlanets = (results) => results
  //       .filter((result) => filterByNumericValues
  //         .map((filter) => {
  //           const SUBJECT = Number(result[filter.column]);
  //           const COMPARATOR = Number(filter.value);
  //           switch (filter.comparison) {
  //           case 'menor que':
  //             return SUBJECT < COMPARATOR;
  //           case 'maior que':
  //             return SUBJECT > COMPARATOR;
  //           case 'igual a':
  //             return SUBJECT === COMPARATOR;
  //           default:
  //             return result;
  //           }
  //         })
  //         .every((bool) => bool));
  //     setData(() => filteredPlanets(data));
  //   };
  //   handleNumericValuesFilter();
  // }, [data, filterByNumericValues]);
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
