//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
//import Register from './Register';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';


function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar user={user} />
        {user ? (
          <p>Welcome, {user.name}!</p>
        ) : (
          <>
            <h1>Login</h1>
            <LoginForm onLogin={handleLogin} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
