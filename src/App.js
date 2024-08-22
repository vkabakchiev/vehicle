import logo from './logo.svg';
import './App.css';
import React from 'react';
import Register from './Register';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
      <h1>User Registration</h1>
      <Register />
    </div>
      </header>
    </div>
  );
}

export default App;
