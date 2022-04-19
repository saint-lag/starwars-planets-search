import React from 'react';
import Table from '../components/Table';
import Filter from '../components/Filter';
import Header from '../components/Header';
import '../App.css';

function MainPage() {
  return (
    <div className="App">
      <Header className="App-header" />
      <main className="App-main">
        <Filter />
        <Table />
      </main>
    </div>
  );
}

export default MainPage;
