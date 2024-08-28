import React, { useState } from 'react';

const VehicleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    carmark_id: '',
    carmodel_id: '',
    transport_id: '',
    regno: '',
    win: '',
    motor_no: '',
    reg_year: '',
    city: '',
    axes_number: '',
    fuel: '',
    motor_capacity: '',
    power_kw: '',
    power_hp: '',
    max_mass_camp: '',
    bruto_ton: '',
    EURO_CAT: '',
    user_date: '',
    user_id: '',
    max_posible_mass: '',
    isactive: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Carmark ID:</label>
        <input type="number" name="carmark_id" value={formData.carmark_id} onChange={handleChange} required />
      </div>
      <div>
        <label>Carmodel ID:</label>
        <input type="number" name="carmodel_id" value={formData.carmodel_id} onChange={handleChange} required />
      </div>
      <div>
        <label>Transport ID:</label>
        <input type="number" name="transport_id" value={formData.transport_id} onChange={handleChange} required />
      </div>
      <div>
        <label>Registration Number:</label>
        <input type="text" name="regno" value={formData.regno} onChange={handleChange} required />
      </div>
      <div>
        <label>WIN:</label>
        <input type="text" name="win" value={formData.win} onChange={handleChange} required />
      </div>
      <div>
        <label>Motor Number:</label>
        <input type="text" name="motor_no" value={formData.motor_no} onChange={handleChange} required />
      </div>
      <div>
        <label>Registration Year:</label>
        <input type="number" name="reg_year" value={formData.reg_year} onChange={handleChange} required />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
      </div>
      <div>
        <label>Axes Number:</label>
        <input type="number" name="axes_number" value={formData.axes_number} onChange={handleChange} required />
      </div>
      <div>
        <label>Fuel:</label>
        <input type="text" name="fuel" value={formData.fuel} onChange={handleChange} required />
      </div>
      <div>
        <label>Motor Capacity:</label>
        <input type="number" name="motor_capacity" value={formData.motor_capacity} onChange={handleChange} required />
      </div>
      <div>
        <label>Power (kW):</label>
        <input type="number" name="power_kw" value={formData.power_kw} onChange={handleChange} required />
      </div>
      <div>
        <label>Power (HP):</label>
        <input type="number" name="power_hp" value={formData.power_hp} onChange={handleChange} required />
      </div>
      <div>
        <label>Max Mass Camp:</label>
        <input type="number" name="max_mass_camp" value={formData.max_mass_camp} onChange={handleChange} required />
      </div>
      <div>
        <label>Bruto Ton:</label>
        <input type="number" name="bruto_ton" value={formData.bruto_ton} onChange={handleChange} required />
      </div>
      <div>
        <label>EURO CAT:</label>
        <input type="text" name="EURO_CAT" value={formData.EURO_CAT} onChange={handleChange} required />
      </div>
      <div>
        <label>User Date:</label>
        <input type="date" name="user_date" value={formData.user_date} onChange={handleChange} required />
      </div>
      <div>
        <label>User ID:</label>
        <input type="number" name="user_id" value={formData.user_id} onChange={handleChange} required />
      </div>
      <div>
        <label>Max Possible Mass:</label>
        <input type="number" name="max_posible_mass" value={formData.max_posible_mass} onChange={handleChange} required />
      </div>
      <div>
        <label>Is Active:</label>
        <input type="checkbox" name="isactive" checked={formData.isactive} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default VehicleForm;