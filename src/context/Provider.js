import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchStarWarsApi';
import AppContext from './AppContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const context = {
    data,
    setData,
    filterByName,
    setFilterByName,
  };
  useEffect(() => {
    (async () => {
      setData(await fetchPlanets()
        .then(({ results }) => (filterByName.name !== ''
          ? results
            .filter((result) => result
              .name.toUpperCase()
              .includes(filterByName.name.toUpperCase()))
          : results
        )));
    })();
  }, [filterByName]);
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
