import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import VehicleForm from './components/VehicleForm';
import VehicleList from './components/VehicleList'; // Import the new component
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const handleVehicleSubmit = async (vehicleData) => {
    try {
      const response = await axios.post('http://localhost:3001/vehicles', vehicleData);
      console.log('Vehicle submitted:', response.data);
    } catch (error) {
      console.error('Error submitting vehicle:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} />}
        <header className="App-header">
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
            <Route path="/vehicle-list" element={
              <ProtectedRoute user={user}>
                <VehicleList />
              </ProtectedRoute>
            } />
            <Route path="/" element={user ? <Navigate to="/vehicle-list" /> : <LoginForm onLogin={handleLogin} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;