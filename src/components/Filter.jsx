import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filter() {
  const { setFilterByName } = useContext(AppContext);
  return (
    <section>
      <h2>
        Search your Planet
      </h2>
      <input
        onChange={ ({ target }) => setFilterByName({ name: target.value }) }
        data-testid="name-filter"
      />
      <form />
    </section>
  );
}

export default Filter;
