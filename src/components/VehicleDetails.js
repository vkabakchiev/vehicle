import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const VehicleDetails = ({ onLogin }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [formData, setFormData] = useState({
    date_from: '',
    date_to: '',
    probeg: '',
    opisaninie: '',
    item: '',
    stoinost: ''
  });

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/vehicles/${id}`, {
          withCredentials: true // Включете креденциали
        });
        setVehicle(response.data);
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/items', formData, {
        withCredentials: true // Включете креденциали
      });
      if (response.status === 200) {
        alert('Item added successfully');
        setFormData({
          date_from: '',
          date_to: '',
          probeg: '',
          opisaninie: '',
          item: '',
          stoinost: ''
        });
      } else {
        alert('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item');
    }
  };

  const handleReset = () => {
    setFormData({
      date_from: '',
      date_to: '',
      probeg: '',
      opisaninie: '',
      item: '',
      stoinost: ''
    });
  };

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1 className="my-4">Vehicle Details</h1>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Vehicle ID</td>
            <td>{vehicle.vehicle_id}</td>
          </tr>
          <tr>
            <td>Car Mark</td>
            <td>{vehicle.carmark}</td>
          </tr>
          <tr>
            <td>Car Model</td>
            <td>{vehicle.carmodel}</td>
          </tr>
          <tr>
            <td>Registration Number</td>
            <td>{vehicle.regno}</td>
          </tr>
          <tr>
            <td>WIN</td>
            <td>{vehicle.win}</td>
          </tr>
          <tr>
            <td>Motor Number</td>
            <td>{vehicle.motor_no}</td>
          </tr>
          <tr>
            <td>Registration Year</td>
            <td>{vehicle.reg_year}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>{vehicle.city}</td>
          </tr>
          <tr>
            <td>Axes Number</td>
            <td>{vehicle.axes_number}</td>
          </tr>
          <tr>
            <td>Fuel</td>
            <td>{vehicle.fuel}</td>
          </tr>
          <tr>
            <td>Motor Capacity</td>
            <td>{vehicle.motor_capacity}</td>
          </tr>
          <tr>
            <td>Power (kW)</td>
            <td>{vehicle.power_kw}</td>
          </tr>
          <tr>
            <td>Power (HP)</td>
            <td>{vehicle.power_hp}</td>
          </tr>
          <tr>
            <td>Max Mass Camp</td>
            <td>{vehicle.max_mass_camp}</td>
          </tr>
          <tr>
            <td>Bruto Ton</td>
            <td>{vehicle.bruto_ton}</td>
          </tr>
          <tr>
            <td>EURO Category</td>
            <td>{vehicle.EURO_CAT}</td>
          </tr>
          <tr>
            <td>Max Possible Mass</td>
            <td>{vehicle.max_posible_mass}</td>
          </tr>
          <tr>
            <td>Is Active</td>
            <td>{vehicle.isactive ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </Table>

      <h2 className="my-4">Add Item</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDateFrom">
          <Form.Label>Date From</Form.Label>
          <Form.Control
            type="date"
            name="date_from"
            value={formData.date_from}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDateTo">
          <Form.Label>Date To</Form.Label>
          <Form.Control
            type="date"
            name="date_to"
            value={formData.date_to}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formProbeg">
          <Form.Label>Probeg</Form.Label>
          <Form.Control
            type="number"
            name="probeg"
            value={formData.probeg}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formOpisaninie">
          <Form.Label>Opisanie</Form.Label>
          <Form.Control
            type="text"
            name="opisaninie"
            value={formData.opisaninie}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formItem">
          <Form.Label>Item</Form.Label>
          <Form.Control
            type="text"
            name="item"
            value={formData.item}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formStoinost">
          <Form.Label>Stoinost</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="stoinost"
            value={formData.stoinost}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Add Item
        </Button>
      </Form>
    </Container>
  );
};

export default VehicleDetails;