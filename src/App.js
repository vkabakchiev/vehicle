import logo from './logo.svg';
import './App.css';
import React from 'react';
import Register from './Register';
import LoginForm from './components/LoginForm';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
       <h1>Register</h1> 
      <LoginForm />
    </div>
      </header>
    </div>
  );
}

export default App;
