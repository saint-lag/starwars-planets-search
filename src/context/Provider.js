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
    column: 'population', comparison: 'maior que', value: 0,
  });
  const [columnSort, setColumnSort] = useState(
    { order: { column: 'population', sort: 'ASC' } },
  );
  const filterByColumnSort = (currentColumnSort) => {
    const COLUMN = currentColumnSort.order.column;
    const SORT = currentColumnSort.order.sort;

    setColumnSort(currentColumnSort);

    const END = -1;
    switch (SORT) {
    case 'ASC':
      return data
        .sort((a, b) => {
          if (Number(a[COLUMN]) > Number(b[COLUMN])) return 1;
          if (Number(a[COLUMN]) < Number(b[COLUMN])) return END;
          return 0;
        });
    case 'DESC':
      return data
        .sort((a, b) => {
          if (Number(a[COLUMN]) > Number(b[COLUMN])) return END;
          if (Number(a[COLUMN]) < Number(b[COLUMN])) return 1;
          return 0;
        });
    default:
      return false;
    }
  };
  const columnSortClickHandler = (currentColumnSort) => {
    const result = filterByColumnSort(currentColumnSort);
    setFilteredData(result);
  }
  const context = {
    data,
    setData,
    load,
    error,
    filteredData,
    setFilteredData,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    currentNumericValues,
    setCurrentNumericValues,
    btnDisabled: (filters) => !filters.every((filter) => String(filter).length > 0),
    setColumnSort,
    filterByColumnSort,
    columnSortClickHandler,
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
