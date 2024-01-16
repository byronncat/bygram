import React from 'react';
import logo from './views/assets/imgs/logo.svg';
import './App.css';

import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');
  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => setMessage(data.data1));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
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
          
        <p>{message} xincaho</p>
      </header>
    </div>
  );
}

export default App;
