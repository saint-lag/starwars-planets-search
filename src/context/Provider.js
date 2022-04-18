import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchStarWarsApi';
import AppContext from './AppContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const context = {
    planets,
    setPlanets,
    fetchPlanets,
  };
  useEffect(() => {
    (async () => {
      setPlanets(await fetchPlanets());
    })();
  }, []);
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
