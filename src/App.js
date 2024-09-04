import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import VehicleForm from './components/VehicleForm';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const handleVehicleSubmit = (vehicleData) => {
    console.log('Vehicle submitted:', vehicleData);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar user={user} />
          <Routes>
            <Route path="/register" element={
              <ProtectedRoute user={user}>
                <Register onRegister={handleRegister} />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/vehicle" element={
              <ProtectedRoute user={user}>
                <VehicleForm onSubmit={handleVehicleSubmit} />
              </ProtectedRoute>
            } />
            <Route path="/" element={user ? <h1>Welcome, {user.name}!</h1> : <LoginForm onLogin={handleLogin} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;