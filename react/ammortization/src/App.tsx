import React from 'react';
import logo from './logo.svg';
import './App.css';

import Spinner from './components/Spinner/Spinner'

import Ammortization from './pages/Ammortization/Ammortization'
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

   
     

      {/* <Spinner></Spinner> */}
      <Ammortization></Ammortization>
    </div>
  );
}

export default App;
