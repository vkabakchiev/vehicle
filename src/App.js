import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import Register from './Register';
import VehicleForm from './components/VehicleForm';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    // Handle the registration logic here
    // For example, you can set the user data after registration
    setUser(userData);
  };

  const handleVehicleSubmit = (vehicleData) => {
    // Handle the vehicle form submission logic here
    console.log('Vehicle submitted:', vehicleData);
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
            
            <h1>Register</h1>
            <Register onRegister={handleRegister} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;