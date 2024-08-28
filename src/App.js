//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
//import Register from './Register';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import VehicleForm from './components/VehicleForm';

/*
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
*/

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleVehicleSubmit = async (vehicleData) => {
    try {
      const response = await fetch('http://localhost:3001/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      });

      if (response.ok) {
        alert('Vehicle data submitted successfully');
      } else {
        alert('Failed to submit vehicle data');
      }
    } catch (error) {
      console.error('Error submitting vehicle data:', error);
      alert('Network error. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar user={user} />
        {user ? (
          <>
            <h1>Vehicle Form</h1>
            <VehicleForm onSubmit={handleVehicleSubmit} />
          </>
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