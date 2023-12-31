import React from 'react';
import Provider from './context/Provider';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Provider>
      <MainPage />
    </Provider>
  );
}

export default App;
