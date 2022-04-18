import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Table = () => {
  const { planets } = useContext(AppContext);
  return (
    <div>
      {console.log(planets)}
      {planets.map((planet) => <h2 key={ planet.name }>{planet.name}</h2>)}
    </div>
  );
};

export default Table;
